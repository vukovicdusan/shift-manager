"use client";
import styles from "./CurrentWorkerslist.module.css";
import React, { useState } from "react";
import { WorkersFirebaseType } from "@/types/WorkersFirebaseType";
import useWorker from "@/hooks/useWorker";
import { useAppSelector } from "@/store/hooks";

type WorkersProps = {
	workers: WorkersFirebaseType[];
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

	return (
		<>
			{value === "Workers" ? (
				<div className={styles.container}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Worker</th>
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
										{/* <div className={styles.worker}> */}
										<td className={styles.worker}>
											{worker.name}
										</td>
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
										{/* </div> */}
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
