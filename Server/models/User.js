const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure email is unique
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['Student', 'Admin', 'Instructor'],  // Only allow specified roles
        required: true
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref:"Profile",
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,  // Reference to course documents
        ref: 'Course',
    }],
    image: {
        type: String,  // URL or path to the user's image
        required: true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
//     courseProgress: [{
//         courseId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Course'
//         },
//         progress: {
//             type: Number,  // e.g., percentage of course completed
//             default: 0
//         }
//     }]
// }, {
//     timestamps: true  // Automatically add `createdAt` and `updatedAt` fields

    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CourseProgress',
        },
    ]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
