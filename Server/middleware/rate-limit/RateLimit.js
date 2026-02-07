import { rateLimit } from "express-rate-limit";

export const resendVerificationLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
  keyGenerator: (req) => req.body.email,
  message: {
    status: "fail",
    message: "Please wait before requesting another verification email.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
