import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  task: [
    {
      id: 1,
      title: "Finish UI Design",
      deadLine: "2025-12-12",
      description: "Complete the UI for the dashboard and task manager.",
      directory: "Work",
      important: true,
      completed: false,
      createdAt: "2025-01-05",
    },
    {
      id: 2,
      title: "Grocery Shopping",
      deadLine: "2025-12-08",
      description: "Buy fruits, vegetables, and cleaning supplies.",
      directory: "Personal",
      important: false,
      completed: false,
      createdAt: "2025-01-06",
    },
    {
      id: 3,
      title: "Prepare Presentation",
      deadLine: "2025-12-15",
      description: "Prepare slides and notes for the monthly meeting.",
      directory: "Work",
      important: true,
      completed: false,
      createdAt: "2025-01-07",
    },
    {
      id: 4,
      title: "Workout Session",
      deadLine: "2025-12-09",
      description: "1-hour gym session focusing on legs and core.",
      directory: "Personal",
      important: false,
      completed: true,
      createdAt: "2025-01-08",
    },
    {
      id: 5,
      title: "Plan Weekend Trip",
      deadLine: "2025-12-25",
      description: "Choose a location and plan activities for the weekend.",
      directory: "Main",
      important: false,
      completed: false,
      createdAt: "2025-01-04",
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Tasks:
    createTask: (state, action) => {
      state.task.push({ id: uuid(), ...action.payload });
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
