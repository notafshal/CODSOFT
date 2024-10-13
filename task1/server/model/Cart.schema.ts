import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "product", required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
});
const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
