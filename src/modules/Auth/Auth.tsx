import classNames from "classnames";
import s from "./Auth.module.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { logIn } from "../../store/task/tasksSlice";

type Props = {};

export const Auth = (props: Props) => {
  const dispatch = useDispatch();
  const { isLogged } = useAppSelector((state) => state.tasks);

  const [value, setValue] = useState("");

  const handlerSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(value);
    dispatch(logIn(value));
  };

  const hadlerChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
