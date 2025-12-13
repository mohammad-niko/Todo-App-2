import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import slugify from "slugify";

const check = (str) => {
  const word = str.trim().split(/\s+/);
  return word.join(" - ");
};

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
      check(action.payload);
      state.directory.push({
        id: uuid(),
        directoryName: capitalized,
        path: `/directory/${slugify(action.payload, { lower: true })}`,
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

      const newPath = `/directory/${slugify(action.payload.newName, {
        lower: true,
      })}`;

      state.directory[index] = {
        ...state.directory[index],
        directoryName: capitalized,
        path: newPath,
      };
    },
  },
});
export default directorySlice.reducer;
export const { createDirectory, removeDirectory, editDirectory } =
  directorySlice.actions;
