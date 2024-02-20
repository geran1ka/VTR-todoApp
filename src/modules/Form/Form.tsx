import { useState } from "react";
import s from "./Form.module.scss";
import { useAppDispatch } from "../../hooks";
import classNames from "classnames";
import { ITask, addTask, editTask, logOut } from "../../store/task/tasksSlice";

interface FormProps {}

export const Form = (props: ITask | undefined) => {
  const dispatch = useAppDispatch();

  const { mode, taskEdit, setIdTaskEdit } = props;
  const isEdit = mode === "edit";

  const [task, setTask] = useState(isEdit ? taskEdit.task : "");
  const [importanceTasks, setImportanceTasks] = useState(
    isEdit ? taskEdit.important : "table-light",
  );

  const handlerSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (isEdit) return;
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

  const handlerChangeTask = () => {
    console.log("click");
    if (taskEdit) {
      console.log("click2");
      dispatch(editTask({ ...taskEdit, task, importanceTasks }));
      setIdTaskEdit(null);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const onChangeSelect = (e: React.ChangeEvent<EventTarget>) => {
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
          onChange={onChangeInput}
          value={task}
          placeholder="ввести задачу"
        />
      </label>

      <select
        className="w-auto me-3 form-select"
        value={importanceTasks}
        onChange={onChangeSelect}>
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

      {!isEdit && (
        <button
          className={classNames("btn btn-primary me-3")}
          type="submit"
          disabled={task ? false : true}>
          Сохранить
        </button>
      )}
      {isEdit && (
        <button
          className={classNames("btn btn-primary me-3")}
          type="button"
          disabled={task ? false : true}
          onClick={handlerChangeTask}>
          Сохранить
        </button>
      )}

      <button
        className={classNames("btn btn-warning me-3")}
        type="button"
        onClick={handlerReset}
        disabled={task ? false : true}>
        Очистить
      </button>

      {!isEdit && (
        <button
          className={classNames("btn btn-info")}
          type="button"
          onClick={() => {
            dispatch(logOut());
          }}>
          Выйти
        </button>
      )}
    </form>
  );
};
