import { EventContentArg } from "@fullcalendar/core";

export const renderEventContent = (shiftInfo: EventContentArg) => {
  return (
    <>
      <div className="flex">
        <svg className="shift-icon">
          <use
            xlinkHref={"./svg/sprite.svg#" + shiftInfo.event.classNames[0]}
          ></use>
        </svg>
        {/* <p>{shiftInfo.timeText}</p> */}
        <div className="shift-info flex space-between">
          <p>{shiftInfo.event.title}</p>
          {shiftInfo.event.extendedProps.overtime && (
            <span
              className={
                shiftInfo.event.extendedProps.overtime.authorized
                  ? "authorized"
                  : "unauthorized"
              }
            >
              {shiftInfo.event.extendedProps.overtime
                ? "+" + shiftInfo.event.extendedProps.overtime.hours + "h"
                : ""}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
