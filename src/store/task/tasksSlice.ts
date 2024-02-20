import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage } from "../../API/localStorage";

export interface ITask {
  id: string;
  task: string;
  completed: boolean;
  important: string;
}

export interface ITasks {
  login: string;
  isLogged: boolean;
  tasks: ITask[] | [];
}

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
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      setLocalStorage(state.login, state.tasks);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task?.id !== action.payload);
      setLocalStorage(state.login, state.tasks);
    },
    completeTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task?.id === action.payload) {
          task.completed = !task.completed;
        }
        return task;
      });
      setLocalStorage(state.login, state.tasks);
    },
    editTask: (state, action) => {
      console.log("action: ", action);
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
