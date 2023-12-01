import React from "react";
import Accordion from "../Accordion/Accordion";
import { ShiftType } from "@/types/ShiftType";
import { formatMyDate } from "@/helpers/formatMyDate";
import styles from "./Overtime.module.css";
import { authorizeOvertimeInFirebase } from "@/helpers/overtimeHandlers/authorizeOvertimeInFirebase";
import { getYear } from "@/helpers/getYear";
import { getMonth } from "@/helpers/getMonth";

type TOvertimeProp = {
  worker: string;
  shifts: ShiftType[];
  authorizationFilter: string;
  monthFilter: string;
  yearFilter: string;
};

type TOvertime = {
  overtimeDate: string;
  overtimeShiftId: string;
  overtimeHours?: string;
  overtimeIsAuthorized?: boolean;
  worker: string;
};

const Overtime = (props: TOvertimeProp) => {
  const shifts = props.shifts;
  const worker = props.worker;
  const filter = props.authorizationFilter === "authorized" ? true : false;

  let shiftsArr = shifts.filter((shift) => shift.title === worker);

  let overtimeSumAuthorized: number = 0;
  let overtimeSumUnAuthorized: number = 0;
  let overtimesArr: TOvertime[] = [];

  shiftsArr.forEach((shift) => {
    if (shift.overtime) {
      let properYear = getYear(shift.start) === props.yearFilter;
      let isMonthAll = props.monthFilter === "All";
      let properMonth =
        isMonthAll || getMonth(shift.start) === props.monthFilter.toLowerCase();

      if (properYear && properMonth) {
        let authorized = shift.overtime.authorized;
        let hours = +shift.overtime.hours;

        authorized
          ? (overtimeSumAuthorized += hours)
          : (overtimeSumUnAuthorized += hours);

        overtimesArr.push({
          overtimeDate: shift.start,
          overtimeShiftId: shift.id,
          overtimeHours: shift.overtime?.hours.toString(),
          overtimeIsAuthorized: shift.overtime?.authorized,
          worker,
        });
      }
    }
  });

  let overtimeSum = filter
    ? overtimeSumAuthorized.toString()
    : overtimeSumUnAuthorized.toString();

  let filteredOvertimesArr = overtimesArr.filter(
    (overtime) =>
      overtime.overtimeIsAuthorized === filter &&
      getYear(overtime.overtimeDate) === props.yearFilter
  );

  return (
    <Accordion title={overtimeSum + "h"}>
      {filteredOvertimesArr.map((overtime, index) => (
        <ul className={styles.overtimeList} key={index}>
          <li>Worker: {worker}</li>
          <li>Date: {formatMyDate(overtime.overtimeDate)}</li>
          <li>Hours: {overtime.overtimeHours}</li>
          <li>
            Authorized:{" "}
            <span
              className={
                overtime.overtimeIsAuthorized
                  ? styles.authorized
                  : styles.unauthorized
              }
            >
              {overtime.overtimeIsAuthorized ? "Authorized" : "Unauthorized"}
            </span>
          </li>
          {!overtime.overtimeIsAuthorized ? (
            <li>
              <button
                onClick={(e) =>
                  authorizeOvertimeInFirebase(
                    overtime.overtimeShiftId,
                    overtime.overtimeHours ? overtime.overtimeHours : ""
                  )
                }
              >
                Authorize
              </button>
            </li>
          ) : null}
        </ul>
      ))}
    </Accordion>
  );
};

export default Overtime;
