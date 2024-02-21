export const debounceRaf = (fn: any) => {
  let raf = 0;

  return (...args: any) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      fn(...args);
      raf = 0;
    });
  };
};
