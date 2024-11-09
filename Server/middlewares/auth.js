//auth
//isStudent
//isInnstructor
//isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //extract JWT token
    //other ways to fetch token
    // console.log("cookie", req.cookies.token);
    // console.log("body", req.body.token);
    // console.log("header", req.header("Authorization"));

    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Bearer", "");
    //      const token =req.body.token; //try with header for security
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "sth went wrong while verifying token",
    });
  }
};

//middleware for student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType != "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students",
      });
    }
    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "User Role didn't match",
    });
  }
};
//middleware for Instructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType != "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructors",
      });
    }
    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "User Role didn't match",
    });
  }
};

//middleware for Admin
exports.isAdmin = (req, res, next) => {
  try {
    console.log("Accounttype is", req.user.accountType);
    if (req.user.accountType != "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
    });
  }
};
