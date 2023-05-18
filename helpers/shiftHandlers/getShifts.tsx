import { db } from "@/public/firebase/firebase";
import { ShiftType } from "@/types/ShiftType";
import { collection, getDocs } from "firebase/firestore";

export const getShifts = async () => {
  let shiftsArr: ShiftType[] = [];
  const querySnapshot = await getDocs(collection(db, "shifts"));
  querySnapshot.forEach((doc) => {
    const shiftData = doc.data() as ShiftType;
    shiftsArr.push(shiftData);
  });

  return shiftsArr;
};
