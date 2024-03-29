import { db } from "@/firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteShiftFromFirebase = async (shiftId: string) => {
  await deleteDoc(doc(db, "shifts", shiftId));
};
