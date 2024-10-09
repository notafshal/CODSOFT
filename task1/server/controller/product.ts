import { error } from "console";
import express from "express";
import productModel from "../model/Product.schema";
import { title } from "process";

const productRouter = express.Router();

productRouter.post("/", (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(400).json({ error: "missing content" });
  }
  const product = new productModel({
    title: body.title,
    price: body.price,
    description: body.description,
    category: body.category,
    rating: body.rating,
  });
  product.save().then((result) => {
    res.status(200).json({ message: "product registeration successful" });
  });
});

export default productRouter;
