import express, { Request, Response } from "express";
import cors from "cors";
import dbconnect from "./config/dbconnect";
import dotenv from "dotenv";
import userRouter from "./controller/user";
import auth from "./controller/auth";
import taskRouter from "./controller/task";
import activitiesRouter from "./controller/activities";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

dbconnect();
app.use("/api/auth/", auth);

app.use("/api/users", userRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/task", taskRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Connection successful");
});

const PORT: any = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
