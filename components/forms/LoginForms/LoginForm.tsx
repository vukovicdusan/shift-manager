"use client";
import React from "react";
import styles from "./LoginForm.module.css";
import useLogin from "@/hooks/useLogin";

const LoginForm = () => {
  const [inputHandler, , loginHandler] = useLogin();

  return (
    <>
      <form onSubmit={loginHandler} className={styles.stack}>
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
