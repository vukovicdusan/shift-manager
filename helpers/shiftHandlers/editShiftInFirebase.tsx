import { db } from "@/firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { shiftDateCleaner } from "../shiftDateCleaner";
import { shiftStartEndHours } from "../shiftStartEndHours";

export const editShiftInFirebase = async (
  shiftId: string,
  start: string,
  end: string,
  shiftType: string,
  overtimeAuthorization: boolean
) => {
  const shiftRef = doc(db, "shifts", shiftId);

  try {
    let editedShiftData = {
      start:
        shiftDateCleaner(start) + shiftStartEndHours(shiftType, "startHours"),
      end: shiftDateCleaner(end) + shiftStartEndHours(shiftType, "endHours"),
      id: shiftId,
      className: shiftType,
      edited: serverTimestamp(),
      ...(overtimeAuthorization && {
        "overtime.authorized": overtimeAuthorization,
      }),
    };

    await updateDoc(shiftRef, editedShiftData);
  } catch (err) {
    console.log("Something went wrong while editing the shift", err);
  }
};
