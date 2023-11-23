import { createOvertimeInFirebase } from "@/helpers/overtimeHandlers/createOvertimeInFirebase";
import { useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import styles from "./OvertimeForm.module.css";

type TOvertimeProps = {
  email: string;
  workerName: string;
};

const OvertimeForm = (props: TOvertimeProps) => {
  const [overtimeValue, setOvertimeValue] = useState<string>("0");
  const {
    formType,
    data: { start, title },
  } = useAppSelector((state) => state.modal);

  const overtimeFormHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOvertimeInFirebase(start, props.email, overtimeValue);
  };

  return (
    <>
      {formType === "overtime" && title === props.workerName ? (
        <form onSubmit={overtimeFormHandler}>
          <div className={styles.inputWrapper}>
            <label htmlFor="overtime">Overtime hours:</label>
            <input
              onChange={(e) => setOvertimeValue(e.target.value)}
              type="number"
              id="overtime"
              name="overtime"
              min="0"
              max="8"
            />
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
