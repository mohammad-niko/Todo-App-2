import Router from "express";
import {
  deleteUser,
  getAllUser,
  loginUser,
  registerNewUser,
  resendVerificationEmail,
  updateUser,
  verifyUserEmail,
} from "../Controller/user.controller.js";
import verifyToken from "../middleware/auth/auth.middleware.js";
import { validateBody, validateQuery } from "../middleware/validation/index.js";
import {
  loginUserSchema,
  registerUserSchema,
  resendEmailSchema,
  verifyUserEmailSchema,
} from "../zodValidation/user/user.schema.js";
import { resendVerificationLimiter } from "../middleware/rate-limit/RateLimit.js";

const userRoute = Router();

userRoute.get("/user", verifyToken, getAllUser);
userRoute.get(
  "/user/auth/verify-email",
  validateQuery(verifyUserEmailSchema),
  verifyUserEmail
);
userRoute.post(
  "/user/auth/register",
  validateBody(registerUserSchema),
  registerNewUser
);
userRoute.post(
  "/user/auth/resend-verify-email",
  resendVerificationLimiter,
  validateBody(resendEmailSchema),
  resendVerificationEmail
);
userRoute.post("/user/auth/login", validateBody(loginUserSchema), loginUser);
userRoute.patch("/user/", verifyToken, updateUser);
userRoute.delete("/user/", verifyToken, deleteUser);

export default userRoute;
