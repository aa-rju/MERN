const mongoose = require('mongoose');
const {mailSender}=require("../utils/mailSender");
const otpSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',  // Reference to the User schema
    //     required: true
    // },
    email:{
        type:String,
        required:true,
    },
    otp: {
        type: String,  // Store OTP as a string
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60  // Automatically delete the document after 5 minutes (300 seconds)

    }
});


//a function to send email
async function sendVerificationEmail(email,otp) {
    try{
        const mailResponse=await mailSender(email,"Verification Email for StudyNotion",otp);
        console.log("Email sent successfully",mailResponse);
    }
    catch(error){
        console.error("error occurred while sending email:",error);
        throw error;
    }
    
}

//You can use a pre-save hook to set the expiry time dynamically if required.
otpSchema.pre('save',async function(next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
});

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;
