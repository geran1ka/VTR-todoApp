import { useState } from "react";
import s from "./Form.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classNames from "classnames";
import { ITask, addTask, editTask, logOut } from "../../store/task/tasksSlice";
import { editStop } from "../../store/edit/editSlice";

interface Form {
  mode: string;
}

const DERAULT_TASK: Omit<ITask, "id" | "completed"> = {
  task: "",
  important: "table-light",
};

export const Form = (props: Form) => {
  const dispatch = useAppDispatch();

  const { mode } = props;
  const isEdit = mode === "edit";
  const taskEdit = useAppSelector((state) => state.editTask.taskEdit);

  const [task, setTask] = useState(isEdit ? taskEdit : DERAULT_TASK);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handlerReset = () => {
    setTask(DERAULT_TASK);
  };

  const handlerSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (isEdit) return;
    dispatch(
      addTask({
        id: Math.random().toString(16).substring(2, 9),
        task: task.task,
        completed: false,
        important: task.important,
      }),
    );
    handlerReset();
  };

  const handlerChangeTask = () => {
    if (taskEdit) {
      dispatch(editTask({ ...taskEdit, ...task }));
      dispatch(editStop());
    }
  };

  return (
    <form
      className={classNames(
        s.form,
        "d-flex",
        "align-items-center",
        !isEdit && "mb-3",
      )}
      onSubmit={handlerSubmit}>
      <label className={classNames("w-100 form-group me-3 mb-0")}>
        <input
          type="text"
          className={classNames("form-control")}
          name="task"
          id="task"
          onChange={onChange}
          value={task.task}
          placeholder="ввести задачу"
        />
      </label>

      <select
        className="w-auto me-3 form-select"
        value={task.important}
        name="important"
        id="important"
        onChange={onChange}>
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
          disabled={task.task ? false : true}>
          Сохранить
        </button>
      )}
      {isEdit && (
        <button
          className={classNames("btn btn-primary me-3")}
          type="button"
          disabled={task.task ? false : true}
          onClick={handlerChangeTask}>
          Сохранить
        </button>
      )}

      <button
        className={classNames("btn btn-warning me-3")}
        type="button"
        onClick={handlerReset}
        disabled={task.task ? false : true}>
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
