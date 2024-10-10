import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
import userRouter from "./controller/User";
import auth from "./controller/auth";
import productRouter from "./controller/product";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const url: any = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Connection to MongoDB failed , ${err}`));

app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/auth/", auth);
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
