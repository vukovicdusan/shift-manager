import { db } from "@/firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
// import { adjustDateForNightShift } from "../adjustDateForNightShift";

export const editShiftInFirebase = async (
	shiftId: string,
	start: string,
	end: string,
	shiftType: string
) => {
	const shiftRef = doc(db, "shifts", shiftId);

	try {
		const dayShift = shiftType === "day";
		const startWorkHours = dayShift ? "T08:00:00" : "T20:00:00";
		const endWorkHours = dayShift ? "T20:00:00" : "T00:00:00";
		await updateDoc(shiftRef, {
			start: start,
			end: end,
			id: shiftId,
			className: shiftType,
			edited: serverTimestamp(),
		});
	} catch (err) {
		console.log("Something went wrong while editing the shift", err);
	}
};
