import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  directory: [
    { id: uuid(), directoryName: "Personal", path: "/directory/personal" },
    { id: uuid(), directoryName: "Work", path: "/directory/work" },
  ],
};

const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    createDirectory: (state, action) => {
      const capitalized =
        action.payload[0].toUpperCase() + action.payload.substring(1);

      state.directory.push({
        id: uuid(),
        directoryName: capitalized,
        path: `/directory/${action.payload}`,
      });
    },
    removeDirectory: (state, action) => {
      state.directory = state.directory.filter((d) => d.id !== action.payload);
    },
    editDirectory: (state, action) => {
      const capitalized =
        action.payload.newName[0].toUpperCase() +
        action.payload.newName.substring(1);

      const index = state.directory.findIndex(
        (d) => d.id === action.payload.id
      );
      if (index === -1) return;

      state.directory[index] = {
        ...state.directory[index],
        directoryName: capitalized,
        path: `/directory/${action.payload.newName}`,
      };
    },
  },
});
export default directorySlice.reducer;
export const { createDirectory, removeDirectory, editDirectory } =
  directorySlice.actions;
