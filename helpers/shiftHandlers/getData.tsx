import { db } from "@/firebase/firebase";
import { ShiftType } from "@/types/ShiftType";
import { WorkersFirebaseType } from "@/types/WorkersFirebaseType";
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
  let workersArr: WorkersFirebaseType[] = [];
  const querySnapshot = await getDocs(collection(db, "workers"));
  querySnapshot.forEach((doc) => {
    const workersData = doc.data().name;
    const workersId = doc.id;
    const workersEmail = doc.data().email;
    const workersUid = doc.data().uid;
    workersArr.push({
      id: workersId,
      name: workersData,
      email: workersEmail,
      uid: workersUid,
    });
  });

  return workersArr;
};
