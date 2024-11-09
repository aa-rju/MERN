const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender");
const { passwordUpdate } = require("../mail/templates/passwordUpdate");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");
const Profile = require("../models/Profile");

require("dotenv").config();

//send Otp
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from req.body
    const { email } = req.body;
    //check if user already exist
    const checkUSerPresent = await User.findOne({ email });

    //if user already exist, then return a response
    if (checkUSerPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }
    //generate Otp  //search for good ways then looping in DB not recommended
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated:", otp);
    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp }); //not good rather you should use some lib. or resource that automatically generates unique code every time.
    }

    const otpPayload = { email, otp };
    //create an entry in DB
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    // Use email template to create the email body
    otpTemplate(otp); // Generate the email body using the template
    // Send the email
    console.log("Email is being sent to:", email);
    // await mailSender(email, "Verification Email for StudyNotion", emailBody);
    console.log("Email sent successfully.");

    res.status(200).json({
      success: true,
      message: "OTP sent Successfully",
      otp,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signup

//signup handler
exports.signup = async (req, res) => {
  try {
    //fetch data from req.body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    //validate
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !contactNumber ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    //2 password match pw and confirm pw
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirmPassword doesn't match, please try again !",
      });
    }
    //check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "The email is already registered",
      });
    }
    ////find most recent otp for the user
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    //validate otp
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found !",
      });
    } else if (otp !== recentOtp[0].otp) {
      // Correctly access the OTP string
      return res.status(400).json({
        success: false,
        message: "OTP didn't match!",
      });
    }
    const approved = false; // Define the approval variable

    //hash pw
    const hashedPassword = await bcrypt.hash(password, 10);

    //entry create in db
    const ProfileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: ProfileDetails._id,
      //for profile using Dice-bear
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}${lastName}`,
    });
    //return res
    return res.status(200).json({
      success: true,
      message: "User is registered Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //fetch email and password
    const { email, password } = req.body;
    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }
    //check for registered user
    let user = await User.findOne({ email }).populate("additionalDetails");
    //if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, Please SignUp first!",
      });
    }
    //verify password and generate a JWT token

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user.id,
        accountType: user.accountType,
      };
      //password match then create token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      // console.log(user);
      user.password = undefined; //so that token bata hatoss for security.
      // console.log(user);
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      //create cookie and send response
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Logged in Successfully`,
      });
      // res.status(200).json({
      //     success:true,
      //     token,
      //     user,
      //     message:`User Logged in Successfully`,
      // })
    } else {
      //password don't match
      return res.status(403).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};

//changePW
exports.changePassword = async (req, res) => {
  //get data from req.body
  //get oldPassword , newPW, confirmedPW
  //validation
  //update PW in DB
  //send mail -PW updated
  //return response
};
