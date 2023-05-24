import { db } from "@/public/firebase/firebase";
import { ShiftType } from "@/types/ShiftType";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
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

export const getWorkers = async () => {
  let workersArr: WorkersCollectionType[] = [];
  const querySnapshot = await getDocs(collection(db, "workers"));
  querySnapshot.forEach((doc) => {
    const workersData = doc.data() as WorkersCollectionType;
    workersArr.push(workersData);
  });

  return workersArr;
};
