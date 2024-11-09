const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming the user can be an instructor
  },
  whatUlllearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  tag: {
    type: [String],
    required: true,
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  instructions: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  //     image: {
  //         type: String,  // Course image or banner URL
  //         default: ''
  //     },

  //     totalDuration: {
  //         type: Number,  // Total duration of the course in minutes
  //         default: 0
  //     },

  // }, {
  //     timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
