import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import slugify from "slugify";
import { createDir, getAllDirs, removeDir, updataDir } from "./directory.thunk";

const check = (str) => {
  const word = str.trim().split(/\s+/);
  return word.join(" - ");
};

const { IDLE, LOADING, SUCCEEDED, FAILED } = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const reset = (state, status, successMessage, error) => {
  state.status = status;
  state.error = error || null;
  state.successMessage = successMessage || null;
};

const initialState = {
  directory: [],
  status: IDLE,
  successMessage: null,
  error: null,
};

const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all dir fulfilled:
    builder.addCase(getAllDirs.fulfilled, (state, action) => {
      state.directory = action.payload.directories;
      reset(state, SUCCEEDED);
    });
    // create dir fulfilled:
    builder.addCase(createDir.fulfilled, (state, action) => {
      state.directory.push(action.payload.directory);
      reset(state, SUCCEEDED, action.payload.message);
    });

    // update dir fulfilled:
    builder.addCase(updataDir.fulfilled, (state, action) => {
      const index = state.directory.findIndex(
        (d) => d.id === action.payload.directory._id
      );
      if (index === -1) return;
      state.directory[index] = {
        ...action.payload.directory,
        ...state.directory[index],
      };
      reset(state, SUCCEEDED, action.payload.message);
    });

    // remove dir fulfilled:
    builder.addCase(removeDir.fulfilled, (state, action) => {
      reset(state, SUCCEEDED, null, action.payload.message);
    });

    //pending add matcher:
    builder.addMatcher(
      isAnyOf(
        getAllDirs.pending,
        createDir.pending,
        updataDir.pending,
        removeDir.pending
      ),
      (state, action) => {
        reset(state, LOADING);
        console.log("pinding...");
      }
    );
    // rejected add matcher:
    builder.addMatcher(
      isAnyOf(
        getAllDirs.rejected,
        createDir.rejected,
        updataDir.rejected,
        removeDir.rejected
      ),
      (state, action) => {
        reset(state, FAILED, null, action.payload.message);
      }
    );
  },
});
export default directorySlice.reducer;
{
  //   createDirectory: (state, action) => {
  //   const capitalized =
  //     action.payload[0].toUpperCase() + action.payload.substring(1);
  //   check(action.payload);
  //   state.directory.push({
  //     id: uuid(),
  //     directoryName: capitalized,
  //     path: `/directory/${slugify(action.payload, { lower: true })}`,
  //   });
  // },
  // removeDirectory: (state, action) => {
  //   state.directory = state.directory.filter((d) => d.id !== action.payload);
  // },
  // editDirectory: (state, action) => {
  //   const capitalized =
  //     action.payload.newName[0].toUpperCase() +
  //     action.payload.newName.substring(1);
  //   const index = state.directory.findIndex(
  //     (d) => d.id === action.payload.id
  //   );
  //   if (index === -1) return;
  //   const newPath = `/directory/${slugify(action.payload.newName, {
  //     lower: true,
  //   })}`;
  //   state.directory[index] = {
  //     ...state.directory[index],
  //     directoryName: capitalized,
  //     path: newPath,
  //   };
  // }
}
