import { db } from "@/firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const createOvertimeInFirebase = async (
  overtime: string,
  shiftId: string
) => {
  const shiftRef = doc(db, "shifts", shiftId);

  try {
    await updateDoc(shiftRef, {
      edited: serverTimestamp(),
      overtime: { hours: overtime, valid: false },
    });
  } catch (err) {
    console.log("Something went wrong while editing the shift", err);
  }
};
