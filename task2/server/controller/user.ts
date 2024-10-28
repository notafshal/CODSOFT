import express, { Request, Response } from "express";
import UserModel from "../model/User.schema";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const user = UserModel.find({})
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});
userRouter.post("/register", async (req: any, res: any): Promise<void> => {
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
