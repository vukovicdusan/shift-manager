export const shiftDateLimiter = (date: string) => {
  const arr = date.split("-");
  const dayInt = parseInt(arr[2], 10);
  const addZero = dayInt <= 10 ? "0" : "";
  arr[2] = addZero + (dayInt - 1).toString();
  return arr.join("-");
};
