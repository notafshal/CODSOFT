import express from "express";
import productModel from "../model/Product.schema";

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
productRouter.get("/", (req, res) => {
  productModel
    .find({})
    .then((product) => res.json(product))
    .catch((err) => res.json({ message: err }));
});
productRouter.get("/:id", (req, res) => {
  productModel
    .findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.json({ error: err }));
});
productRouter.patch("/:id", (req, res) => {
  const body = req.body;
  productModel
    .findByIdAndUpdate(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.json({
        error: err,
      })
    );
});
productRouter.delete("/:id", (req, res) => {
  productModel
    .findByIdAndDelete(req.params.id)
    .then((product) =>
      res.json({ status: "deleted", message: `Deleted the product ${product}` })
    );
});

export default productRouter;
