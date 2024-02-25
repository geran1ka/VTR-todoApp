import { useState } from "react";
import s from "./Form.module.scss";
import { useAppDispatch, useAppSelector, useResize } from "../../hooks/hooks";
import classNames from "classnames";
import { addTask, editTask, logOut } from "../../store/task/tasksSlice";
import { editStop } from "../../store/edit/editSlice";
import { Button } from "../Button/Button";
import SaveIcon from "../../assets/save.svg?react";
import ResetIcon from "../../assets/reset.svg?react";
import ExitIcon from "../../assets/exit.svg?react";
import { ITask } from "../../types/type";

interface Form {
  mode: string;
}
const DEFAULT_TASK: ITask = {
  id: "",
  task: "",
  important: "table-light",
  completed: false,
};

export const Form = (props: Form) => {
  const dispatch = useAppDispatch();

  const { mode } = props;
  const isEdit = mode === "edit";
  const {
    id,
    task: taskEdit,
    important,
    completed,
  } = useAppSelector((state) => state.editTask);
  const [task, setTask] = useState(
    isEdit ? { id, task: taskEdit, important, completed } : DEFAULT_TASK,
  );

  const isLaptop = useResize();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handlerReset = () => {
    setTask(DEFAULT_TASK);
  };

  const handlerSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (isEdit) return;
    if (!!task) {
      if ("task" in task && "important" in task) {
        dispatch(
          addTask({
            id: Math.random().toString(16).substring(2, 9),
            completed: false,
            task: task.task,
            important: task.important,
          }),
        );
        handlerReset();
      }
    }
  };

  const handlerChangeTask = () => {
    if (!!taskEdit) {
      dispatch(editTask(task));
      dispatch(editStop());
    }
  };

  return (
    <form
      className={classNames(
        isEdit ? s.formEdit : s.form,
        "align-items-center",
        !isEdit && "mb-3",
      )}
      onSubmit={handlerSubmit}>
      <label className={classNames(s.label, "form-group mb-0")}>
        <input
          type="text"
          className={classNames(s.input, "form-control")}
          name="task"
          id="task"
          autoFocus={true}
          onChange={onChange}
          value={task.task}
          placeholder="ввести задачу"
        />
      </label>

      <select
        className={classNames(s.select, "w-auto form-select")}
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
      <div className={classNames(s.btnGroup, isEdit && s.btnGroupEddit)}>
        {!isEdit && (
          <Button className="btn-primary" type="submit" disabled={!task.task}>
            {isLaptop ? <SaveIcon className={s.svg} /> : "Сохранить"}
          </Button>
        )}
        {isEdit && (
          <Button
            className={classNames(s.btnSave, "btn-primary")}
            type="button"
            disabled={!task.task}
            onClick={handlerChangeTask}>
            {isLaptop ? <SaveIcon className={s.svg} /> : "Сохранить"}
          </Button>
        )}

        <Button
          className={classNames(s.btnReset, "btn-warning")}
          type="button"
          onClick={handlerReset}
          disabled={!task.task}>
          {isLaptop ? <ResetIcon className={s.svg} /> : "Очистить"}
        </Button>

        {!isEdit && (
          <Button
            className="btn-info"
            type="button"
            onClick={() => {
              dispatch(logOut());
            }}>
            {isLaptop ? <ExitIcon className={s.svg} /> : "Выйти"}
          </Button>
        )}
      </div>
    </form>
  );
};
