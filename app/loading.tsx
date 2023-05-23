import React from "react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.center}>
      <span className={styles.loader}></span>;
    </div>
  );
};

export default Loader;
