const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
    },
    subSections: [{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'SubSection'
    }],
//     course: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Course',
//         required: true
//     },
//     totalDuration: {
//         type: Number,  // Total duration of the section in minutes
//         default: 0
//     }
// }, {
//     timestamps: true
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
