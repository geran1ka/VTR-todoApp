import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  auth: string;
  isLogged: boolean;
}

const initialState: IAuth = {
  auth: "",
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      console.log("action: ", action);
      state.auth = action.payload;
      state.isLogged = true;
    },
    logOut: (state) => {
      state.auth = "";
      state.isLogged = false;
    },
  },
});

export default authSlice.reducer;

export const { logIn, logOut } = authSlice.actions;
