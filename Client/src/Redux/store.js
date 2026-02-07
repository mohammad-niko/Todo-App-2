import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./Reducers/task/Task.reducer";
import appSlice from "./Reducers/app/app.reducer";
import directorySlice from "./Reducers/directory/directory.reducer";
import userSlice from "./Reducers/user/user.reducer";

const store = configureStore({
  reducer: {
    Task: taskSlice,
    App: appSlice,
    Directory: directorySlice,
    User: userSlice,
  },
});

export default store;
