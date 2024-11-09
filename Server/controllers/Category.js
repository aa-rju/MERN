const Category = require("../models/category");

//handler function for create category
exports.createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;
    //validate
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: `All fields are required`,
      });
    }
    //create entry in DB
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all Categories
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );
    res.status(200).json({
      success: true,
      message: `All Categories returned successfully`,
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.CategoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    //get courses for the specified category.
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    console.log(selectedCategory);

    //handle the case when the category is not found.
    if (!selectedCategory) {
      console.log("Category not found");
      return res.status(404).json({
        success: false,
        message: `Category not found`,
      });
    }
    //handle the case when there are no courses
    // if(!selectedCategory.courses.length==0){
    //     console.log("No courses found for the selected category");
    //     return res.status(404).json({
    //         success:false,
    //         message:`No courses found for the selected category`,
    //     })
    // }
    const selectedCourses = selectedCategory.courses;

    //get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    }).populate("courses");
    let differentCourses = [];
    for (const category of categoriesExceptSelected) {
      differentCourses.push(...category.courses);
    }
    //get the top 10 selling courses across all categories
    const allCategories = await Category.find().populate("courses");
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    //return res
    res.status(200).json({
      selectedCourses: selectedCourses,
      differentCourses: differentCourses,
      mostSellingCourses: mostSellingCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
