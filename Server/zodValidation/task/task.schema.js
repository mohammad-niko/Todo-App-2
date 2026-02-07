import z from "zod";
import { ObjectIdSchema } from "../../common/schemas/sheard.schema.js";

const sortEnum = new Set([
  "newest",
  "oldest",
  "deadlineasc",
  "deadlinedesc",
  "completed",
  "uncompleted",
  "important",
  "normal",
]);

export const gettaskQuerySchema = () =>
  z.object({
    page: z.coerce
      .number()
      .positive({ error: "page must be positive" })
      .int({ error: "page must be an integer" })
      .optional(),
    limit: z.coerce
      .number()
      .positive({ error: "limit must be positive" })
      .int({ error: "limit  must be an integer" })
      .optional(),
    importance: z
      .string()
      .trim()
      .refine((val) => val === "all" || val === "important", {
        error: "Importance must be either 'all' or 'important'",
      })
      .optional()
      .optional(),
    status: z
      .string()
      .trim()
      .refine(
        (val) => val === "all" || val === "completed" || val === "uncompleted",
        {
          error: "status must be either 'all' or 'completed' or 'uncompleted'",
        }
      )
      .optional(),
    search: z
      .string()
      .trim()
      .max(12, { error: "search can't be more than 12 char's" })
      .optional(),
    sort: z
      .string()
      .trim()
      .refine((val) => sortEnum.has(val), {
        error: `sort must be one of this paramters ${sortEnum} `,
      })
      .optional(),
  });

export const dirIDSchema = () =>
  z.object({
    dirId: ObjectIdSchema,
  });

export const CreatetaskSchema = () =>
  z.object({
    title: z.string().trim().nonempty({ error: "title is required" }),
    deadLine: z.coerce
      .date({
        required_error: "Deadline is required",
        invalid_type_error: "Invalid deadline date",
      })
      .refine((d) => d >= new Date(), {
        message: "Deadline cannot be in the past",
      }),
    description: z
      .string()
      .trim()
      .nonempty({ error: "description is required" }),
    important: z.boolean().default(false),
    completed: z.boolean().default(false),
  });

export const taskIDSchema = () =>
  z.object({
    id: ObjectIdSchema,
  });

export const updateTaskSchema = () =>
  z.object({
    title: z.string().trim().optional(),
    deadLine: z.coerce
      .date()
      .refine((d) => d >= new Date(), {
        message: "Deadline cannot be in the past",
      })
      .optional(),
    description: z.string().trim().optional(),
    important: z.boolean().optional(),
    completed: z.boolean().optional(),
  });
