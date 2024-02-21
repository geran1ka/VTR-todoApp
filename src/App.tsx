import s from "./App.module.scss";
import { useAppSelector } from "./hooks";
import { Auth } from "./modules/Auth/Auth";
import { Container } from "./modules/Container/Container";
import { Form } from "./modules/Form/Form";
import { TaskList } from "./modules/TaskList/TaskList";

export const App: React.FC = () => {
  const { login, isLogged } = useAppSelector((state) => state.tasks);

  return (
    <>
      <div className={s.app}>
        <Container>
          {isLogged ? (
            <>
              <h1>Добрый день, {login}!</h1>
              <Form mode="add" />
              <TaskList />
            </>
          ) : (
            <Auth />
          )}
        </Container>
      </div>
    </>
  );
};
