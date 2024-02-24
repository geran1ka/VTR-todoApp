import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  taskEdit: {},
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editStart: (state, action) => {
      console.log("action: ", action);
      state.id = action.payload.id;
      state.taskEdit = action.payload;
    },
    editStop: (state) => {
      state.id = "";
      state.taskEdit = {};
    },
  },
});

export default editSlice.reducer;

export const { editStart, editStop } = editSlice.actions;
