import mongoose from "mongoose";
import express from "express";
import activitiesModel from "../model/activities.schema";
import verifyToken from "../middleware/verifyToken";

const activitiesRouter = express.Router();

activitiesRouter.get("/", (req, res) => {
  activitiesModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

activitiesRouter.get("/:id", (req, res) => {
  activitiesModel
    .findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

activitiesRouter.post("/", verifyToken, (req, res) => {
  const { status, activityText, date, doneBy } = req.body;
  if (!status || !activityText || !date || !doneBy) {
    res.status(404).json("missing credentials");
  }
  const activities = new activitiesModel({
    status: status,
    date: date,
    activityText: activityText,
    doneBy: doneBy,
  });
  activities
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => res.status(400).json(err));
});

export default activitiesRouter;
