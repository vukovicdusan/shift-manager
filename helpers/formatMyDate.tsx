import { formatDate } from "fullcalendar";

export const formatMyDate = (date: string) => {
  return formatDate(date, {
    month: "2-digit",
    year: "numeric",
    day: "2-digit",
    timeZone: "local",
    locale: "es",
  });
};
