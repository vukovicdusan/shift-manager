"use client";
import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
// import { useAppSelector } from "@/store/hooks";
// import { selectDatesHandler } from "@/helpers/shiftHandlers/selectDatesHandler";
import { eventClickHandler } from "@/helpers/shiftHandlers/eventClickHandler";
import { renderEventContent } from "@/helpers/shiftHandlers/renderEventContent";
import { ShiftType } from "@/types/ShiftType";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";
import { useAppSelector } from "@/store/hooks";
// import { fetchShifts } from "@/store/slices/shiftSlice";

const CalendarComponent = ({ shifts }: { shifts: ShiftType[] }) => {
  const dispatch = useDispatch();

  const selectDatesHandler = (selectInfo: DateSelectArg) => {
    dispatch(
      openModal({
        isOpen: true,
        data: { start: selectInfo.startStr, end: selectInfo.endStr },
      })
    );
  };

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

export default CalendarComponent;
