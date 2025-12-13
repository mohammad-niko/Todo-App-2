import mongoose from "mongoose";

const { Schema, model } = mongoose;

const directorySchema = new Schema(
  {
    directoryName: { type: String, unique: true, required: true, trim: true },
    path: { type: String, required: true, unique: true, trim: true },
    userID: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

const dirModel = model("directories", directorySchema);

export default dirModel;
