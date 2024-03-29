import { ITask } from "../types/type";

export const getLocalStorage = (key: string): ITask[] | [] =>
  JSON.parse(localStorage.getItem(key) || "[]");

export const setLocalStorage = (key: string, value: ITask[]): void =>
  localStorage.setItem(key, JSON.stringify(value));
