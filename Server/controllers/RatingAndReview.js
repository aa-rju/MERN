const RatingAndReview =require("../models/RatingAndReview");
const Course=require("../models/Course");

//create Rating
exports.createRating=async (req,res)=>{
    try{
        //get user id
        const userId = req.user.id;
        //fetch data from req body
        const {rating,review,courseId}=req.body;
        //check if the user is enrolled or not
        const courseDetails=await Course.findOne(
            {_id:courseId,
                studentsEnrolled:{$elemMatch:{$eq:userId}},   
            }
        )
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:`Student is not enrolled in the course`,
            })
        }
        //check if user already reviewed the course
        const alreadyReviewed= await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                    })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:`You have already reviewed this course`,
            })
        }
        //create rating and review content
        const ratingReview=await RatingAndReview.create({
                                    rating,review,
                                    course:courseId,
                                    user:userId,
                                })

        //update course with this rating review
        const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id,
                }
            },
            {new:true},
        )
        console.log(updatedCourseDetails);
        //return res
        return res.status(403).json({
            success:true,
            message:`Rating and Reviewed successfully`,
            ratingReview,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
//get Avg. rating
exports.getAverageRating=async (req,res)=>{
    try{
        //get courseid
        const courseId=req.body.courseId;
        //calculate avg. rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        //return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        //if no rating review exist
        return res.status(200).json({
            success:true,
            message:`Average Rating is 0, no ratings given till now`,
            averageRating:0,
        })
    }catch(error){

    }
}
//get all rating review
exports.getAllRating=async (req,res)=>{
    try{
        const allReviews=await RatingAndReview.find({})
                            .sort({rating:"desc"})
                            .populate({
                                path:"user",
                                select:"firstName lastName email image",
                            })
                            .populate({
                                path:"course",
                                select:"courseName",
                            })
                            .exec();
        return res.status(200).json({
            success:true,
            message:`All reviews fetched successsfully`,
            data:allReviews,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
