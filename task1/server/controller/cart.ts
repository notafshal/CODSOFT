import verifyToken from "../middleware/verifyToken";
import cartModel from "../model/Cart.schema";
import express, { Request, Response, Router } from "express";
const cartRouter: Router = express.Router();

cartRouter.get("/", (req: Request, res: Response) => {
  cartModel
    .find({})
    .populate("product", {
      title: 1,
      author: 1,
      price: 1,
      description: 1,
      stock: 1,
      category: 1,
      rating: 1,
      image: 1,
      user: 1,
    })
    .populate("users")
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => res.json("cannot fetch data from cart " + err));
});
cartRouter.get("/:userId", verifyToken, async (req: any, res: any) => {
  const { userId } = req.params;
  console.log(userId);
  await cartModel
    .find({ user: userId })
    .populate("product", {
      title: 1,
      author: 1,
      price: 1,
      description: 1,
      stock: 1,
      category: 1,
      rating: 1,
      image: 1,
      user: 1,
    })
    .populate("users", {
      username: { type: String },
      email: 1,
      password: 1,
      product: 0,
      cart: 0,
    })
    .then((cartItem) => res.status(200).json(cartItem))
    .catch((err) =>
      res.status(404).json({ message: "Cart not found for this user.", err })
    );
});

cartRouter.post("/", verifyToken, (req: any, res: any) => {
  const userId = req.userId;
  const { product, quantity, total } = req.body;
  console.log(userId, product);
  if (!product || !userId || !quantity || !total) {
    return res
      .status(400)
      .json("missing required fields: product, user, quantity, or total.");
  }

  const cartItems = new cartModel({
    product,
    userId,
    quantity,
    total,
  });
  cartItems
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

export default cartRouter;
