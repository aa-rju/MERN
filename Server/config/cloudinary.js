//go to npm cloudinary
//npm i cloudinary

const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  try {
    console.log("connected to cloudinary");
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log("couldn't connect to cloudinary");
    console.log(error);
  }
};
