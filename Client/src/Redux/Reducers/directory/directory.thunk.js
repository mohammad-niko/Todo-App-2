import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDir, getDir, patchDir, postDir } from "./directory.server";

export const getAllDirs = createAsyncThunk(
  "directory/getAllDirctory",
  async (URL, { rejectWithValue }) => {
    try {
      const res = await getDir(URL);
      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Get All Directories Faild",
      });
    }
  }
);

export const createDir = createAsyncThunk(
  "directory/createDirctory",
  async ({ data, URL }, { rejectWithValue }) => {
    try {
      const res = await postDir(data, URL);
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Create Dir Faild",
      });
    }
  }
);

export const updataDir = createAsyncThunk(
  "directory/updataDirectory",
  async ({ data, URL }, { rejectWithValue }) => {
    try {
      const res = await patchDir(data, URL);

      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Edit Directory Faild",
      });
    }
  }
);

export const removeDir = createAsyncThunk(
  "directory/removeDirectory",
  async (URL, { rejectWithValue }) => {
    try {
      const res = await deleteDir(URL);

      return res.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || " Faild",
      });
    }
  }
);
