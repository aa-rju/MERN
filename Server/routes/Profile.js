const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  updateProfile,
  deleteAccount,
  getUserDetails,
} = require("../controllers/Profile");

// // Route to create a user profile (assumes it's part of user registration)
// router.post('/create', auth, createProfile);

// // Route to get the profile of the logged-in user
// router.get('/view', auth, getProfile);

// Route to update the profile of the logged-in user
router.put("/update", auth, updateProfile);

// Route to delete the profile of the logged-in user
router.delete("/delete", auth, deleteAccount);

router.get("/getUserDetails", auth, getUserDetails);

// router.get("/getEnrolledCourses", auth, getEnrolledCourses);
// router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;
