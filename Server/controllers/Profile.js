const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    //get data
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    //get userId
    const id = req.user.id;

    //validation
    if (!contactNumber || !gender || !id) {
      return res.json({
        success: false,
        message: `All filed are required`,
      });
    }
    //find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    if (!profileDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //update profile
    (profileDetails.dateOfBirth = dateOfBirth),
      (profileDetails.about = about),
      (profileDetails.gender = gender),
      (profileDetails.contactNumber = contactNumber),
      //save the updated profile
      await profileDetails.save();
    //return res
    return res.status(200).json({
      success: true,
      message: `Profile Updated successfully`,
      profileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//Explore : How can we  schedule this delete request : npm install node-cron
//... remaining
exports.deleteAccount = async (req, res) => {
  try {
    //get userId
    const id = req.user.id;
    //validation
    const userDetails = await User.findById({ _id: id });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }
    //delete associate Profile with the user.
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    //delete User
    //todo: HW :unenroll user form enrolled courses.
    //res.
    await User.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: `User deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `cannot delete profile`,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.body.id;
    //validate
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    //res
    console.log(userDetails);
    return res.status(200).json({
      success: true,
      message: `User Data fetched Successfully`,
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `user Data cannot be fetched`,
      error: error.message,
    });
  }
};
//HW :how to schedule request? find out
