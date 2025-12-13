import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasksByDirectoryId,
  taskList,
  updateTask,
} from "../Controller/task.controller.js";
import {
  CreatetaskSchema,
  dirIDSchema,
  gettaskQuerySchema,
  taskIDSchema,
  updateTaskSchema,
} from "../zodValidation/task/task.schema.js";
import verifyToken from "../middleware/auth/auth.middleware.js";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validation/index.js";

const taskRoute = Router();

taskRoute.get(
  "/user/tasks",
  verifyToken,
  validateQuery(gettaskQuerySchema),
  taskList
);
taskRoute.get(
  "/user/directories/:dirid/tasks",
  verifyToken,
  validateParams(dirIDSchema),
  getTasksByDirectoryId
);
taskRoute.post(
  "/user/:dirId/tasks",
  verifyToken,
  validateParams(dirIDSchema),
  validateBody(CreatetaskSchema),
  createTask
);
taskRoute.patch(
  "/user/tasks/id",
  verifyToken,
  validateParams(taskIDSchema),
  validateBody(updateTaskSchema),
  updateTask
);
taskRoute.delete(
  "/user/tasks/id",
  verifyToken,
  validateParams(taskIDSchema),
  deleteTask
);

export default taskRoute;
