import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TaskItem } from "./TaskItem/TaskItem";
import { getLocalStorage } from "../../API/localStorage";
import { useEffect } from "react";
import { setTask } from "../../store/task/tasksSlice";

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const login = useAppSelector((state) => state.tasks.login);
  const tasks = getLocalStorage(login);
  useEffect(() => {
    dispatch(setTask(tasks));
  }, [login]);

  return tasks.length >= 1 ? (
    <div className={classNames("table-wrapper")}>
      <table className={classNames("table table-hover table-bordered h-100")}>
        <thead>
          <tr>
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return <TaskItem key={task.id} {...task} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div>Вас список дел пока пустой</div>
  );
};
