import { z } from "zod";
import { ObjectIdSchema } from "../../common/schemas/sheard.schema.js";

const regex =
  /^(?!\.)(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const commonPasswords = new Set([
  "123456",
  "password",
  "12345678",
  "qwerty",
  "123456789",
  "12345",
  "1234",
  "111111",
]);

export const registerUserSchema = z.object({
  userName: z
    .string()
    .trim()
    .nonempty({ error: "user name can't be empty" })
    .min(8, { error: "full name can't be less than 8 char" })
    .max(15, { error: "user name can't be more than 15  char's" }),
  email: z
    .string()
    .trim()
    .nonempty({ error: "email can't be empty" })
    .pipe(
      z.email({
        pattern: regex,
        error: "invalid email",
      })
    ),
  password: z
    .string()
    .trim()
    .nonempty({ error: "Password can't be empty" })
    .min(12, { error: "Password must be at least 12 characters long." })
    .refine((password) => !commonPasswords.has(password), {
      error: "Password is too common. Please choose a more unique password.",
    }),
  verified: z.boolean().optional().default(false),
});

export const verifyUserEmailSchema = z.object({
  userID: ObjectIdSchema,
  token: z.string().length(64, { message: "Invalid token format" }),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ error: "email can't be empty" })
    .pipe(
      z.email({
        pattern: regex,
        error: "invalid email",
      })
    ),
  password: z
    .string()
    .trim()
    .nonempty({ error: "password can't be empty" })
    .min(12, { error: "Password must be at least 12 characters long." })
    .refine((password) => !commonPasswords.has(password), {
      error: "Password is too common. Please choose a more unique password.",
    }),
});
