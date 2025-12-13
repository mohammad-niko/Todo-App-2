import mongoose from "mongoose";
import z from "zod";

export const ObjectIdSchema = z
  .string()
  .trim()
  .nonempty({ error: "ID cannot be empty" })
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    error: "Invalid ID format (must be a valid MongoDB ObjectId).",
  });
