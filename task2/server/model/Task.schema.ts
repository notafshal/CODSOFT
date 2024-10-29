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
        activity: { type: String },
        date: { type: Date, default: () => stripTimeFromDate(new Date()) },
        by: { type: Schema.Types.ObjectId, ref: "users" },
      },
    ],

    team: [{ type: Schema.Types.ObjectId, ref: "users" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const tasksModel = mongoose.model("task", taskSchema);
export default tasksModel;
