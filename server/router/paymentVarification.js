import express from "express";
import crypto from "crypto";
import * as dotenv from "dotenv";
dotenv.config();

import Payment from "../models/paymentModel.js";

const router = express.Router();


//varification Route

router.post("/", async (req, res) => {
  //getting data from frontend
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature } =
    req.body.data;

  try {
    // creating combination of razorpayOrderId and razorpayPaymentId
    const combination = razorpayOrderId + "|" + razorpayPaymentId;

    //making digest with sha256
    const digest = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(combination.toString())
      .digest("hex");

    //checking digest and is equal or not
    const isVarified = digest === razorpaySignature;

    if (isVarified) {
      //saving data to the database
      const doc = await Payment.create({
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      });
      console.log("created document in DB: ", doc);

      //sending response to client
      res.json({
        status: 200,
        success: true,
        message: "Successful",
      });
    } else {
      res.json({
        status: 400,
        success: false,
        message: "fail",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

export default router;
