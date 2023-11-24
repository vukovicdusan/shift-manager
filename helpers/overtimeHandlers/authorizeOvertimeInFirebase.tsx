import { db } from "@/firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const authorizeOvertimeInFirebase = async (
  shiftId: string,
  overtimeHours: string
) => {
  const shiftRef = doc(db, "shifts", shiftId);
  try {
    await updateDoc(shiftRef, {
      authorizedOn: serverTimestamp(),
      overtime: { hours: overtimeHours, authorized: true },
    });
  } catch (err) {
    console.log("Something went wrong while editing the shift", err);
  }
};
