import { db } from "@/firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const editShiftInFirebase = async (
  shiftId: string,
  start: string,
  end: string,
  shiftType: string,
  overtimeAuthorization: boolean
) => {
  const shiftRef = doc(db, "shifts", shiftId);

  try {
    const dayShift = shiftType === "day";
    // const startWorkHours = dayShift ? "T08:00:00" : "T20:00:00";
    // const endWorkHours = dayShift ? "T20:00:00" : "T00:00:00";

    let editedShiftData = {
      start: start,
      end: end,
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
