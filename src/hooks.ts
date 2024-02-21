import { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { debounceRaf } from "./utils/debounce";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useResize = () => {
  const [isLaptop, setIsLaptop] = useState(false);

  const hadleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsLaptop(true);
    } else {
      setIsLaptop(false);
    }
  };

  useEffect(() => {
    const debounceResize = debounceRaf(hadleResize);
    debounceResize();
    window.addEventListener("resize", debounceResize);
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  return isLaptop;
};
