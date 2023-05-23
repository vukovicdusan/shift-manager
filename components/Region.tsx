import React from "react";
import styles from "../styles/RegionWrapper.module.css";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";

const Region = (props: ChildrenPropsType) => {
  return <section className={styles.region}>{props.children}</section>;
};

export default Region;
