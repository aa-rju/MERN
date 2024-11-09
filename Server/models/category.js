const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // trim: true,
    // unique: true  // Ensures that the tag name is unique
  },
  description: {
    type: String,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  // }, {
  //     timestamps: true
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
