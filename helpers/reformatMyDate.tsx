export const reformatMyDate = (date: string) => {
  return date.split("/").reverse().join("-");
};
