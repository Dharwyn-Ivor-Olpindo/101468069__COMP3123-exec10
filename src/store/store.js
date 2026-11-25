import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  console.log("[Redux Store Updated]:", store.getState());
});