import classNames from "classnames";
import s from "./Auth.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logIn } from "../../store/task/tasksSlice";
import { getName } from "../../utils/getName";

export const Auth = () => {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.tasks);
  const [value, setValue] = useState("");

  const handlerSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(logIn(getName(value)));
  };

  const hadlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={classNames(s.overlay, !isLogged && s.overlayActive)}>
      <div className={classNames(s.dialog, "modal-dialog")}>
        <div className={classNames(s.content, "modal-content")}>
          <div className={classNames(s.header, "modal-header")}>
            <h3 className={classNames(s.title, "modal-title", "mb-4")}>
              Добро пожаловать в приложение ToDoApp!
            </h3>
          </div>
          <div className={classNames(s.body, "modal-body")}>
            <form className={classNames(s.form)} onSubmit={handlerSubmit}>
              <input
                type="text"
                name="user"
                className={classNames(s.input, "form-control", "mb-4")}
                required
                placeholder="Введите Ваше имя"
                value={value}
                onChange={hadlerChangeInput}
              />
              <button className={classNames("btn", "btn-primary")}>
                Запустить приложение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
