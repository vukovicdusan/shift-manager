import { EventContentArg } from "@fullcalendar/core";

export const renderEventContent = (shiftInfo: EventContentArg) => {
  return (
    <>
      <p>{shiftInfo.timeText}</p>
      <p>{shiftInfo.event.title}</p>
    </>
  );
};
