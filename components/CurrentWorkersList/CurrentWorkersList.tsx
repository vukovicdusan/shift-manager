"use client";
import styles from "./CurrentWorkerslist.module.css";
import React, { useState } from "react";
import { WorkersFirebaseType } from "@/types/WorkersFirebaseType";
import useWorker from "@/hooks/useWorker";
import { useAppSelector } from "@/store/hooks";
import { ShiftType } from "@/types/ShiftType";

type WorkersProps = {
	workers: WorkersFirebaseType[];
	shifts: ShiftType[];
};

const CurrentWorkersList = (props: WorkersProps) => {
	const [, , , removeWorkerFromFirebase] = useWorker();
	const [openDialog, setOpenDialog] = useState(false);
	const [workerInfo, setWorkerInfo] = useState<WorkersFirebaseType>({
		id: "",
		name: "",
		email: "",
		uid: "",
	});
	const { value } = useAppSelector((state) => state.dashboardNav);

	const removeWorkerHandler = (workerId: string, workerUid: string) => {
		removeWorkerFromFirebase(workerId, workerUid);
		setOpenDialog(false);
	};

	const openDialogHandler = (worker: WorkersFirebaseType) => {
		setOpenDialog(true);
		setWorkerInfo({
			id: worker.id,
			name: worker.name,
			email: worker.email,
			uid: worker.uid,
		});
	};

	const shiftCounter = (name: String) => {
		return props.shifts.filter((el) => el.title === name).length;
	};

	return (
		<>
			{value === "Workers" ? (
				<div className={styles.container}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Worker</th>
								<th>Shifts</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{props.workers.map(
								(
									worker: WorkersFirebaseType,
									index: number
								) => (
									<tr key={index}>
										<td className={styles.worker}>
											{worker.name}
										</td>
										<td>{shiftCounter(worker.name)}</td>
										<td className={styles.action}>
											<button
												title="Remove worker"
												className={styles.btn}
												onClick={() =>
													openDialogHandler(worker)
												}
											>
												<svg
													className={styles.closeIcon}
												>
													<use
														xlinkHref={
															"./svg/sprite.svg#close"
														}
													></use>
												</svg>
											</button>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
					{openDialog ? (
						<div className={styles.dialog}>
							<p>
								Are you sure you want to delete worker:{" "}
								<span className="">{workerInfo.name}</span>
							</p>
							<div>
								<button
									onClick={() =>
										removeWorkerHandler(
											workerInfo.id,
											workerInfo.uid
										)
									}
								>
									Yes I&apos;m sure
								</button>
								<button onClick={() => setOpenDialog(false)}>
									No
								</button>
							</div>
						</div>
					) : (
						""
					)}
				</div>
			) : (
				""
			)}
		</>
	);
};

export default CurrentWorkersList;
