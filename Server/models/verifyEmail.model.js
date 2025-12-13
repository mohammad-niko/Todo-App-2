import mongoose from "mongoose";
const { Schema, model } = mongoose;

const verifyEmailSchema = new Schema({
  userID: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  token: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now, expires: "120" },
});

const verifyEmailModel = model("verifyEmail", verifyEmailSchema);

export default verifyEmailModel;
