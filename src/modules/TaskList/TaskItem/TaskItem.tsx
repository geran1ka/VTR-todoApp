import classNames from "classnames";
import { useState } from "react";
import { useAppDispatch, useResize } from "../../../hooks/hooks";
import { completeTask, removeTask } from "../../../store/task/tasksSlice";
import { ModalRemoveTask } from "../../ModalRemoveTask/ModalRemoveTask";
import { editStart } from "../../../store/edit/editSlice";
import DeleteIcon from "../../../assets/delete.svg?react";
import EditIcon from "../../../assets/edit.svg?react";
import CompleteteIcon from "../../../assets/complete.svg?react";
import s from "./TaskItem.module.scss";
import { Button } from "../../Button/Button";
import { ITask } from "../../../types/type";

interface TaskItem extends ITask {
  index: number;
}

export const TaskItem: React.FC<TaskItem> = (props) => {
  const { id, task, completed, important, index } = props;

  const dispatch = useAppDispatch();
  const [showModalRemove, setShowModalRemove] = useState(false);
  const isLaptop = useResize();

  const handlerRemove = (): void => {
    dispatch(removeTask(id));
  };

  const handlerComplete = (): void => {
    dispatch(completeTask(id));
  };

  const handlerModalOpen = (): void => {
    setShowModalRemove(true);
  };

  const handlerModalClose = (): void => {
    setShowModalRemove(false);
  };

  const handleTaskEdit = () => {
    dispatch(
      editStart({
        id,
        task,
        completed,
        important,
      }),
    );
  };

  return (
    <>
      <tr className={classNames(s.row, important, "h-100")} id={id}>
        <td className="align-middle">{index + 1}</td>
        <td
          className={classNames(
            "task",
            "align-middle",
            completed && "text-decoration-line-through",
          )}>
          {task}
        </td>
        <td className={classNames("m-auto", "align-middle")}>
          {completed ? "Завершено" : " В\u00A0процессе"}
        </td>
        <td className={classNames(s.btns, "d-flex h-100 align-items-center")}>
          <Button
            className={classNames("btn-danger")}
            onClick={handlerModalOpen}>
            {isLaptop ? <DeleteIcon className={s.svg} /> : "Удалить"}
          </Button>
          <Button
            className={classNames("btn-primary")}
            onClick={handleTaskEdit}>
            {isLaptop ? <EditIcon className={s.svg} /> : "Редактировать"}
          </Button>
          <Button
            className={classNames(s.btnComplete, "btn-success")}
            onClick={handlerComplete}>
            {isLaptop ? (
              <CompleteteIcon className={s.svg} />
            ) : completed ? (
              "Отменить"
            ) : (
              "Завершить"
            )}
          </Button>
        </td>
        {showModalRemove && (
          <ModalRemoveTask
            task={task}
            handlerModalClose={handlerModalClose}
            handlerRemove={handlerRemove}
          />
        )}
      </tr>
    </>
  );
};
