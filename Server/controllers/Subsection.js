const Course = require("../models/Course");
const subSection = require("../models/SubSection");
const Section = require("../models/Section");
const Category = require("../models/category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create Subsection

exports.createSubsection = async (req, res) => {
  try {
    //fetch data
    const { sectionId, title, description, timeduration } = req.body;
    //extract file/video
    const video = req.files.videoFile;
    //validation
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log(video);
    //upload video to cloudinary and fetch url
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    //create a subSection
    const subSectionDetails = await subSection.create({
      title: title,
      timeduration: timeduration,
      description: description,
      videoUrl: uploadDetails.secure_url,
      //   subSection,
    });
    //update section with this subsection
    const updatedSectionDetails = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
      //HW: log updated section here after populate query.
    )
      .populate({
        path: "sectionName",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    //return res
    return res.status(200).json({
      success: true,
      message: `subSection created successfully`,
      updatedSectionDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `internal server error`,
      error: error.message,
    });
  }
};

//update subsection
exports.updatesubSection = async (req, res) => {
  try {
    //data fetch
    const { title, description, timeduration, videoUrl } = req.body;
    //data validation
    if (!title || !description || !timeduration || !videoUrl) {
      return res.json({
        success: false,
        message: `All properties are required`,
      });
    }
    //update data
    const subsection = await subSection.findByIdAndUpdate(
      subSection._id,
      { title },
      { new: true }
    );
    //return res
    return res.status(200).json({
      success: true,
      message: `subSection updated successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to update subsection, please try again`,
      error: error.message,
    });
  }
};

exports.deletesubSection = async (req, res) => {
  try {
    //fetch id- assuming that we are sending ID in params
    const { subSectionId } = req.body;
    //update data
    await subSection.findByIdAndDelete(subSectionId);
    //Todo :do we need to delete from courseSchema
    //return res
    return res.status(200).json({
      success: true,
      message: `subSection deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to delete subsection, please try again`,
      error: error.message,
    });
  }
};
//delete subsection
