const express=require("express");
const router=express.Router();

const {getEsewaPaymentHash,verifyEsewaPayment}=require("../controllers/Payments")
const {auth,isInstructor,isStudent}=require("../controllers/Auth")

// Log the imported functions to check if they are defined

console.log(verifyEsewaPayment); // Should log the function definition


router.post("/initialize-esewa", async (req, res) => {
    try {
      const { itemId, totalPrice } = req.body;
      // Validate item exists and the price matches
      const itemData = await Item.findOne({
        _id: itemId,
        price: Number(totalPrice),
      });
  
      if (!itemData) {
        return res.status(400).send({
          success: false,
          message: "Item not found or price mismatch.",
        });
      }
  
      // Create a record for the purchase
      const purchasedItemData = await PurchasedItem.create({
        item: itemId,
        paymentMethod: "esewa",
        totalPrice: totalPrice,
      });
  
      // Initiate payment with eSewa
      const paymentInitiate = await getEsewaPaymentHash({
        amount: totalPrice,
        transaction_uuid: purchasedItemData._id,
      });
  
      // Respond with payment details
      res.json({
        success: true,
        payment: paymentInitiate,
        purchasedItemData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
});

router.get("/complete-payment", async (req, res) => {
    const { data } = req.query; // Data received from eSewa's redirect
  
    try {
      // Verify payment with eSewa
      const paymentInfo = await verifyEsewaPayment(data);
  
      // Find the purchased item using the transaction UUID
      const purchasedItemData = await PurchasedItem.findById(
        paymentInfo.response.transaction_uuid
      );
  
      if (!purchasedItemData) {
        return res.status(500).json({
          success: false,
          message: "Purchase not found",
        });
      }
  
      // Create a new payment record in the database
      const paymentData = await Payment.create({
        pidx: paymentInfo.decodedData.transaction_code,
        transactionId: paymentInfo.decodedData.transaction_code,
        productId: paymentInfo.response.transaction_uuid,
        amount: purchasedItemData.totalPrice,
        dataFromVerificationReq: paymentInfo,
        apiQueryFromUser: req.query,
        paymentGateway: "esewa",
        status: "success",
      });
  
      // Update the purchased item status to 'completed'
      await PurchasedItem.findByIdAndUpdate(
        paymentInfo.response.transaction_uuid,
        { $set: { status: "completed" } }
      );
  
      // Respond with success message
      res.json({
        success: true,
        message: "Payment successful",
        paymentData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred during payment verification",
        error: error.message,
      });
    }
});

module.exports = router;