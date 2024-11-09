const express = require("express");
const router = express.Router();

const {
  updateProfile,
  deleteProfile,
  getAllUserDetails,
} = require("../controllers/Profile");
const {
  verifyEsewaPayment,
  getEsewaPaymentHash,
} = require("../controllers/Payments");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPW");

const { sendOTP, signup, login } = require("../controllers/Auth"); //changePassword ko password
//middleware
const { auth } = require("../middlewares/auth");

// Route for sending OTP
router.post("/sendotp", sendOTP);

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

//reset password
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);
// Optional: Route for protected route (example)
router.get("/protected", auth, (req, res) => {
  res.status(200).json({ message: "You are authorized!" });
});

module.exports = router;
