import React, { ReactNode } from "react";
import styles from "../styles/RegionWrapper.module.css";

interface RegionProps {
  children: ReactNode;
}
const Wrapper = (props: RegionProps) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

export default Wrapper;
