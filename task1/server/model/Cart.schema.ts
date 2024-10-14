import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "product", required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});
const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
