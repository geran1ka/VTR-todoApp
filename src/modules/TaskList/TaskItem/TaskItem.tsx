import classNames from "classnames";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { completeTask, removeTask } from "../../../store/task/tasksSlice";
import { ModalRemoveTask } from "../../ModalRemoveTask/ModalRemoveTask";

export const TaskItem = (props) => {
  const { id, task, completed, important, index, setIdTaskEdit } = props;

  const dispatch = useAppDispatch();

  const [showModalRemove, setShowModalRemove] = useState(false);

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
    setIdTaskEdit(id);
  };

  return (
    <>
      <tr className={classNames(important, "h-100")} id={id}>
        <td>{index + 1}</td>
        <td
          className={classNames(
            "task",
            completed && "text-decoration-line-through",
          )}>
          {task}
        </td>
        <td className={classNames("m-auto", "align-middle")}>
          {completed ? "Завершено" : " В\u00A0процессе"}
        </td>
        <td className={classNames("d-flex h-100 align-items-center")}>
          <button
            className={classNames("btn btn-danger me-1")}
            onClick={handlerModalOpen}>
            Удалить
          </button>
          <button
            className={classNames("btn btn-primary me-1")}
            onClick={handleTaskEdit}>
            Редактировать
          </button>
          <button
            className={classNames("btn btn-success")}
            onClick={handlerComplete}>
            {completed ? "Отменить" : "Завершить"}
          </button>
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
