import express, { Request, Response } from "express";
import tasksModel from "../model/Task.schema";
import verifyToken from "../middleware/verifyToken";
import checkAdmin from "../middleware/checkAdmin";
import UserModel from "../model/User.schema";
const taskRouter = express.Router();

taskRouter.get("/", (req: Request, res: Response) => {
  tasksModel
    .find({})
    .populate("users", {
      username: 1,
      role: 1,
      isAdmin: 1,
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

taskRouter.post("/", verifyToken, async (req: any, res: any) => {
  const body = req.body;
  console.log(body);
  const user = await UserModel.findById(
    body.activities.map((use: any) => use.by)
  );
  if (!body) {
    return res.status(400).json("Missing credentials");
  }
  console.log(user);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  const task = new tasksModel({
    title: body.title,
    date: body.date,
    priority: body.priority,
    stage: body.stage,
    activities: body.activities.map((activiti: any) => ({
      type: activiti.type,
      activity: activiti.activity,
      date: activiti.date,
      by: user?.id,
    })),
    subTasks: body.subTasks.map((subTask: any) => ({
      title: subTask.title,
      date: subTask.date,
      tag: subTask.tag,
    })),
    team: body.team,
  });
  const savedTask = await task.save();
  user.tasks = user.tasks ? user.tasks.concat(savedTask.id) : [savedTask.id];
  await user
    ?.save()
    .then((result) =>
      res.status(200).json({ message: "Task saved", task: result })
    )
    .catch((err) => res.status(400).json(err));
});

export default taskRouter;
