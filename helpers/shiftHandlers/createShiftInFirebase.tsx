import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { adjustDateForNightShift } from "../adjustDateForNightShift";

export const createShiftInFirebase = async (
  start: string,
  end: string,
  assignedWorkers: string[],
  shiftType: string
) => {
  for (const worker of assignedWorkers) {
    const dayShift = shiftType === "day";
    const startWorkHours = dayShift ? "T08:00:00" : "T20:00:00";
    const endWorkHours = dayShift ? "T20:00:00" : "T08:00:00";

    try {
      let newId = uuidv4();
      await setDoc(doc(db, "shifts", newId), {
        title: worker,
        // start: start,
        // end: end,
        start: start + startWorkHours,
        end: (dayShift ? end : adjustDateForNightShift(end)) + endWorkHours,
        id: newId,
        className: shiftType,
      });
    } catch (err) {
      console.log("Something is wrong", err);
    }
  }
};
