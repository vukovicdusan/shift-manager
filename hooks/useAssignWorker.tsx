import React, { useState } from "react";

const useAssignWorker = () => {
  const [assignedWorkers, setAssignedWorkers] = useState<string[]>([]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    checked
      ? setAssignedWorkers([...assignedWorkers, name])
      : setAssignedWorkers((prevState) =>
          prevState.filter((worker) => worker !== name)
        );
  };
  return [assignedWorkers, inputHandler] as const;
};

export default useAssignWorker;
