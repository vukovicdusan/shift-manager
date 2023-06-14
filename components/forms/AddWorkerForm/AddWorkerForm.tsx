"use client";
import Center from "@/components/Center/Center";
import styles from "./AddWorkerForm.module.css";
import React from "react";

import useWorker from "@/hooks/useWorker";

const AddWorkerForm = () => {
  const [inputHandler, createWorkerInFirebase, passwordError] = useWorker();

  return (
    <>
      <form
        onSubmit={(e: React.MouseEvent<HTMLFormElement>) =>
          createWorkerInFirebase(e)
        }
        className={styles.form}
      >
        <Center>
          <h3>Add Worker</h3>
        </Center>
        <div className={styles.stack}>
          <div className={styles.inputWrapperColumn}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              autoCapitalize="none"
              autoCorrect="off"
              required
              pattern="[^@]+@[^\.]+\..+"
              onChange={inputHandler}
              title="Please enter a real mail"
            />
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default AddWorkerForm;
