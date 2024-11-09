const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',  // Reference to the User schema
    //     required: true
    // },
    gender:{
        type:String,
    },
    about: {  //bio
        type: String,  // Short biography or description
        trim:true,
    },
    dateOfBirth:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:Number,
        trim:true,
    }
    // socialLinks: {
    //     website: {
    //         type: String,
    //         default: ''
    //     },
    //     twitter: {
    //         type: String,
    //         default: ''
    //     },
    //     linkedin: {
    //         type: String,
    //         default: ''
    //     },
    //     github: {
    //         type: String,
    //         default: ''
    //     }
    // },
    // skills: [{
    //     type: String  // List of skills or expertise
    // }],
    // interests: [{
    //     type: String  // List of user's interests
    // }],
    // education: [{
    //     school: {
    //         type: String,
    //         default: ''
    //     },
    //     degree: {
    //         type: String,
    //         default: ''
    //     },
    //     fieldOfStudy: {
    //         type: String,
    //         default: ''
    //     },
    //     startYear: {
    //         type: Number,
    //         default: null
    //     },
    //     endYear: {
    //         type: Number,
    //         default: null
    //     }
    // }],


//     profileImage: {
//         type: String,  // URL or path to profile image
//         default: ''
//     }
// }, {
//    timestamps: true  // Automatically adds `createdAt` and `updatedAt`
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
