import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slicer/authSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
