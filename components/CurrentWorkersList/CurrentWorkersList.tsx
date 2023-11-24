"use client";
import styles from "./CurrentWorkerslist.module.css";
import React, { useState } from "react";
import { WorkersFirebaseType } from "@/types/WorkersFirebaseType";
import useWorker from "@/hooks/useWorker";
import { useAppSelector } from "@/store/hooks";
import { ShiftType } from "@/types/ShiftType";
import { getMonth } from "@/helpers/getMonth";
import { getYear } from "@/helpers/getYear";

type WorkersProps = {
  workers: WorkersFirebaseType[];
  shifts: ShiftType[];
};

const CurrentWorkersList = (props: WorkersProps) => {
  const [, , , removeWorkerFromFirebase] = useWorker();
  const [openDialog, setOpenDialog] = useState(false);
  const [workerInfo, setWorkerInfo] = useState<WorkersFirebaseType>({
    id: "",
    name: "",
    email: "",
    uid: "",
  });
  const [monthSelectValue, setMonthSelectValue] = useState("All");
  const currentYear = new Date().getFullYear().toString();
  const [yearSelectValue, setYearSelectValue] = useState(currentYear);
  const [overtimeSelectValue, setOvertimeSelectValue] =
    useState<string>("authorized");

  const { value } = useAppSelector((state) => state.dashboardNav);

  const monthsArr: string[] = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const yearsArr: string[] = [];
  props.shifts.map((shift) => {
    if (getYear(shift.start) && !yearsArr.includes(getYear(shift.start))) {
      yearsArr.push(getYear(shift.start));
    }
  });

  const removeWorkerHandler = (workerId: string, workerUid: string) => {
    removeWorkerFromFirebase(workerId, workerUid);
    setOpenDialog(false);
  };

  const openDialogHandler = (worker: WorkersFirebaseType) => {
    setOpenDialog(true);
    setWorkerInfo({
      id: worker.id,
      name: worker.name,
      email: worker.email,
      uid: worker.uid,
    });
  };

  const shiftCounter = (name: String) => {
    return monthSelectValue === "All"
      ? props.shifts.filter(
          (shift) =>
            shift.title === name && getYear(shift.start) === yearSelectValue
        ).length
      : props.shifts.filter(
          (shift) =>
            shift.title === name &&
            getMonth(shift.start) === monthSelectValue.toLowerCase() &&
            getYear(shift.start) === yearSelectValue
        ).length;
  };

  const overtimeCounter = (name: string) => {
    let workerArr = props.shifts.filter((shift) => shift.title === name);
    let overtimeAuthorized: number = 0;
    let overtimeUnAuthorized: number = 0;
    workerArr.forEach((worker) => {
      if (worker.overtime) {
        worker.overtime.authorized
          ? (overtimeAuthorized += +worker.overtime.hours)
          : (overtimeUnAuthorized += +worker.overtime.hours);
      }
    });
    if (overtimeSelectValue === "authorized") {
      return overtimeAuthorized;
    } else return overtimeUnAuthorized;
  };

  return (
    <>
      {value === "Workers" ? (
        <>
          <table className={styles.table}>
            <caption>
              <select
                onChange={(e) => setYearSelectValue(e.target.value)}
                defaultValue={currentYear}
              >
                {yearsArr.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </caption>
            <thead>
              <tr>
                <th>Worker</th>
                <th className={styles.textCenter}>
                  Shifts
                  <select
                    defaultValue={"All"}
                    onChange={(e) => setMonthSelectValue(e.target.value)}
                    name="month"
                    id="month"
                  >
                    {monthsArr.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </th>
                <th className={styles.textCenter}>
                  Overtime{" "}
                  <select
                    defaultValue={"authorized"}
                    name="overtime"
                    id="overtime"
                    onChange={(e) => setOvertimeSelectValue(e.target.value)}
                  >
                    <option value="authorized">Authorized</option>
                    <option value="unauthorized">Unauthorized</option>
                  </select>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.workers.map(
                (worker: WorkersFirebaseType, index: number) => (
                  <tr key={index}>
                    <td className={styles.worker}>{worker.name}</td>
                    <td className={styles.textCenter}>
                      {shiftCounter(worker.name)}
                    </td>
                    <td colSpan={1} className={styles.textCenter}>
                      {overtimeCounter(worker.name)}
                    </td>
                    <td className={styles.action}>
                      <button
                        title="Remove worker"
                        className={styles.btn}
                        onClick={() => openDialogHandler(worker)}
                      >
                        <svg className={styles.closeIcon}>
                          <use xlinkHref={"./svg/sprite.svg#trash"}></use>
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {openDialog ? (
            <div className={styles.dialog}>
              <p>
                Are you sure you want to delete worker:{" "}
                <span className="">{workerInfo.name}</span>
              </p>
              <div>
                <button
                  onClick={() =>
                    removeWorkerHandler(workerInfo.id, workerInfo.uid)
                  }
                >
                  Yes I&apos;m sure
                </button>
                <button onClick={() => setOpenDialog(false)}>No</button>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CurrentWorkersList;
