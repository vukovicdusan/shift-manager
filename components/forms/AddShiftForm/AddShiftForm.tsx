"use client";
import React, { useState } from "react";
import styles from "./AddShiftForm.module.css";
import { capitalize } from "@/helpers/capitalize";
import { useAppSelector } from "@/store/hooks";
import Accordion from "@/components/Accordion/Accordion";
import useShiftForm from "@/hooks/useShiftForm";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
// import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";
import { createShiftInFirebase } from "@/helpers/createShiftInFirebase";

const AddShiftForm = ({ workers }: { workers: WorkersCollectionType[] }) => {
  const { start, end, alreadyAssignedWorkers } = useAppSelector(
    (state) => state.modal.data
  );

  const [assignedWorkers, inputHandler, shiftType, selectHandler] =
    useShiftForm();
  // const router = useRouter();
  const dispatch = useDispatch();

  const addShiftHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    createShiftInFirebase(start, end, assignedWorkers, shiftType);
    dispatch(
      openModal({
        isOpen: false,
        data: { start: "", end: "", alreadyAssignedWorkers: [] },
      })
    );
    // setTimeout(() => {
    //   router.refresh();
    // }, 500);
  };

  //REFINE THIS FILTER
  const filteredWorkers = workers.filter(
    (worker) => !alreadyAssignedWorkers.includes(worker.name)
  );

  return (
    <form onSubmit={addShiftHandler} className={styles.form}>
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
        {filteredWorkers.map((worker, index) => (
          <div key={index} className={styles.inputWrapper}>
            <input
              type="checkbox"
              name={worker.name}
              id={worker.name}
              onChange={inputHandler}
              value={worker.name}
            />
            <label htmlFor={worker.name}>{capitalize(worker.name)}</label>
          </div>
        ))}
      </Accordion>
      <div className={styles.inputWrapperColumn}>
        <select onChange={selectHandler} name="shift-type" id="shift-type">
          <option value="day">Day shift</option>
          <option value="night">Night shift</option>
        </select>
      </div>
      <button>Add Shift</button>
    </form>
  );
};

export default AddShiftForm;
