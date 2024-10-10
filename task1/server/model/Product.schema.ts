import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  rating: { type: Number },
  image: { type: String },
});
const productModel = mongoose.model("product", productSchema);
export default productModel;
