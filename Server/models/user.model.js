import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;
const emailRegex =
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

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 15,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: [emailRegex, "Invalid email format"],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: [12, "Password must be at least 12 characters long."],
      validate: {
        validator: (value) => !commonPasswords.has(value),
        message: "Password is too common. Please choose a more unique one.",
      },
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

const userModel = model("users", userSchema);

export default userModel;
