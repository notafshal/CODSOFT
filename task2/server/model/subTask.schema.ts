import mongoose, { Schema } from "mongoose";

const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  date: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "users" },
});

subTaskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const subTaskModel = mongoose.model("subTask", subTaskSchema);
export default subTaskModel;
// subTasks: body.subTasks
// ? body.subTasks.map((subTask: any) => ({
//     title: subTask.title,
//     date: subTask.date,
//     tag: subTask.tag,
//   }))
// : [],
// team: body.team,
// });
