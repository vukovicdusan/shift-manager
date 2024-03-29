"use client";
import React, { useState } from "react";
import styles from "./DashboardNav.module.css";
import { useElementValue } from "@/hooks/useElementValue";

const DashboardNav = () => {
  const [active, setActive] = useState("Workers");
  const [valueHandler] = useElementValue();

  const buttonHandler = (buttonText: string) => {
    valueHandler(buttonText);
    setActive(buttonText);
  };
  return (
    <div className={styles.sidebarNav}>
      <ul className={styles.stack}>
        <li>
          <button
            className={`${
              active === "Add Worker" ? "" : styles.active
            } fake-link`}
            onClick={() => buttonHandler("Workers")}
          >
            <svg className={styles.icon}>
              <use xlinkHref={"./svg/sprite.svg#workers"}></use>
            </svg>{" "}
            Workers
          </button>
        </li>
        <li>
          <button
            className={`${
              active === "Add Worker" ? styles.active : ""
            } fake-link`}
            onClick={() => buttonHandler("Add Worker")}
          >
            <svg className={styles.icon}>
              <use xlinkHref={"./svg/sprite.svg#add-worker"}></use>
            </svg>{" "}
            Add Worker
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNav;
