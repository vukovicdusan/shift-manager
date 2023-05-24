import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/public/firebase/firebase";

export const createShiftFirebase = (
  start: string,
  end: string,
  assignedWorkers: string[]
) => {
  assignedWorkers.forEach(async (worker) => {
    let newId = uuidv4();
    await setDoc(doc(db, "shifts", newId), {
      title: worker,
      start: start,
      end: end,
      id: newId,
    });
  });
};
