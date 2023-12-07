import { reformatMyDate } from "@/helpers/reformatMyDate";
import { useAppSelector } from "@/store/hooks";
import React, { ChangeEvent, use, useState } from "react";

const useShiftForm = () => {
  const { start, end } = useAppSelector((state) => state.modal.data);
  const [assignedWorkers, setAssignedWorkers] = useState<string[]>([]);
  const [shiftType, setShiftType] = useState<string>("day");
  const [editedDate, setEditedDate] = useState({ start: start, end: end });
  const [overtimeAuthorization, setOvertimeAuthorization] =
    useState<boolean>(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    checked
      ? setAssignedWorkers([...assignedWorkers, name])
      : setAssignedWorkers((prevState) =>
          prevState.filter((worker) => worker !== name)
        );
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShiftType(e.target.value);
  };

  const editDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedDate((prevState) => ({
      ...prevState,
      [e.target.name]: reformatMyDate(e.target.value),
    }));
  };

  const overtimeAuthorizationHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target;
    setOvertimeAuthorization(checked ? true : false);
    console.log(name, checked);
  };

  return [
    assignedWorkers,
    inputHandler,
    shiftType,
    selectHandler,
    editedDate,
    editDateHandler,
    overtimeAuthorization,
    overtimeAuthorizationHandler,
  ] as const;
};

export default useShiftForm;
