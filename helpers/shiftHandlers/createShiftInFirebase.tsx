import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { adjustDateForNightShift } from "../adjustDateForNightShift";
import { formatMyDate } from "../formatMyDate";
import { adjustDateForDayShift } from "../adjustDateForDayShift";
import { shiftStartEndHours } from "../shiftStartEndHours";

export const createShiftInFirebase = async (
  start: string,
  end: string,
  assignedWorkers: string[],
  shiftType: string
) => {
  for (const worker of assignedWorkers) {
    console.log(shiftStartEndHours("night", "endHours"));
    try {
      let newId = uuidv4();
      await setDoc(
        doc(db, "shifts", formatMyDate(start, "noslash") + "-" + newId),
        {
          title: worker,
          start: start + shiftStartEndHours(shiftType, "startHours"),
          end:
            adjustDateForDayShift(end) +
            shiftStartEndHours(shiftType, "endHours"),
          id: formatMyDate(start, "noslash") + "-" + newId,
          className: shiftType,
        }
      );
    } catch (err) {
      console.log("Something is wrong", err);
    }
  }
};
