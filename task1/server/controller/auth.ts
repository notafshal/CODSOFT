import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/User.schema";
import jwt from "jsonwebtoken";

const auth = express.Router();

auth.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  const user: any = await UserModel.findOne({ email });
  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid email or password" });
  }
  const userToken = {
    email: user.email,
    id: user._id,
    isRole: user.isRole,
  };
  const jwtSecret = process.env.JWT_KEY || "defaultSecret";
  const token = jwt.sign(userToken, jwtSecret, { expiresIn: "7d" });
  res.status(200).send({
    token,
    email: user.email,
    username: user.username,
    id: user._id,
    isRole: user.isRole,
  });
});

export default auth;
