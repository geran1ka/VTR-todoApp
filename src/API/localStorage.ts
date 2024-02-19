import { ITask } from "../store/task/tasksSlice";

export const getLocalStorage = (key: string): ITask[] | [] =>
  JSON.parse(localStorage.getItem(key) || "[]");

export const setLocalStorage = (key: string, value: ITask[]): void =>
  localStorage.setItem(key, JSON.stringify(value));
