import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: Number, default: 0 }, //Admin ->1 users->0
    tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true }
);
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const UserModel = mongoose.model("users", userSchema);
export default UserModel;
