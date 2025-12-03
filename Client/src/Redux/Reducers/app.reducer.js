import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("isList");
const initialState = {
  theme: true,
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
