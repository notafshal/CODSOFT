import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/User.schema";

const userRouter = express.Router();
userRouter.get("/", async (req, res) => {
  const users = await UserModel.find({}).populate("product", {
    title: 1,
    author: 1,
    stock: 1,
    price: 1,
    description: 1,
    category: 1,
    rating: 1,
    image: 1,
  });
  res.json(users);
});
userRouter.post("/register", async (req: any, res: any) => {
  const { username, email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already Exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
  });
  newUser
    .save()
    .then((saveduser) => {
      res.json(saveduser);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

export default userRouter;
