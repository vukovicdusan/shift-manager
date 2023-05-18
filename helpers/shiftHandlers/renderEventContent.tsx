import { EventContentArg } from "@fullcalendar/core";

export const renderEventContent = (shiftInfo: EventContentArg) => {
  // console.log(shiftInfo);
  return (
    <>
      <p>{shiftInfo.timeText}</p>
      <p>{shiftInfo.event.title}</p>
    </>
  );
};
