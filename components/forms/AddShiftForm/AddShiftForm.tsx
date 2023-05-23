"use client";
import React, { useState } from "react";
import styles from "./AddShiftForm.module.css";
import { capitalize } from "@/helpers/capitalize";
import { useAppSelector } from "@/store/hooks";
import Accordion from "@/components/Accordion/Accordion";

//this should be coming from firebase
const workersArr = ["paja", "patak", "tuna"];

interface WorkerType {
  name: string;
  checked: boolean;
}

const init_state: WorkerType[] = workersArr.map((worker) => ({
  name: worker,
  checked: false,
}));

const AddShiftForm = () => {
  const [workerInput, setWorkerInput] = useState(init_state);
  const { start, end } = useAppSelector((state) => state.modal.data);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setWorkerInput((prevState) =>
      prevState.map((worker) =>
        worker.name === name ? { ...worker, checked: checked } : worker
      )
    );
  };
  console.log(workerInput);

  return (
    <form className={styles.form}>
      <div className={styles.center}>
        <h3>Assign Workers</h3>
      </div>
      <div className={styles.wrap}>
        <div className={styles.inputWrapperColumn}>
          <label htmlFor="start">Start</label>
          <input
            type="text"
            id="start"
            name="start"
            value={start}
            readOnly={true}
          />
        </div>
        <div className={styles.inputWrapperColumn}>
          <label htmlFor="end">End</label>
          <input type="text" id="end" name="end" value={end} readOnly={true} />
        </div>
      </div>
      <Accordion title={"Pick Workers"}>
        {init_state.map((worker, index) => (
          <div key={index} className={styles.inputWrapper}>
            <input
              type="checkbox"
              name={worker.name}
              // checked={worker.checked}
              id={worker.name}
              required
              onChange={inputHandler}
            />
            <label htmlFor={worker.name}>{capitalize(worker.name)}</label>
          </div>
        ))}
      </Accordion>
    </form>
  );
};

export default AddShiftForm;
