import { z } from "zod";

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

const singupValidation = z.object({
  userName: z
    .string()
    .trim()
    .nonempty({ error: "full name can't be empty" })
    .min(8, { error: "full name can't be less than 8 char" })
    .max(15, { error: "full name can't be more than 15  char's" }),
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
});

export default singupValidation;
