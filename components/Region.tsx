import React, { ReactNode } from "react";
import styles from "../styles/RegionWrapper.module.css";
interface RegionProps {
  children: ReactNode;
}
const Region = (props: RegionProps) => {
  return <section className={styles.region}>{props.children}</section>;
};

export default Region;
