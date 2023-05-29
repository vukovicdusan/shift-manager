import { EventContentArg } from "@fullcalendar/core";

export const renderEventContent = (shiftInfo: EventContentArg) => {
  const isDay = shiftInfo.event.classNames[0] === "day" ? "day" : "night";
  return (
    <>
      <div className="flex">
        <svg className="shift-icon">
          <use xlinkHref={"./svg/sprite.svg#" + isDay}></use>
        </svg>
        {/* <p>{shiftInfo.timeText}</p> */}
        <p>{shiftInfo.event.title}</p>
      </div>
    </>
  );
};
