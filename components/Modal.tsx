"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Modal.module.css";
import { useAppSelector } from "@/store/hooks";

const Modal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalStatus = useAppSelector((state) => state.modal.isOpen);

  useEffect(() => {
    modalStatus ? setModalIsOpen(false) : setModalIsOpen(true);
    console.log("modalStatus has changed", modalStatus);
  }, [modalStatus]);

  console.log(modalIsOpen, modalStatus);
  return (
    <>
      {modalIsOpen ? (
        <div className={styles.modal}>
          <dialog>Modal</dialog>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Modal;
