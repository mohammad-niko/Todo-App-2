import { createSlice } from "@reduxjs/toolkit";

const theme = localStorage.getItem("theme");
const saved = localStorage.getItem("isList");
const initialState = {
  theme: theme ? JSON.parse(theme) : false,
  showTask: saved ? JSON.parse(saved) : false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeThemeMode: (state) => {
      state.theme = !state.theme;
    },
    changeShowTask: (state) => {
      state.showTask = !state.showTask;
    },
  },
});

export default appSlice.reducer;
export const { changeShowTask, changeThemeMode } = appSlice.actions;
