"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { useAppSelector } from "@/store/hooks";
import { selectDatesHandler } from "@/helpers/shiftHandlers/selectDatesHandler";
import { eventClickHandler } from "@/helpers/shiftHandlers/eventClickHandler";
import { renderEventContent } from "@/helpers/shiftHandlers/renderEventContent";

const Calendar = () => {
  const shifts = useAppSelector((state) => state.shifts);
  console.log(shifts);

  // const selectDatesHandler = (selectInfo: DateSelectArg) => {
  //   console.log(selectInfo);
  // };

  // const eventClickHandler = (clickInfo: EventClickArg) => {
  //   console.log(clickInfo.event.extendedProps);
  // };

  // function renderEventContent(shiftInfo: EventContentArg) {
  //   console.log(shiftInfo);
  //   return (
  //     <>
  //       <p>{shiftInfo.timeText}</p>
  //       <p>{shiftInfo.event.title}</p>
  //     </>
  //   );
  // }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      firstDay={1}
      headerToolbar={{
        start: "prev, dayGridMonth,timeGridWeek,timeGridDay",
        center: "title",
        end: "today,next",
      }}
      initialView="dayGridMonth"
      // titleFormat={{
      //   day: "numeric",
      //   month: "numeric",
      //   year: "numeric",
      //   weekday: "long",
      // }}
      selectable={true}
      selectMirror={true}
      weekends={true}
      select={selectDatesHandler}
      eventClick={eventClickHandler} //this should be used to edit a event
      events={shifts}
      eventDisplay="block"
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
