import { createSlice } from "@reduxjs/toolkit";

export interface ITasks {
  tasks: [];
}

const initialState: ITasks = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      console.log("action: ", action);
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task?.id !== action.payload);
    },
    completeTask: (state, action) => {
      console.log("action: ", action);
      state.tasks = state.tasks.map((task) => {
        if (task?.id === action.payload) {
          task.completed = !task.completed;
        }
        return task;
      });
    },
    editTask: (state, action) => {
      console.log("action: ", action);
      state.tasks = state.tasks.map((task) => {
        if (task?.id === action.payload.id) {
          task.task = action.payload.task;
        }
        return task;
      });
    },
  },
});

export default tasksSlice.reducer;
export const { addTask, removeTask, completeTask, editTask } =
  tasksSlice.actions;
