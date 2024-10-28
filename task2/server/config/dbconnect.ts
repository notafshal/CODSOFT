import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbconnect = () => {
  const url: any = process.env.MONGO_URI;
  mongoose
    .connect(url)
    .then(() => console.log("Connection to Database Successful"))
    .catch((err) => console.log(`Connection to database failed. ${err}`));
};
export default dbconnect;
