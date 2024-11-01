import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/User.schema";
import jwt from "jsonwebtoken";

const auth = express.Router();

auth.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;
  const user: any = await UserModel.findOne({ username });
  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  const userToken = {
    email: user.email,
    id: user._id,
    isAdmin: user.isAdmin,
  };
  const jwtSecret = process.env.JWT_KEY || "defaultSecret";
  const token = jwt.sign(userToken, jwtSecret, { expiresIn: "7d" });
  res.status(200).send({
    token,
    email: user.email,
    username: user.username,
    id: user._id,
    isAdmin: user.isAdmin,
  });
});

export default auth;
