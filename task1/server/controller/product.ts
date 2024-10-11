import express, { Request, Response } from "express";
import productModel from "../model/Product.schema";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import mongoose from "mongoose";
import UserModel from "../model/User.schema";

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

productRouter.post("/", upload.single("image"), async (req: any, res: any) => {
  const body = req.body;
  const file = req.file;
  const user = await UserModel.findById(body.userId);
  if (!body) {
    return res.status(400).json({ error: "Missing content" });
  }
  if (!file) {
    return res.status(400).json({ error: "Image upload failed" });
  }
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  const imagePath = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  const product = new productModel({
    title: body.title,
    author: body.author,
    stock: body.stock,
    price: body.price,
    description: body.description,
    category: body.category,
    rating: body.rating,
    image: imagePath,
    user: user?._id,
  });

  const savedProduct = await product.save();
  user.product = user?.product?.concat(savedProduct._id);
  await user
    ?.save()
    .then((result) => {
      res.json({
        message: "Product saved successfully",
        product: result,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: "Error registering product" });
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
