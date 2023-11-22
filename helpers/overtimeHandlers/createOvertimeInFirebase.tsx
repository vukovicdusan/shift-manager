import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { formatMyDate } from "../formatMyDate";

export const createOvertimeInFirebase = async (
  date: string,
  email: string,
  overtime: string
) => {
  try {
    let newId = uuidv4();
    await setDoc(
      doc(db, "overtime", formatMyDate(date, "noslash") + "-" + newId),
      {
        date: date,
        email: email,
        overtime: overtime,
        verified: false,
      }
    );
  } catch (err) {
    console.log("Something is wrong", err);
  }
};
