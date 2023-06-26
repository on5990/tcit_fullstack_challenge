import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import postSlice from "./features/postSlice";

const store: ToolkitStore = configureStore({
  reducer: {
    posts: postSlice,
  },
});

export default store;
