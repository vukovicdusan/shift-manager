"use client";
import React from "react";
import styles from "./Modal.module.css";
import { useAppSelector } from "@/store/hooks";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
import AddShiftForm from "../forms/AddShiftForm/AddShiftForm";
import { useCloseModal } from "@/hooks/useCloseModal";

type ModalProps = {
  workers: WorkersCollectionType[];
};

const Modal = (props: ModalProps) => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const [closeModal] = useCloseModal();

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
            {<AddShiftForm workers={props.workers}></AddShiftForm>}
          </dialog>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
