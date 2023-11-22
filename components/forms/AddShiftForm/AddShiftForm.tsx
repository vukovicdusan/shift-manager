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
import { formatMyDate } from "@/helpers/formatMyDate";
import Center from "@/components/Center/Center";

const AddShiftForm = ({ workers }: { workers: WorkersCollectionType[] }) => {
  const {
    formType,
    data: { start, end, alreadyAssignedWorkers, id, title, classNames },
  } = useAppSelector((state) => state.modal);

  const [closeModal, reload] = useCloseModal();

  const [
    assignedWorkers,
    inputHandler,
    shiftType,
    selectHandler,
    editedDate,
    editDateHandler,
  ] = useShiftForm();

  const addShiftHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createShiftInFirebase(start, start, assignedWorkers, shiftType);
    closeModal();
    reload();
  };

  const editShiftHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editShiftInFirebase(id, editedDate.start, editedDate.end, shiftType);
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

  return (
    <form
      onSubmit={formType === "add" ? addShiftHandler : editShiftHandler}
      className={styles.form}
    >
      <Center>
        <h3>
          {isAddForm ? "Assign Workers" : "Edit shift for "}
          {isAddForm ? "" : <span className={styles.title}>{title}</span>}
          {/* {<>{formatMyDate("2023-11-02T08:00:00")}</>} */}
        </h3>
      </Center>
      <div className={styles.wrap}>
        <div className={styles.inputWrapperColumn}>
          <label htmlFor="start">Start</label>
          <input
            type="text"
            id="start"
            name="start"
            defaultValue={formatMyDate(start)}
            readOnly={isAddForm ? true : false}
            onChange={editDateHandler}
            pattern="\d{2}/\d{2}/\d{4}"
            title="Please enter a date in the format 'DD/MM/YYYY'"
          />
        </div>
        <div className={styles.inputWrapperColumn}>
          <label htmlFor="end">End</label>
          <input
            type="text"
            id="end"
            name="end"
            defaultValue={formatMyDate(start)}
            // defaultValue={
            //   shiftType !== "day" ? formatMyDate(start) : formatMyDate(end)
            // }
            readOnly={isAddForm ? true : false}
            onChange={editDateHandler}
            pattern="\d{2}/\d{2}/\d{4}"
            title="Please enter a date in the format 'DD/MM/YYYY'"
          />
        </div>
      </div>
      <div className={styles.flex}>
        {isAddForm ? (
          <Accordion title={"Assign Workers"}>
            {unAssignedWorkers.map((worker, index) => (
              <div key={index} className={styles.inputWrapper}>
                <input
                  className={styles.styledCheckbox}
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
