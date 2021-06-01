export const capitalizeString = (str: string) => {
  const length = str.length;
  if (length) {
    return str.slice(0, 1).toUpperCase() + str.slice(1, length);
  }

  return str;
};
