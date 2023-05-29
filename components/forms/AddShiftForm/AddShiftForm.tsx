"use client";
import React from "react";
import styles from "./AddShiftForm.module.css";
import { capitalize } from "@/helpers/capitalize";
import { useAppSelector } from "@/store/hooks";
import Accordion from "@/components/Accordion/Accordion";
import useShiftForm from "@/hooks/useShiftForm";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
import { createShiftInFirebase } from "@/helpers/shiftHandlers/createShiftInFirebase";
import { editShiftInFirebase } from "@/helpers/shiftHandlers/editShiftInFirebase";
import { deleteShiftFromFirebase } from "@/helpers/shiftHandlers/deleteShiftFromFirebase";
import { useCloseModal } from "@/hooks/useCloseModal";
import { formatDate } from "fullcalendar";

const AddShiftForm = ({ workers }: { workers: WorkersCollectionType[] }) => {
  const {
    formType,
    data: { start, end, alreadyAssignedWorkers, id, title, classNames },
  } = useAppSelector((state) => state.modal);

  const [closeModal, reload] = useCloseModal();

  const [assignedWorkers, inputHandler, shiftType, selectHandler] =
    useShiftForm();

  const addShiftHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createShiftInFirebase(start, end, assignedWorkers, shiftType);
    closeModal();
    reload();
  };

  const editShiftHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editShiftInFirebase(id, start, end, shiftType);
    closeModal();
    reload();
  };

  const deleteShiftHandler = async () => {
    await deleteShiftFromFirebase(id);
    closeModal();
    reload();
  };

  const unAssignedWorkers = workers.filter(
    (worker) => !alreadyAssignedWorkers!.includes(worker.name)
  );

  const isAddForm = formType === "add";

  const formatMyDate = (date: string) => {
    return formatDate(date, {
      month: "numeric",
      year: "numeric",
      day: "numeric",
      // timeZoneName: "short",
      timeZone: "local",
      locale: "sr",
    });
  };

  return (
    <form
      onSubmit={formType === "add" ? addShiftHandler : editShiftHandler}
      className={styles.form}
    >
      <div className={styles.center}>
        <h3>
          {isAddForm ? "Assign Workers" : "Edit shift for "}
          {isAddForm ? "" : <span className={styles.title}>{title}</span>}
        </h3>
      </div>
      <div className={styles.wrap}>
        <div className={styles.inputWrapperColumn}>
          <label htmlFor="start">Start</label>
          <input
            type="text"
            id="start"
            name="start"
            defaultValue={start}
            readOnly={isAddForm ? true : false}
          />
        </div>
        <div className={styles.inputWrapperColumn}>
          <label htmlFor="end">End</label>
          <input
            type="text"
            id="end"
            name="end"
            defaultValue={end}
            readOnly={isAddForm ? true : false}
          />
        </div>
      </div>
      <div className={styles.flex}>
        {isAddForm ? (
          <Accordion title={"Assign Workers"}>
            {unAssignedWorkers.map((worker, index) => (
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
        ) : (
          ""
        )}
        <div className={styles.inputWrapper}>
          <select
            defaultValue={classNames[0] === "night" ? "night" : "day"}
            onChange={selectHandler}
            name="shift-type"
            id="shift-type"
          >
            <option value="day">Day shift</option>
            <option value="night">Night shift</option>
          </select>
        </div>
      </div>
      <div className={`${styles.flex} ${styles.buttonsFlex}`}>
        <button type="submit">{isAddForm ? "Add Shift" : "Edit Shift"}</button>
        {isAddForm ? (
          ""
        ) : (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={deleteShiftHandler}
          >
            Delete Shift
          </button>
        )}
      </div>
    </form>
  );
};

export default AddShiftForm;
