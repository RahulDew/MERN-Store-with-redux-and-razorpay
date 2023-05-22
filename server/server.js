import { app } from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;

//Connecting to mongoDB
connectMongoDB().catch((err) => console.log(err));

async function connectMongoDB() {
  // connecting to database
  await mongoose.connect("mongodb://127.0.0.1:27017/razorPay-Payment");
  console.log("DataBase is Connected...");
}

//key route for sending api key to frontend
app.get("/key", (req, res) => {
  res.json({ key: process.env.RAZORPAY_API_KEY });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
