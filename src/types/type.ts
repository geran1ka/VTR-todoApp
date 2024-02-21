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
