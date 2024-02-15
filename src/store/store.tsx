import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weaterSlice/weaterSlice.ts";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof weatherReducer>;
