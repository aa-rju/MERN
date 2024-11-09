const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // contentType: {
  //     type: String,
  //     enum: ['video', 'text', 'quiz'],  // Content type of the subsection
  //     required: true
  // },
  videoUrl: {
    type: String, // URL for video or text content
  },
  timeduration: {
    type: String, // Duration in minutes (for videos)
  },

  // }, {
  //     timestamps: true
});

const SubSection = mongoose.model("SubSection", subSectionSchema);
module.exports = SubSection;
