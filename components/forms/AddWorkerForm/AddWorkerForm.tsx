"use client";
import styles from "./AddWorkerForm.module.css";
import React from "react";
import useWorker from "@/hooks/useWorker";
import { useAppSelector } from "@/store/hooks";

const AddWorkerForm = () => {
  const [
    inputHandler,
    createWorkerInFirebase,
    passwordError,
    ,
    usernameError,
    emailError,
  ] = useWorker();
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
            <div className={styles.inputWrapperColumn}>
              <label htmlFor="username">Name</label>
              <input
                className={usernameError.error ? styles.error : ""}
                type="text"
                id="username"
                name="username"
                autoCapitalize="off"
                autoCorrect="off"
                required
                onChange={inputHandler}
              />
              {usernameError.error && (
                <span className={styles.textError}>
                  {usernameError.message}
                </span>
              )}
            </div>
            <div className={styles.inputWrapperColumn}>
              <label htmlFor="email">Email</label>
              <input
                className={emailError.error ? styles.error : ""}
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
              {emailError.error && (
                <span className={styles.textError}>{emailError.message}</span>
              )}
            </div>
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
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default AddWorkerForm;
