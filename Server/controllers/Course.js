//course ko state banauna sakxau diff like , not approved, pending,published etc and will only be in the published state when atleast one admin approve.:))
//try aarju
const Course = require("../models/Course");
const Category = require("../models/category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//handler function for create tag
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const { courseName, description, whatUlllearn, price, tag, category } =
      req.body;

    //fetch file
    const thumbnail = req.files.thumbnailImage;
    //validation
    if (
      !courseName ||
      !description ||
      !whatUlllearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: `All fields are required`,
      });
    }
    //check for instructor
    const userid = req.user.id;
    const instructorDetails = await User.findById(userid);
    console.log("Instructor Details:", instructorDetails);
    //todo: verify that userid and instructorDetails._id are same or different?

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    //check given tag is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: `Category Details not found`,
      });
    }
    //Upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create an entry for new course
    const newCourse = await Course.create({
      courseName,
      description,
      instructor: instructorDetails._id,
      whatUlllearn: whatUlllearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });
    //add the new course to the userSchema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    //update tagSchema
    await Category.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          category: newCourse._id,
        },
      },
      { new: true }
    );
    //return res
    return res.status(200).json({
      success: true,
      message: `course created successfully`,
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Failed to create course`,
      error: error.message,
    });
  }
};

//get all courses
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    res.status(200).json({
      success: true,
      message: `Data for all courses fetched successfully`,
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Error while fetching Course data`,
      error: error.message,
    });
  }
};

//getCourseDetails
// Get course details based on course ID
exports.getCourseDetails = async (req, res) => {
  try {
    // Get the course ID from the request body
    const { courseId } = req.body;

    // Find the course by ID and populate related fields (e.g., 'instructor', 'studentsEnrolled')
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      //.populate("ratingAndrewiews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec(); // Execute the query

    // If course is not found
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Course not found with ${courseId}`,
      });
    }

    // Return the course details
    return res.status(200).json({
      success: true,
      message: `Course Details fetched successfully`,
      courseDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
