export const getName = (str: string) => {
  return str
    .trim()
    .slice(0, 1)
    .toUpperCase()
    .concat(str.trim().slice(1).toLowerCase());
};
