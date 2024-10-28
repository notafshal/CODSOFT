import express, { Request, Response } from "express";
import cors from "cors";
import dbconnect from "./config/dbconnect";
import dotenv from "dotenv";
import userRouter from "./controller/user";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

dbconnect();
app.use("/api/users", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Connection successful");
});

const PORT: any = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
