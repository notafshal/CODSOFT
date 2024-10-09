import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/User.schema";

const userRouter = express.Router();
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
