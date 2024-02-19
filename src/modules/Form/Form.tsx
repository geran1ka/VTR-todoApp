import { useState } from "react";
import s from "./Form.module.scss";
import { useAppDispatch } from "../../hooks";
import classNames from "classnames";
import { addTask, logOut } from "../../store/task/tasksSlice";

export const Form = () => {
  const dispatch = useAppDispatch();
  const [task, setTask] = useState("");
  const [importanceTasks, setImportanceTasks] = useState("table-light");

  const handlerSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const newTask = {
      id: Math.random().toString(16).substring(2, 9),
      task,
      completed: false,
      important: importanceTasks,
    };
    dispatch(addTask(newTask));
    setTask("");
    setImportanceTasks("table-light");
  };

  const handlerReset = () => {
    setTask("");
    setImportanceTasks("table-light");
  };

  const handleChangeTask = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      setTask(e.target.value);
    }
  };

  const handleChangeImportanceTask = (e: React.ChangeEvent<EventTarget>) => {
    console.log(1);
    if (e.target instanceof HTMLSelectElement) {
      console.log(e.target.value);
      setImportanceTasks(e.target.value);
    }
  };

  return (
    <form
      className={classNames(s.form, "d-flex", "align-items-center", "mb-3")}
      onSubmit={handlerSubmit}>
      <label className={classNames("w-100 form-group me-3 mb-0")}>
        <input
          type="text"
          className={classNames("form-control")}
          onChange={handleChangeTask}
          value={task}
          placeholder="ввести задачу"
        />
      </label>

      <select
        className="w-auto me-3 form-select"
        value={importanceTasks}
        onChange={handleChangeImportanceTask}>
        <option className="table-light" value="table-light">
          обычная
        </option>
        <option className="table-warning" value="table-warning">
          важная
        </option>
        <option className="table-danger" value="table-danger">
          срочная
        </option>
      </select>

      <button
        className={classNames("btn btn-primary me-3")}
        type="submit"
        disabled={task ? false : true}>
        Сохранить
      </button>
      <button
        className={classNames("btn btn-warning me-3")}
        type="button"
        onClick={handlerReset}
        disabled={task ? false : true}>
        Очистить
      </button>

      <button
        className={classNames("btn btn-info")}
        type="button"
        onClick={() => {
          dispatch(logOut());
        }}>
        Выйти
      </button>
    </form>
  );
};
