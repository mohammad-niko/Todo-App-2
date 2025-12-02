import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("isList");
const initialState = {
  theme: true,
  showTask: saved ? JSON.parse(saved) : false,
  sortBy: "",
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
    SortByOption: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { changeShowTask, changeThemeMode, SortByOption } =
  appSlice.actions;
