import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TaskItem } from "./TaskItem/TaskItem";
import { getLocalStorage } from "../../API/localStorage";
import { useEffect } from "react";
import { setTask, sortTask } from "../../store/task/tasksSlice";
import { Form } from "../Form/Form";
import s from "./TaskList.module.scss";
import ArrowUp from "../../assets/arrowUp.svg?react";
import ArrowDown from "../../assets/arrowDown.svg?react";
import { getIsSortValue } from "../../utils/getIsSortValue";

export const TaskList = () => {
  const dispatch = useAppDispatch();

  const { login, sortValue, isSortAscending } = useAppSelector(
    (state) => state.tasks,
  );
  const isSortTask = getIsSortValue(sortValue, "taskName");
  const isSortStatus = getIsSortValue(sortValue, "importantName");

  const tasks = getLocalStorage(login);
  const { id } = useAppSelector((state) => state.editTask);

  useEffect(() => {
    dispatch(setTask(tasks));
  }, [login]);

  const handlerSort = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.name === sortValue) {
      dispatch(
        sortTask({ sort: e.currentTarget.name, count: !isSortAscending }),
      );
    } else {
      dispatch(
        sortTask({
          sort: e.currentTarget.name,
          count: true,
        }),
      );
    }
  };

  return tasks.length >= 1 ? (
    <div className={classNames("table-wrapper")}>
      <table
        className={classNames(
          s.table,
          "table table-hover table-bordered h-100",
        )}>
        <thead>
          <tr>
            <th className={s.index}>№</th>
            <th className={s.task}>
              <button
                type="button"
                className={s.btn}
                name="taskName"
                onClick={handlerSort}>
                Задача
              </button>
              {isSortTask && (isSortAscending ? <ArrowUp /> : <ArrowDown />)}
            </th>
            <th className={s.status}>
              <button
                type="button"
                className={s.btn}
                name="importantName"
                onClick={handlerSort}>
                Статус
              </button>
              {isSortStatus && (isSortAscending ? <ArrowUp /> : <ArrowDown />)}
            </th>
            <th className={s.action}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            if (task.id === id) {
              return (
                <tr key={id}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle" colSpan={3}>
                    <Form mode="edit" />
                  </td>
                </tr>
              );
            }
            return <TaskItem key={task.id} {...task} index={index} />;
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
