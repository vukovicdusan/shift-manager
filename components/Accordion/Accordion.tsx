"use client";
import React, { useRef } from "react";
import styles from "./Accordion.module.css";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";

interface AccordionProps extends ChildrenPropsType {
  title: string;
}

const Accordion = (props: AccordionProps) => {
  const [accordionOpen, setAccordionOpen] = React.useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  const accordionToggleHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setAccordionOpen((prevState) => !prevState);

    if (accordionRef.current?.style.maxHeight) {
      accordionRef.current.style.maxHeight = "";
    } else {
      accordionRef.current!.style.maxHeight =
        accordionRef.current?.scrollHeight + "px";
    }
  };

  return (
    <div className={styles.accordion}>
      <div
        onClick={accordionToggleHandler}
        className={styles.accordionToggle}
        role="button"
        aria-expanded={accordionOpen}
      >
        <p>{props.title}</p>
        <svg
          className={`${styles.accordionIcon} ${
            accordionOpen ? styles.rotate : ""
          }`}
        >
          <use xlinkHref={"./svg/sprite.svg#chevron"}></use>
        </svg>
      </div>
      <div ref={accordionRef} className={styles.accordionContent}>
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;
