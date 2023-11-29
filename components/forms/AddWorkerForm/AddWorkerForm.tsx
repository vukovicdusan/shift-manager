"use client";
import styles from "./AddWorkerForm.module.css";
import React from "react";
import useWorker from "@/hooks/useWorker";
import { useAppSelector } from "@/store/hooks";

const AddWorkerForm = () => {
  const [inputHandler, createWorkerInFirebase, passwordError] = useWorker();
  const { value } = useAppSelector((state) => state.dashboardNav);
  return (
    <>
      {value === "Add Worker" ? (
        <form
          onSubmit={(e: React.MouseEvent<HTMLFormElement>) =>
            createWorkerInFirebase(e)
          }
          className={styles.form}
        >
          <div className={styles.stack}>
            <div className={styles.flex}>
              <div className={styles.inputWrapperColumn}>
                <label htmlFor="username">Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                  onChange={inputHandler}
                />
              </div>
              <div className={styles.inputWrapperColumn}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                  pattern="[^@]+@[^\.]+\..+"
                  onChange={inputHandler}
                  title="Please enter a real mail"
                />
              </div>
            </div>
            <div className={styles.flex}>
              <div className={styles.inputWrapperColumn}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={inputHandler}
                  required
                />
              </div>
              <div className={styles.inputWrapperColumn}>
                <label htmlFor="repeatPassword">Repeat Password</label>
                <input
                  className={passwordError ? styles.error : ""}
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  onChange={inputHandler}
                  required
                />
              </div>
            </div>
            <button type="submit">Add Worker</button>
          </div>
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default AddWorkerForm;
