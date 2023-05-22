import express from "express";
import Razorpay from "razorpay";
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

//Checkout Route

router.post("/", async (req, res) => {
  //getting data from frontend
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  try {
    //creating order in razorpay
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
  }
});

export default router;
