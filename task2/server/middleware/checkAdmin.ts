import { Request, Response, NextFunction } from "express";
import UserModel from "../model/User.schema";

const checkAdmin = async (req: any, res: any, next: any) => {
  console.log(req);
  try {
    const user = req.userId;

    if (!user) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const userId = await UserModel.findById(user);
    console.log(req.body);
    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userId?.isAdmin !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    console.error("Error checking admin:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while checking admin rights" });
  }
};

export default checkAdmin;
