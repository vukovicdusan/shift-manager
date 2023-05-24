import { EventClickArg } from "@fullcalendar/core";

export const eventClickHandler = (clickInfo: EventClickArg) => {
  console.log(clickInfo.event);
};
