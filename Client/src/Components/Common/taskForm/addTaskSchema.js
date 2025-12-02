import { z } from "zod";

export const taskFormSchema = (dList) =>
  z.object({
    title: z.string().trim().min(1, { message: "Title is required" }),
    deadLine: z
      .date()
      .nullable()
      .refine((d) => d === null || d >= new Date(), {
        message: "Deadline cannot be in the past",
      }),
    description: z
      .string()
      .trim()
      .min(1, { message: "Desctiption is required" }),
    directory: z.enum(["Main", ...dList], {
      errorMap: () => ({ message: "Task directory is required" }),
    }),
    important: z.boolean(),
    completed: z.boolean(),
  });
