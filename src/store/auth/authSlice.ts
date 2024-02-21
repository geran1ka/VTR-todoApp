import { createSlice } from "@reduxjs/toolkit";

export interface ITasks {
  login: string;
  isLogged: boolean;
}

const initialState: ITasks = {
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
