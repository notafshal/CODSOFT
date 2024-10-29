import mongoose, { Schema } from "mongoose";

const stripTimeFromDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const taskSchema = new mongoose.Schema(
  {
    title: { type: String },
    date: { type: Date, default: () => stripTimeFromDate(new Date()) },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    stage: {
      type: "String",
      default: "preceding",
      enum: ["preceding", "in progress", "completed"],
    },
    activities: [
      {
        type: {
          type: String,
          default: "assigned",
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ],
        },
        activity: String,
        date: { type: Date, default: () => stripTimeFromDate(new Date()) },
        by: { type: Schema.Types.ObjectId, ref: "users" },
      },
    ],
    subTasks: [
      {
        title: String,
        date: { type: Date, default: () => stripTimeFromDate(new Date()) },
        tag: String,
      },
    ],
    team: [{ type: Schema.Types.ObjectId, ref: "users" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
taskSchema.pre("save", function (next) {
  if (this.date) {
    this.date = stripTimeFromDate(this.date);
  }
  if (this.activities && this.activities.length > 0) {
    this.activities.forEach((activity: any) => {
      if (activity.date) {
        activity.date = stripTimeFromDate(activity.date);
      }
    });
  }
  if (this.subTasks && this.subTasks.length > 0) {
    this.subTasks.forEach((subTask: any) => {
      if (subTask.date) {
        subTask.date = stripTimeFromDate(subTask.date);
      }
    });
  }
  next();
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
