import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage } from "../../API/localStorage";
import { ITasks } from "../../types/type";

const initialState: ITasks = {
  sortValue: "",
  isSortAscending: true,
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
      state.tasks = [...state.tasks, action.payload];
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
      state.tasks = state.tasks.map((task) => {
        if (task?.id === action.payload.id) {
          return { ...task, ...action.payload };
        }
        return task;
      });
      setLocalStorage(state.login, state.tasks);
    },
    sortTask: (state, action) => {
      state.sortValue = action.payload.sort;
      state.isSortAscending = action.payload.count;
      state.tasks = state.tasks.sort((a, b) => {
        if (action.payload.sort === "taskName" && action.payload.count) {
          return a.important.concat(a.task) > b.important.concat(b.task)
            ? 1
            : -1;
        }

        if (action.payload.sort === "taskName" && !action.payload.count) {
          return a.important.concat(a.task) > b.important.concat(b.task)
            ? -1
            : 1;
        }

        if (action.payload.sort === "importantName" && action.payload.count) {
          return a.completed > b.completed ? 1 : -1;
        }

        if (action.payload.sort === "importantName" && !action.payload.count) {
          return a.completed > b.completed ? -1 : 1;
        }
        return 0;
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
  sortTask,
} = tasksSlice.actions;
