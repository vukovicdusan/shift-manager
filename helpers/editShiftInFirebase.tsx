import { db } from "@/public/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const editShiftInFirebase = async (shiftId: string) => {
  console.log(shiftId);
  //   const shiftRef = doc(db, "shifts", shiftId);
  //   try {
  //     await updateDoc(shiftRef, {
  //       start: "",
  //       end: "",
  //       id: "",
  //       title: "",
  //       classNames: [""],
  //     });
  //   } catch (err) {
  //     console.log("Something went wrong while editing the shift", err);
  //   }
};
