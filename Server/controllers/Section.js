const Section = require("../models/Section");
const Course = require("../models/Course");
const Category = require("../models/category");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;
    //data validation
    if (!sectionName || !courseId) {
      return res.json({
        success: false,
        message: `All properties are required`,
      });
    }
    //create section
    const newSection = await Section.create({ sectionName });

    //update course with section ObjectID
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec(); //Todo use populate to replace section , subsection in the updatedCourseDetails
    // return res
    return res.status(200).json({
      success: true,
      message: `Section created successfully`,
      updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Unable to create section, please try again`,
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, sectionId } = req.body;
    //data validation
    if (!sectionName || !sectionId) {
      return res.json({
        success: false,
        message: `All properties are required`,
      });
    }
    //update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    //return res
    return res.status(200).json({
      success: true,
      message: `Section updated successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to create section, please try again`,
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //fetch id- assuming that we are sending ID in params
    const { sectionId } = req.body;
    //update data
    await Section.findByIdAndDelete(sectionId);
    //Todo :do we need to delete from course as well

    //return res
    return res.status(200).json({
      success: true,
      message: `Section deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to delete section, please try again`,
      error: error.message,
    });
  }
};
