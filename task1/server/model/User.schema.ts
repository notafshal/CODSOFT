import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "cart" }],
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
