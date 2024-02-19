import classNames from "classnames";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks";
import {
  completeTask,
  editTask,
  removeTask,
} from "../../../store/task/tasksSlice";
import { ModalRemoveTask } from "../../ModalRemoveTask/ModalRemoveTask";

export const TaskItem = (props) => {
  const { id, task, completed, important, index } = props;

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

  const [toEdit, setToEdit] = useState(false);
  const titleRef = useRef<HTMLTableCellElement>(null);

  const handleTaskEdit = () => {
    setToEdit(true);
    // if (titleRef.current !== null) {
    //   titleRef.current.focus();

    //   titleRef.current.addEventListener("blur", () => {
    //     setToEdit(false);
    //     dispatch(
    //       editTask({
    //         id,
    //         task: titleRef.current?.textContent,
    //       }),
    //     );
    //   });
    // }
  };

  const handleTaskEditStop = () => {
    if (titleRef.current !== null) {
      setToEdit(false);
      dispatch(
        editTask({
          id,
          task: titleRef.current?.textContent,
        }),
      );
    }
  };

  return (
    <>
      <tr className={classNames(important, "h-100")} id={id}>
        <td>{index + 1}</td>
        <td
          className={classNames(
            "task",
            completed && "text-decoration-line-through",
          )}
          ref={titleRef}
          contentEditable={toEdit}
          suppressContentEditableWarning={true}>
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
            onClick={() => {
              toEdit ? handleTaskEditStop() : handleTaskEdit();
            }}>
            {toEdit ? "Закончить" : "Редактировать"}
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
