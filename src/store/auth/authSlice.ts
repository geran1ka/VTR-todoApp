import { createSlice } from "@reduxjs/toolkit";
import { ITasks } from "../../types/type";

const initialState: Omit<ITasks, "tasks"> = {
  login: "",
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.login = action.payload;
      state.isLogged = true;
    },
    logOut: (state) => {
      state.login = "";
      state.isLogged = false;
    },
  },
});

export default authSlice.reducer;
export const { logIn, logOut } = authSlice.actions;
