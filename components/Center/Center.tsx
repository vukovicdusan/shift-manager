import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import React from "react";
import styles from "./Center.module.css";

const Center = ({ children }: ChildrenPropsType) => {
  return <div className={styles.center}>{children}</div>;
};

export default Center;
