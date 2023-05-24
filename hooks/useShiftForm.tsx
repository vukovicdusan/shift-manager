import React, { useState } from "react";

const useShiftForm = () => {
  const [assignedWorkers, setAssignedWorkers] = useState<string[]>([]);
  const [shiftType, setShiftType] = useState<string>("day");

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

  return [assignedWorkers, inputHandler, shiftType, selectHandler] as const;
};

export default useShiftForm;
