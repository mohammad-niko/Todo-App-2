import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  task: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Tasks:
    createTask: (state, action) => {
      state.task.push({
        id: uuid(),
        ...action.payload,
      });
    },
    removeTask: (state, action) => {
      state.task = state.task.filter((t) => t.id !== action.payload);
    },
    removeTaskForDirectory: (state, action) => {
      state.task = state.task.filter((t) => t.directory !== action.payload);
    },
    editTask: (state, action) => {
      const index = state.task.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index === -1) return;

      state.task[index] = {
        ...state.task[index],
        ...action.payload,
      };
    },
    editTaskDirectory: (state, action) => {
      const { oldName, newName } = action.payload;
      const capitalized = newName[0].toUpperCase() + newName.substring(1);
      state.task = state.task.map((t) =>
        t.directory === oldName ? { ...t, directory: capitalized } : t
      );
    },
    isImportantTask: (state, action) => {
      const haveItem = state.task.find((item) => item.id === action.payload);
      if (!haveItem) return;
      haveItem.important = !haveItem.important;
    },
    isCompletedTask: (state, action) => {
      const haveItem = state.task.find((item) => item.id === action.payload);
      if (!haveItem) return;

      haveItem.completed = !haveItem.completed;
    },
  },
});

export default taskSlice.reducer;
export const {
  createTask,
  removeTask,
  isImportantTask,
  isCompletedTask,
  editTask,
  removeTaskForDirectory,
  editTaskDirectory,
} = taskSlice.actions;
