import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage } from "../../API/localStorage";
import { ITasks } from "../../types/type";

const initialState: ITasks = {
  login: "",
  isLogged: false,
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
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
    setTask: (state, action) => {
      console.log("actionSet: ", action);
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      console.log("actionAdd: ", action);
      state.tasks = [...state.tasks, action.payload];
      setLocalStorage(state.login, state.tasks);
    },
    removeTask: (state, action) => {
      console.log("actionRemove: ", action);
      state.tasks = state.tasks.filter((task) => task?.id !== action.payload);
      setLocalStorage(state.login, state.tasks);
    },
    completeTask: (state, action) => {
      console.log("actionComplete: ", action);
      state.tasks = state.tasks.map((task) => {
        if (task?.id === action.payload) {
          task.completed = !task.completed;
        }
        return task;
      });
      setLocalStorage(state.login, state.tasks);
    },
    editTask: (state, action) => {
      console.log("actionEdit: ", action);
      state.tasks = state.tasks.map((task) => {
        if (task?.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
      setLocalStorage(state.login, state.tasks);
    },
  },
});

export default tasksSlice.reducer;
export const {
  logIn,
  logOut,
  addTask,
  removeTask,
  completeTask,
  editTask,
  setTask,
} = tasksSlice.actions;
