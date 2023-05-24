"use client";
import React, { useState } from "react";
import styles from "./AddShiftForm.module.css";
import { capitalize } from "@/helpers/capitalize";
import { useAppSelector } from "@/store/hooks";
import Accordion from "@/components/Accordion/Accordion";
import useAssignWorker from "@/hooks/useAssignWorker";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";
import { createShiftInFirebase } from "@/helpers/createShiftInFirebase";

const AddShiftForm = ({ workers }: { workers: WorkersCollectionType[] }) => {
  const { start, end } = useAppSelector((state) => state.modal.data);
  const [assignedWorkers, inputHandler] = useAssignWorker();
  const router = useRouter();
  const dispatch = useDispatch();

  const addShiftHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    createShiftInFirebase(start, end, assignedWorkers);
    dispatch(
      openModal({
        isOpen: false,
        data: { start: "", end: "" },
      })
    );
    setTimeout(() => {
      router.refresh();
    }, 500);
  };

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
        {workers.map((worker, index) => (
          <div key={index} className={styles.inputWrapper}>
            <input
              type="checkbox"
              name={worker.name}
              id={worker.name}
              onChange={inputHandler}
            />
            <label htmlFor={worker.name}>{capitalize(worker.name)}</label>
          </div>
        ))}
      </Accordion>
      <button>Add Shift</button>
    </form>
  );
};

export default AddShiftForm;
