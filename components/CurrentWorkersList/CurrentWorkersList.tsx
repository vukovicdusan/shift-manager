"use client";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
import styles from "./CurrentWorkerslist.module.css";
import React from "react";

type WorkersProps = {
  workers: WorkersCollectionType[];
};

const CurrentWorkersList = (props: WorkersProps) => {
  return (
    <div className={styles.container}>
      <h3>Current Workers</h3>
      {props.workers.map((worker: WorkersCollectionType, index: number) => (
        <div key={index}>{worker.name}</div>
      ))}
    </div>
  );
};

export default CurrentWorkersList;
