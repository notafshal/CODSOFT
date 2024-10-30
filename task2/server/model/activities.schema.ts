import mongoose, { Schema } from "mongoose";

const activitiesSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "assigned",
    enum: [
      "assigned",
      "started",
      "in progress",
      "bug",
      "commented",
      "completed",
    ],
  },
  activityText: { type: String },
  date: { type: Date, default: Date },
  doneBy: { type: Schema.Types.ObjectId, ref: "users" },
});
activitiesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const activitiesModel = mongoose.model("activities", activitiesSchema);
export default activitiesModel;
