import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types/type";

const initialState: ITask = {
  id: "",
  task: "",
  completed: false,
  important: "",
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editStart: (state, action) => {
      state.id = action.payload.id;
      state.task = action.payload.task;
      state.completed = action.payload.completed;
      state.important = action.payload.important;
    },
    editStop: (state) => {
      state.id = "";
      state.task = "";
      state.completed = false;
      state.important = "";
    },
  },
});

export default editSlice.reducer;

export const { editStart, editStop } = editSlice.actions;
