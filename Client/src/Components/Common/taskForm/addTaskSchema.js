import { z } from "zod";

export const taskFormSchema = (dList) =>
  z.object({
    title: z.string().trim().min(1, { error: "Title is required" }),
    deadLine: z
      .date()
      .refine((d) => d >= new Date(), {
        error: "Deadline cannot be in the past",
      }),
    description: z
      .string()
      .trim()
      .min(1, { error: "Desctiption is required" }),
    directory: z.enum(["Main", ...dList], {
      errorMap: () => ({ error: "Task directory is required" }),
    }),
    important: z.boolean(),
    completed: z.boolean(),
  });
