"use client";
import React from "react";
import styles from "./AddEditShiftsModal.module.css";
import { useAppSelector } from "@/store/hooks";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
import AddShiftForm from "../forms/AddShiftForm/AddShiftForm";
import { useCloseModal } from "@/hooks/useCloseModal";
import OvertimeForm from "../forms/OvertimeForm/OvertimeForm";

type ModalProps = {
  workers: WorkersCollectionType[];
};

const Modal = (props: ModalProps) => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const [closeModal] = useCloseModal();

  const { isAdmin, email } = useAppSelector((state) => state.user);

  let workerName: string = "";
  let userWorker = props.workers.filter((worker) => worker.email === email);
  userWorker.map((worker) => {
    workerName = worker.name;
  });
  return (
    <>
      {isOpen ? (
        <div className={styles.modal}>
          <dialog>
            {" "}
            <span onClick={() => closeModal()} className="modal-close">
              <svg className={styles.closeIcon}>
                <use xlinkHref={"./svg/sprite.svg#close"}></use>
              </svg>
            </span>
            {!isAdmin ? (
              <OvertimeForm
                email={email}
                workerName={workerName}
              ></OvertimeForm>
            ) : (
              <AddShiftForm workers={props.workers}></AddShiftForm>
            )}
          </dialog>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
