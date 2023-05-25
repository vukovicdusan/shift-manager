"use client";
import React from "react";
import styles from "./Modal.module.css";
import { useAppSelector } from "@/store/hooks";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";

const Modal = (props: ChildrenPropsType) => {
  const modalStatus = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  console.log(props.children);
  return (
    <>
      {modalStatus ? (
        <div className={styles.modal}>
          <dialog>
            {" "}
            <span
              onClick={() => {
                dispatch(
                  openModal({
                    isOpen: false,
                    data: { start: "", end: "", alreadyAssignedWorkers: [] },
                  })
                );
              }}
              className="modal-close"
            >
              <svg className={styles.closeIcon}>
                <use xlinkHref={"./svg/sprite.svg#close"}></use>
              </svg>
            </span>
            {props.children}
          </dialog>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
