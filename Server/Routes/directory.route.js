import { Router } from "express";
import {
  createDir,
  deleteDir,
  listDirs,
  updateDir,
} from "../Controller/directory.controller.js";
import {
  createDirSchema,
  dirIDSchema,
  updateDirSchema,
} from "../zodValidation/directory/directory.schema.js";
import verifyToken from "../middleware/auth/auth.middleware.js";
import {
  validateBody,
  validateParams,
} from "../middleware/validation/index.js";

const dirRoute = Router();

dirRoute.get("/user/directories", verifyToken, listDirs);

dirRoute.post(
  "/user/directories",
  verifyToken,
  validateBody(createDirSchema),
  createDir
);
dirRoute.patch(
  "/user/directories/:id",
  verifyToken,
  validateParams(dirIDSchema),
  validateBody(updateDirSchema),
  updateDir
);
dirRoute.delete(
  "/user/directories/:id",
  verifyToken,
  validateParams(dirIDSchema),
  deleteDir
);

export default dirRoute;
