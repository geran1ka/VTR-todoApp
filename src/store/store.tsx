import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/tasksSlice.ts";
import authReducer from "./auth/authSlice.ts";

const RootReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: RootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof RootReducer>;
