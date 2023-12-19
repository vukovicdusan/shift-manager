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
// import { eventClickHandler } from "@/helpers/shiftHandlers/eventClickHandler";
import { renderEventContent } from "@/helpers/renderEventContent";
import { ShiftType } from "@/types/ShiftType";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";
import { useAppSelector } from "@/store/hooks";
// import { adjustDateForDayShift } from "@/helpers/adjustDateForDayShift";
// import { hoursRemover } from "@/helpers/hoursRemover";

const CalendarComponent = ({ shifts }: { shifts: ShiftType[] }) => {
  const dispatch = useDispatch();
  const { isAdmin } = useAppSelector((state) => state.user);

  //! MOVE CALENDAR HANDLERS TO THE CUSTOM HOOK..or don't
  const selectDatesHandler = (selectInfo: DateSelectArg) => {
    const selectedStartDate = selectInfo.start;
    const selectedEndDate = selectInfo.end;
    const allEvents = selectInfo.view.calendar.getEvents();

    const intersectingEvents = allEvents.filter((event) => {
      const eventStartDate = event.start;
      const eventEndDate = event.end;

      return (
        selectedStartDate < eventEndDate! && selectedEndDate > eventStartDate!
      );
    });

    const alreadyAssignedWorkers: string[] = intersectingEvents.map(
      (event) => event.title
    );

    dispatch(
      openModal({
        isOpen: true,
        formType: "add",
        data: {
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          alreadyAssignedWorkers: alreadyAssignedWorkers,
          id: "",
          title: "",
          classNames: [""],
          overtime: { hours: "", authorized: false },
        },
      })
    );
  };

  const eventClickHandler = (clickInfo: EventClickArg) => {
    dispatch(
      openModal({
        isOpen: true,
        formType: isAdmin ? "edit" : "overtime",
        data: {
          start: clickInfo.event.startStr,
          end: clickInfo.event.endStr,
          alreadyAssignedWorkers: [""],
          id: clickInfo.event.id,
          title: clickInfo.event.title,
          classNames: clickInfo.event.classNames,
          overtime: clickInfo.event.extendedProps.overtime,
        },
      })
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      firstDay={1}
      headerToolbar={{
        start: "prev dayGridMonth timeGridWeek timeGridDay",
        // start: "prev dayGridMonth",
        center: "title",
        end: "today next",
      }}
      initialView="dayGridMonth"
      // titleFormat={{
      //   day: "numeric",
      //   month: "numeric",
      //   year: "numeric",
      //   weekday: "long",
      // }}
      // eventTimeFormat={}
      // selectMirror={true}
      selectable={true}
      weekends={true}
      select={selectDatesHandler}
      eventClick={eventClickHandler}
      events={shifts}
      eventDisplay="block"
      eventContent={renderEventContent}
      allDaySlot={false}
      selectLongPressDelay={200}
      height={"auto"}
      defaultAllDay={false}
    />
  );
};

export default CalendarComponent;
