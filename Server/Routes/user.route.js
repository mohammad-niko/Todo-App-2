import Router from "express";
import {
  deleteUser,
  getAllUser,
  loginUser,
  registerNewUser,
  updateUser,
  verifyUserEmail,
} from "../Controller/user.controller.js";
import verifyToken from "../middleware/auth/auth.middleware.js";
import { validateBody, validateQuery } from "../middleware/validation/index.js";
import {
  registerUserSchema,
  verifyUserEmailSchema,
} from "../zodValidation/user/user.schema.js";

const userRoute = Router();

userRoute.get("/user", verifyToken, getAllUser);
userRoute.get(
  "/verify-email",
  validateQuery(verifyUserEmailSchema),
  verifyUserEmail
);
userRoute.post(
  "/user/register",
  validateBody(registerUserSchema),
  registerNewUser
);
userRoute.post("/user/login", validateBody(registerUserSchema), loginUser);
userRoute.patch("/user/", verifyToken, updateUser);
userRoute.delete("/user/", verifyToken, deleteUser);

export default userRoute;
