"use client";
import React, { useState } from "react";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = () => {};

  console.log(input);
  return (
    <form className={styles.stack}>
      <div className={styles.center}>
        <h3>Login</h3>
      </div>
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
            // defaultValue={formatMyDate(start)}
            // readOnly={isAddForm ? true : false}
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
      </div>
      <button type="submit" onClick={loginHandler}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
