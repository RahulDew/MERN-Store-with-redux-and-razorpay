import express, { Router } from "express";
import * as dotenv from "dotenv";
// import bodyParser from "body-parser";
import cors from "cors";

import checkout from "./router/checkOut.js";
import paymentVarification from "./router/paymentVarification.js";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//for api route using router
app.use("/api/checkOut", checkout);
app.use("/api/paymentVarification", paymentVarification);
