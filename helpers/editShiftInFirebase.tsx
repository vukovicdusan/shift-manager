import { db } from "@/public/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const editShiftInFirebase = async (
  shiftId: string,
  start: string,
  end: string,
  shiftType: string
) => {
  const shiftRef = doc(db, "shifts", shiftId);

  try {
    await updateDoc(shiftRef, {
      start: start,
      end: end,
      id: shiftId,
      className: shiftType,
    });
  } catch (err) {
    console.log("Something went wrong while editing the shift", err);
  }
};
