import { useEffect, useRef } from "react";
import s from "./ModalRemoveTask.module.scss";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { Button } from "../Button/Button";

interface ModalRemoveTask {
  task: string;
  handlerModalClose: () => void;
  handlerRemove: () => void;
}

export const ModalRemoveTask: React.FC<ModalRemoveTask> = ({
  task,
  handlerModalClose,
  handlerRemove,
}) => {
  const overlayRef = useRef(null);
  const hadleClick = (e: any): void => {
    const target = e.target;
    if (
      (target !== overlayRef.current && !target.closest(".btn")) ||
      e.keyCode === 27
    ) {
      handlerModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hadleClick);
    document.addEventListener("click", hadleClick);
    return () => {
      document.removeEventListener("click", hadleClick);
      document.removeEventListener("keydown", hadleClick);
    };
  }, []);
  return ReactDOM.createPortal(
    <div className={s.popup} ref={overlayRef}>
      <p className={s.content}>Вы действительно хотите удалить задачу:</p>
      <p className={s.content}>{task}?</p>
      <div className={classNames("d-flex gap-3")}>
        <Button className="btn-danger" onClick={handlerRemove} autoFocus>
          Удалить
        </Button>
        <Button className="btn-primary" onClick={handlerModalClose}>
          Отменить
        </Button>
      </div>
    </div>,
    document.getElementById("popup-root") as HTMLElement,
  );
};
