"use client";
import React from "react";
import styles from "./DashboardNav.module.css";
import { useElementValue } from "@/hooks/useElementValue";

const DashboardNav = () => {
  const [valueHandler] = useElementValue();
  return (
    <div className={styles.sidebarNav}>
      <ul className={styles.stack}>
        <li>
          <button
            className="fake-link"
            onClick={() => valueHandler("Add Worker")}
          >
            Add Worker
          </button>
        </li>
        <li>
          <button className="fake-link" onClick={() => valueHandler("Workers")}>
            Workers
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNav;