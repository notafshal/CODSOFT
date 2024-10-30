import mongoose from "mongoose";
import express from "express";
import activitiesModel from "../model/activities.schema";
import verifyToken from "../middleware/verifyToken";
import tasksModel from "../model/Task.schema";

const activitiesRouter = express.Router();

activitiesRouter.get("/", async (req, res) => {
  try {
    const activitiy = await activitiesModel.find({}).populate({
      path: "user",
      select: "username role",
      strictPopulate: false,
    });

    res.status(200).json(activitiy);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

activitiesRouter.get("/:id", (req, res) => {
  activitiesModel
    .findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

activitiesRouter.post("/", verifyToken, async (req, res): Promise<void> => {
  const { status, activityText, date, doneBy, taskId } = req.body;
  if (!status || !activityText || !date || !doneBy) {
    res.status(404).json("missing credentials");
  }
  try {
    const activities = new activitiesModel({
      status: status,
      date: date,
      activityText: activityText,
      doneBy: doneBy,
      task: taskId,
    });
    activities.save();
    const updatedTask = await tasksModel.findByIdAndUpdate(
      taskId,
      { $push: { activities: activities.id } },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error adding activity to task", error: err });
  }
});

export default activitiesRouter;
