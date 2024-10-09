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
userRouter.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user: any = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json("Success");
      } else {
        res.status(401).json("Password does not match");
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
export default userRouter;
