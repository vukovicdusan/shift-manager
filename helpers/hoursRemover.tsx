export const hoursRemover = (date: string) => {
  const dateArr = date.split("T");
  return dateArr[0].toString();
};
