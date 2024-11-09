const express = require("express");
const router = express.Router();

const {
  createCourse,
  showAllCourses,
  getCourseDetails,
} = require("../controllers/Course");
const {
  createCategory,
  showAllCategories,
  CategoryPageDetails,
} = require("../controllers/Category");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  createSubsection,
  updatesubSection,
  deletesubSection,
} = require("../controllers/Subsection");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");
//Importing middlewares
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");
// const {sendOTP,signup,login,changePassword} =require("../controllers/Auth");

//const {capturePayment,getEsewaPaymentHash,verifyEsewaPayment} =require("../controllers/Payments");

// define Api routes
//3
//mapping post route to controller createTodo
// router.post("/signup",signup);
// router.post("/login",login);
// router.post("/changePassword",changePassword);

//courses can only be created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addsubsection", auth, isInstructor, createSubsection);
router.put("/updatesubsection", auth, isInstructor, updatesubSection);
router.delete("/deletesubsection", auth, isInstructor, deletesubSection);

//category is created only by admin but can be viewed by anyone
router.post("/createcategory", auth, isAdmin, createCategory);
router.get("/showallCategory", showAllCategories);
router.get("/showcategoryDetails", CategoryPageDetails);

//courses can be viewed by anyone visiting the website

router.get("/showallCourses", showAllCourses);
router.get("/getcourseDetails", getCourseDetails);
// router.get("/payment/capture",capturePayment);
// router.post("/payment/verify",verifyEsewaPayment);

//rating and Review is created only by student but can be viewed to everyone.
router.post("/createRating", auth, isStudent, createRating);
router.get("/getaverageRating", getAverageRating);
router.get("/getallRating", getAllRating);

//export
module.exports = router;
