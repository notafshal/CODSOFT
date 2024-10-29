import express, { Request, Response } from "express";
import tasksModel from "../model/Task.schema";
import verifyToken from "../middleware/verifyToken";

import UserModel from "../model/User.schema";
const taskRouter = express.Router();

taskRouter.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await tasksModel.find({}).populate({
      path: "team",
      select: "username email role",
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: err });
  }
});

taskRouter.post("/", verifyToken, async (req: any, res: any) => {
  const body = req.body;
  console.log(body);
  if (!body) {
    return res.status(400).json("Missing credentials");
  }

  try {
    const userIds = [
      ...new Set(body.activities.map((activity: any) => activity.by)),
    ];
    const users = await UserModel.find({ _id: { $in: userIds } });
    if (users.length === 0) {
      return res.status(404).json({ error: "Users not found" });
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
        by: activiti.by,
      })),
      subTasks: body.subTasks
        ? body.subTasks.map((subTask: any) => ({
            title: subTask.title,
            date: subTask.date,
            tag: subTask.tag,
          }))
        : [],
      team: body.team,
    });
    const savedTask = await task.save();
    await Promise.all(
      users.map(async (user) => {
        user.tasks = user.tasks
          ? user.tasks.concat(savedTask._id)
          : [savedTask._id];
        await user.save();
        res.status(200).json({ message: "Task saved", task: savedTask });
      })
    );
  } catch (err: any) {
    console.error("Error saving task:", err);
    res.status(500).json({ error: err.message || err });
  }
});

taskRouter.delete("/:id", (req, res) => {
  tasksModel
    .findByIdAndDelete(req.params.id)
    .then((result) => res.status(200).json(`"deleted succcessfully",${result}`))
    .catch((err) => res.status(400).json(err));
});

export default taskRouter;
