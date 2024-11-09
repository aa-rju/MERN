const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSection'
    }],
    // completedPercentage: {
    //     type: Number,  // Value between 0 and 100
    //     default: 0
    // }
// }, {
//     timestamps: true
});

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);
module.exports = CourseProgress;
