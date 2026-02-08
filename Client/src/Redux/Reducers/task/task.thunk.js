import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteTask, getTask, patchaTask, postTask } from "./task.server";

export const getTaskList = createAsyncThunk(
  "task/getTaskList",
  async (URL, { rejectWithValue }) => {
    try {
      const res = await getTask(URL);
      console.log(res.data.pagination);
      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "get task list Failed.",
      });
    }
  },
);

export const getEspecialTaskForDir = createAsyncThunk(
  "task/getEspecialTaskForDir",
  async (URL, { rejectWithValue }) => {
    try {
      const res = await getTask(URL);

      return res.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Get Especial Task For Dir Failed.",
      });
    }
  },
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async ({ data, URL }, { rejectWithValue }) => {
    try {
      const res = await postTask(data, URL);

      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Create task Failed.",
      });
    }
  },
);

export const updateTask = createAsyncThunk(
  "task/updataTask",
  async ({ data, URL }, { rejectWithValue }) => {
    try {
      const res = await patchaTask(data, URL);

      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Edit Task Failed.",
      });
    }
  },
);

export const removeTask = createAsyncThunk(
  "task/deleteTask",
  async ({ id, URL }, { rejectWithValue }) => {
    try {
      const res = await deleteTask(URL);

      return { ...res.data, id: id };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Remove Task Failed.",
      });
    }
  },
);
