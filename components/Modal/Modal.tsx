"use client";
import React from "react";
import styles from "./Modal.module.css";
import { useAppSelector } from "@/store/hooks";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/slices/modalSlice";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
import AddShiftForm from "../forms/AddShiftForm/AddShiftForm";

type ModalProps = {
  workers: WorkersCollectionType[];
};

const Modal = (props: ModalProps) => {
  const { type, isOpen, data } = useAppSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      {isOpen ? (
        <div className={styles.modal}>
          <dialog>
            {" "}
            <span
              onClick={() => {
                dispatch(
                  openModal({
                    isOpen: false,
                    type: "",
                    data: {
                      start: "",
                      end: "",
                      alreadyAssignedWorkers: [],
                      id: "",
                      title: "",
                      classNames: [""],
                    },
                  })
                );
              }}
              className="modal-close"
            >
              <svg className={styles.closeIcon}>
                <use xlinkHref={"./svg/sprite.svg#close"}></use>
              </svg>
            </span>
            {<AddShiftForm type={type} workers={props.workers}></AddShiftForm>}
          </dialog>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
