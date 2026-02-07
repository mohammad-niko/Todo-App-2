import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {
  createTask,
  getEspecialTaskForDir,
  getTaskList,
  removeTask,
  updateTask,
} from "./task.thunk";

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
  task: [],
  status: IDLE,
  error: null,
  successMessage: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    editTaskDirectory: (state, action) => {
      const { oldName, newName } = action.payload;
      const capitalized = newName[0].toUpperCase() + newName.substring(1);
      state.task = state.task.map((t) =>
        t.directory === oldName ? { ...t, directory: capitalized } : t,
      );
    },
    removeTaskForDirectory: (state, action) => {
      state.task = state.task.filter((t) => t.directory !== action.payload);
    },
  },
  extraReducers: (builder) => {
    //get list of task fulfilld:
    builder.addCase(getTaskList.fulfilled, (state, action) => {
      action.payload.tasks.map((d) => state.task.push(d));
      reset(state, SUCCEEDED);
    });
    // create task fulfilld:
    builder.addCase(createTask.fulfilled, (state, action) => {
      console.log(action.payload.task);
      state.task.unshift(action.payload.task);
      reset(state, SUCCEEDED, action.payload.message);
    });
    // update task fulfilld:
    builder.addCase(updateTask.fulfilled, (state, action) => {
      console.log(action.payload.newTask._id);
      const index = state.task.findIndex(
        (t) => t._id === action.payload.newTask._id,
      );
      console.log(index);
      state.task[index] = { ...state.task[index], ...action.payload.newTask };
      reset(state, SUCCEEDED, action.payload.message);
    });
    // remove task fulfilld:
    builder.addCase(removeTask.fulfilled, (state, action) => {
      reset(state, SUCCEEDED, action.payload.message);
      state.task = state.task.filter((t) => t._id !== action.payload.id);
    });
    // get all task for especial dirctory:
    builder.addCase(getEspecialTaskForDir.fulfilled, (state, action) => {});

    //pending add matcher:
    builder.addMatcher(
      isAnyOf(
        getTaskList.pending,
        getEspecialTaskForDir.pending,
        createTask.pending,
        updateTask.pending,
        removeTask.pending,
      ),
      (state) => {
        console.log("pending...");
        state.status = LOADING;
        state.error = null;
        state.successMessage = null;
      },
    );
    // rejected add matcher:
    builder.addMatcher(
      isAnyOf(
        getTaskList.rejected,
        getEspecialTaskForDir.rejected,
        createTask.rejected,
        updateTask.rejected,
        removeTask.rejected,
      ),
      (state, action) => {
        reset(state, FAILED, null, action.payload.message);
      },
    );
  },
});

export const { editTaskDirectory, removeTaskForDirectory } = taskSlice.actions;
export default taskSlice.reducer;

// createTask: (state, action) => {
//   state.task.push({
//     id: uuid(),
//     ...action.payload,
//   });
// },
// removeTask: (state, action) => {
//   state.task = state.task.filter((t) => t.id !== action.payload);
// },
// editTask: (state, action) => {
//   const index = state.task.findIndex(
//     (task) => task.id === action.payload.id
//   );
//   if (index === -1) return;

//   state.task[index] = {
//     ...state.task[index],
//     ...action.payload,
//   };
// },
// isImportantTask: (state, action) => {
//   const haveItem = state.task.find((item) => item.id === action.payload);
//   if (!haveItem) return;
//   haveItem.important = !haveItem.important;
// },
// isCompletedTask: (state, action) => {
//   const haveItem = state.task.find((item) => item.id === action.payload);
//   if (!haveItem) return;

//   haveItem.completed = !haveItem.completed;
// },
