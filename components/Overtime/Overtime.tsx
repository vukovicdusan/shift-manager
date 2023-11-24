import React, { useState } from "react";
import Accordion from "../Accordion/Accordion";
import { ShiftType } from "@/types/ShiftType";
import { formatMyDate } from "@/helpers/formatMyDate";
import styles from "./Overtime.module.css";
import { authorizeOvertimeInFirebase } from "@/helpers/overtimeHandlers/authorizeOvertimeInFirebase";

type TOvertimeProp = {
  worker: string;
  shifts: ShiftType[];
  authorizationFilter: string;
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
  const filter = props.authorizationFilter;

  let shiftsArr = shifts.filter((shift) => shift.title === worker);

  let overtimeSumAuthorized: number = 0;
  let overtimeSumUnAuthorized: number = 0;
  let overtimesArr: TOvertime[] = [];

  shiftsArr.forEach((shift) => {
    if (shift.overtime) {
      shift.overtime.authorized
        ? (overtimeSumAuthorized += +shift.overtime.hours)
        : (overtimeSumUnAuthorized += +shift.overtime.hours);

      overtimesArr.push({
        overtimeDate: shift.start,
        overtimeShiftId: shift.id,
        overtimeHours: shift.overtime?.hours.toString(),
        overtimeIsAuthorized: shift.overtime?.authorized,
        worker,
      });
    }
  });

  let overtimeSum =
    filter === "authorized"
      ? overtimeSumAuthorized.toString()
      : overtimeSumUnAuthorized.toString();

  return (
    <Accordion title={overtimeSum}>
      {overtimesArr.map((overtime, index) => (
        <ul className={styles.overtimeList} key={index}>
          <li>Worker: {worker}</li>
          <li>Date: {formatMyDate(overtime.overtimeDate)}</li>
          <li>Hours: {overtime.overtimeHours}</li>
          <li>
            Authorized:{" "}
            {overtime.overtimeIsAuthorized ? "Authorized" : "Unauthorized"}
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
          ) : (
            ""
          )}
        </ul>
      ))}
    </Accordion>
  );
};

export default Overtime;
