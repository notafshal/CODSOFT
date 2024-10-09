import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
UserSchema.methods.generateAuthToken = function () {
  const jwtKey = process.env.JWT_KEY;

  if (!jwtKey) {
    throw new Error("JWT_KEY is not defined in environment variables");
  }
  const token = jwt.sign({ _id: this._id }, jwtKey, {
    expiresIn: "7d",
  });
  return token;
};
const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
