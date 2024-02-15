import { useState } from "react";
import s from "./Search.module.scss";
import SearchIcon from "./search.svg?react";
import { fetchWeahter } from "../../store/weaterSlice/weaterSlice";
import { useAppDispatch } from "../../hooks";

export const Search = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const handlerSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(fetchWeahter(search));
    setSearch("");
  };

  const handleChange = (e: React.ChangeEvent<EventTarget>) => {
    if (e.target instanceof HTMLInputElement) {
      setSearch(e.target.value);
    }
  };
  return (
    <form className={s.form} onSubmit={handlerSubmit}>
      <input
        type="search"
        className={s.search}
        onChange={handleChange}
        value={search}
      />
      <button className={s.btn} type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};
