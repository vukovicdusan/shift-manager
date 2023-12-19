import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { formatMyDate } from "../formatMyDate";
import { shiftDateLimiter } from "../shiftDateLimiter";
import { shiftStartEndHours } from "../shiftStartEndHours";

export const createShiftInFirebase = async (
  start: string,
  end: string,
  assignedWorkers: string[],
  shiftType: string
) => {
  for (const worker of assignedWorkers) {
    try {
      let newId = uuidv4();
      await setDoc(
        doc(db, "shifts", formatMyDate(start, "noslash") + "-" + newId),
        {
          title: worker,
          start: start + shiftStartEndHours(shiftType, "startHours"),
          end:
            shiftDateLimiter(end) + shiftStartEndHours(shiftType, "endHours"),
          id: formatMyDate(start, "noslash") + "-" + newId,
          className: shiftType,
        }
      );
    } catch (err) {
      console.log("Something is wrong", err);
    }
  }
};
