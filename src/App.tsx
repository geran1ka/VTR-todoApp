import s from "./App.module.scss";
import { Container } from "./modules/Container/Container";
import { Search } from "./modules/Search/Search";
import { Result } from "./modules/Result/Result";

function App() {
  return (
    <>
      <div className={s.app}>
        <Container>
          <Search />
          <Result />
        </Container>
      </div>
    </>
  );
}

export default App;
