import cartModel from "../model/Cart.schema";
import express, { Request, Response, Router } from "express";
const cartRouter: Router = express.Router();

cartRouter.get("/", (req: Request, res: Response) => {
  cartModel
    .find({})
    .populate("product")
    .populate("user")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json("cannot fetch data from cart " + err));
});

cartRouter.post("/", (req: any, res: any) => {
  const { product, user, total } = req.body;
  console.log("----");
  if (!product || !user || !total) {
    return res.status(400).json("cannot get cart data");
  }
  const cartItems = new cartModel({
    product,
    user,
    total,
  });
  cartItems
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

export default cartRouter;
