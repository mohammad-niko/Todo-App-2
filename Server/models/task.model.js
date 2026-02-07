import mongoose from "mongoose";

const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    deadLine: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      trim: true,
    },
    dirID: {
      type: Schema.Types.ObjectId,
      ref: "directories",
      trim: true,
      required: true,
    },
    dirName: { type: String, required: true, trim: true },
    important: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const taskModel = model("tasks", taskSchema);

export default taskModel;
