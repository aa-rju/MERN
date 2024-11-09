const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        index:true,
    },
    rating: {
        type: Number,  // Rating value (e.g., 1 to 5)
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,  // Optional review text
        required:true,
    }
// }, {
//     timestamps: true
});

const RatingAndReview = mongoose.model('RatingAndReview', ratingAndReviewSchema);
module.exports = RatingAndReview;
