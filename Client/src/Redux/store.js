import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./Reducers/Task.reducer";
import appSlice from "./Reducers/app.reducer";
import directorySlice from "./Reducers/directory.reducer";

const store = configureStore({
  reducer: {
    Task: taskSlice,
    App: appSlice,
    Directory: directorySlice,
  },
});

export default store;
