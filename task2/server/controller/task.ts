import express, { Request, Response } from "express";
import tasksModel from "../model/Task.schema";
import verifyToken from "../middleware/verifyToken";
import checkAdmin from "../middleware/checkAdmin";
import UserModel from "../model/User.schema";
const taskRouter = express.Router();

taskRouter.get("/", (req: Request, res: Response) => {
  tasksModel
    .find({})
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

taskRouter.post("/", async (req: any, res: any) => {
  const body = req.body;
  //   const user = await UserModel.findById(body.userId);
  if (!body) {
    return res.status(400).json("Missing credentials");
  }
  //   if (!user) {
  //     return res.status(404).json({ error: "user not found" });
  //   }
  const task = new tasksModel({
    title: body.title,
    date: body.date,
    priority: body.priority,
    stage: body.stage,
    activities: body.activities,
    subTasks: body.subTasks.map((subTask: any) => ({
      title: subTask.title,
      date: subTask.date,
      tag: subTask.tag,
    })),
    team: body.team,
  });
  task
    .save()
    .then((result) =>
      res.status(200).json({ message: `Task assigned `, result: result })
    )
    .catch((err) => res.status(400).json(`Task assigning failed ${err}`));
});

export default taskRouter;
