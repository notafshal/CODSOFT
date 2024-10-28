import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String },
  date: { type: Date },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  stage: {
    type: "String",
    enum: ["Preceding", "In progress", "Completed"],
  },
  activities: {
    type: String,
    enum: ["assigned", "started", "in progress", "bug", "completed"],
    date: { type: Date },
  },
  teams: {
    type: Number,
    default: 0,
  },
});
taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const tasksModel = mongoose.model("task", taskSchema);
export default tasksModel;
