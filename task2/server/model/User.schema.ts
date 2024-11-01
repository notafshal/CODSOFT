import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, require },
    email: { type: String, unique: true, require },
    password: { type: String, require },
    role: { type: String, require },
    isAdmin: { type: Number, default: 0 }, //Admin ->1 users->0
    tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true }
);
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
    }

    delete returnedObject.__v;
  },
});
const UserModel = mongoose.model("users", userSchema);
export default UserModel;
