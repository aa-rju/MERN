const axios = require("axios");
const crypto = require("crypto");
const mongoose = require("mongoose");
// const { instance } = require("../config/esewa");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");

// Capture Payment and initiate the order
// const capturePayment = async (req, res) => {
//   const { course_id } = req.body;
//   const userId = req.user.body;

//   if (!course_id) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide a valid course ID",
//     });
//   }

//   let course;
//   try {
//     course = await Course.findById(course_id);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Couldn't find the valid course",
//       });
//     }

//     const uid = new mongoose.Types.ObjectId(userId);
//     if (course.studentsEnrolled.includes(uid)) {
//       return res.status(200).json({
//         success: false,
//         message: "Student is already enrolled",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

//   // Order create
//   const options = {
//     name: course.courseName,
//     amount: course.price,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId: course_id,
//       userId,
//     },
//   };

//   try {
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Could not initiate order",
//     });
//   }
// };
async function getEsewaPaymentHash({ amount, transaction_uuid }) {
    try {
      const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;
  
      const secretKey = process.env.ESEWA_SECRET_KEY;
      const hash = crypto
        .createHmac("sha256", secretKey)
        .update(data)
        .digest("base64");
  
      return {
        signature: hash,
        signed_field_names: "total_amount,transaction_uuid,product_code",
      };
    } catch (error) {
      throw error;
    }
}


async function verifyEsewaPayment(encodedData) {
  try {
      // decoding base64 code revieved from esewa
    let decodedData = atob(encodedData);
    decodedData = await JSON.parse(decodedData);
    let headersList = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
  
    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;
    
    const secretKey = process.env.ESEWA_SECRET_KEY;
    const hash = crypto
        .createHmac("sha256", secretKey)
        .update(data)
        .digest("base64");
  
  
    if (hash !== decodedData.signature) {
      throw { message: "Invalid Info", decodedData };
    }
    console.log(hash);
    console.log(decodedData.signature);
    let reqOptions = {
      url: `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
      method: "GET",
      headers: headersList,
    };
  
    let response = await axios.request(reqOptions);
    if (
        response.data.status !== "COMPLETE" ||
        response.data.transaction_uuid !== decodedData.transaction_uuid ||
        Number(response.data.total_amount) !== Number(decodedData.total_amount)
    ) {
        throw { message: "Invalid Info", decodedData };
    }
    return { response: response.data, decodedData };
} catch (error) {
    throw error;
}}


// Exporting the functions
module.exports = {getEsewaPaymentHash, verifyEsewaPayment };