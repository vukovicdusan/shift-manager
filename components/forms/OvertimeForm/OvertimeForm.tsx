import { createOvertimeInFirebase } from "@/helpers/overtimeHandlers/createOvertimeInFirebase";
import { useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import styles from "./OvertimeForm.module.css";
import { useCloseModal } from "@/hooks/useCloseModal";

type TOvertimeProps = {
  email: string;
  workerName: string;
};

const OvertimeForm = (props: TOvertimeProps) => {
  const [overtimeValue, setOvertimeValue] = useState<number>(0);
  const {
    formType,
    data: { title, id },
  } = useAppSelector((state) => state.modal);
  const [closeModal, reload] = useCloseModal();

  const overtimeFormHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    createOvertimeInFirebase(overtimeValue.toString(), id);
    closeModal();
    reload();
  };

  const incrementHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.name === "+"
      ? setOvertimeValue(overtimeValue + 1)
      : setOvertimeValue(overtimeValue - 1);
  };

  return (
    <>
      {formType === "overtime" && title === props.workerName ? (
        <form>
          <div className={styles.inputWrapper}>
            <label htmlFor="overtime">Overtime hours:</label>
            <div className={styles.counter}>
              <button
                name="-"
                onClick={incrementHandler}
                className={`${overtimeValue === 0 ? styles.disabled : ""}`}
              >
                -
              </button>
              <input
                type="number"
                id="overtime"
                name="overtime"
                min="0"
                max="8"
                value={overtimeValue}
              />
              <button
                name="+"
                onClick={incrementHandler}
                className={`${overtimeValue === 8 ? styles.disabled : ""}`}
              >
                +
              </button>
            </div>
            <button onClick={overtimeFormHandler}>Submit</button>
          </div>
        </form>
      ) : (
        title !== props.workerName && (
          <p className={styles.message}>
            Sorry, you are not allowed to do this. Try clicking on one of your
            shifts.
          </p>
        )
      )}
    </>
  );
};

export default OvertimeForm;
