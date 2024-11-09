const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req.body
    const email = req.body.email;

    //check user for this email, email validation
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `Your email is not registered`,
      });
    }
    //generate token
    const token = crypto.randomBytes(20).toString("hex");
    //update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);
    //create url
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail containing the url
    await mailSender(email, "PasswordReset Link", `PasswordReset Link: ${url}`);

    //return response
    return res.json({
      success: true,
      message:
        "EMail sent successfully, Please check email and change password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Sth went wrong while reset",
    });
  }
};

//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    //fetch data
    const { password, confirmPassword, token } = req.body;

    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and confirmPW didn't match",
      });
    }
    //get user Details form DB using token
    const userDetails = await User.findOne({ token: token });
    //if no entry -invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: `Token is invalid`,
      });
    }
    //token time expired
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.json({
        success: false,
        message: `Token is expired, Please regenerate your token`,
      });
    }
    //hash password
    const encryptedPassword = await bcrypt.hash(password, 10);
    //update password
    await User.findOneAndUpdate(
      { token: token }, //searching crietria
      { password: encryptedPassword }, //update this
      { new: true } //return new document
    );
    //return res
    return res.status(200).json({
      success: true,
      message: `Password reset successfully`,
    });
  } catch (error) {
    return res.status().json({
      success: false,
      message: `Sth went wrong while resetting Password`,
    });
  }
};
