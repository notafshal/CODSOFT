import express, { Request, Response } from "express";
import productModel from "../model/Product.schema";
import multer, { FileFilterCallback } from "multer";
import path from "path";

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

productRouter.post("/", upload.single("image"), (req: any, res: any) => {
  const body = req.body;
  const file = req.file;

  if (!body) {
    return res.status(400).json({ error: "Missing content" });
  }
  if (!file) {
    return res.status(400).json({ error: "Image upload failed" });
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
  });

  product
    .save()
    .then((result) => {
      return res.status(200).json({
        message: "Product registration successful",
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
