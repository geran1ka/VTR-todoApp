import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TaskItem } from "./TaskItem/TaskItem";
import { getLocalStorage } from "../../API/localStorage";
import { useEffect, useState } from "react";
import { setTask } from "../../store/task/tasksSlice";
import { Form } from "../Form/Form";

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const login = useAppSelector((state) => state.tasks.login);
  const tasks = getLocalStorage(login);

  const [idTaskEdit, setIdTaskEdit] = useState("");

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
            if (task.id === idTaskEdit) {
              return (
                <tr key={idTaskEdit}>
                  <td colSpan={4}>
                    <Form
                      mode="edit"
                      taskEdit={task}
                      setIdTaskEdit={setIdTaskEdit}
                    />
                  </td>
                </tr>
              );
            }
            return (
              <TaskItem
                key={task.id}
                {...task}
                index={index}
                setIdTaskEdit={setIdTaskEdit}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <p className="h2">Вас список дел пока пустой</p>
    </div>
  );
};
