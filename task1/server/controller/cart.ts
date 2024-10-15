import verifyToken from "../middleware/verifyToken";
import cartModel from "../model/Cart.schema";
import express, { Request, Response, Router } from "express";
import UserModel from "../model/User.schema";
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
    .populate("userId", {
      username: 1,
      email: 1,
      password: 1,
      product: 1,
      cart: 1,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json("cannot fetch data from cart " + err));
});

cartRouter.get("/:userId", verifyToken, async (req: any, res: any) => {
  const { userId } = req.params;
  await cartModel
    .find({ userId: userId })
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
    .populate("userId", {
      username: 1,
      email: 1,
    })
    .then((cartItem) => {
      if (cartItem.length === 0) {
        return res
          .status(404)
          .json({ message: "Cart not found for this user." });
      }
      res.status(200).json(cartItem);
    })
    .catch((err) =>
      res.status(404).json({ message: "Error fetching cart data", err })
    );
});

cartRouter.post("/", verifyToken, async (req: any, res: any) => {
  const body = req.body;
  const user = await UserModel.findById(body.userId);
  console.log(body);
  if (!body.product || !body.userId || !body.quantity || !body.total) {
    return res
      .status(400)
      .json("missing required fields: product, user, quantity, or total.");
  }
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  const cartItems = new cartModel({
    product: body.product,
    userId: body.userId,
    quantity: body.quantity,
    total: body.total,
  });
  const savedcart = cartItems.save();
  user.cart = user.cart
    ? user.cart.concat((await savedcart)._id)
    : [(await savedcart)._id];
  await user
    ?.save()
    .then((result) =>
      res.status(200).json({
        message: "Added to Cart",
        product: result,
      })
    )
    .catch((err) => {
      res.status(500).json({ message: "Error adding to cart", err });
    });
});
cartRouter.delete("/:id", (req, res) => {
  cartModel
    .findByIdAndDelete(req.params.id)
    .then((result) =>
      res.status(200).json({ message: "delete successful", result })
    )
    .catch((err) => {
      res.status(400).json({ message: "cannot delete the cart", err });
    });
});
export default cartRouter;
