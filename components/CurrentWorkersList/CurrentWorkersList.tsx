"use client";
import styles from "./CurrentWorkerslist.module.css";
import React, { useState } from "react";
import { WorkersFirebaseType } from "@/types/WorkersFirebaseType";
import useWorker from "@/hooks/useWorker";
import { useAppSelector } from "@/store/hooks";
import { ShiftType } from "@/types/ShiftType";
import { current } from "@reduxjs/toolkit";

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
	const [monthSelect, setMonthSelect] = useState("All");
	const currentYear = new Date().getFullYear().toString();
	const [yearSelect, setYearSelect] = useState(currentYear);

	const { value } = useAppSelector((state) => state.dashboardNav);

	const monthsArr: string[] = [
		"All",
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const yearsArr: string[] = [];

	props.shifts.map((shift) => {
		if (shift.year && !yearsArr.includes(shift.year)) {
			yearsArr.push(shift.year);
		}
	});

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
		return monthSelect === "All"
			? props.shifts.filter(
					(el) => el.title === name && el.year === yearSelect
			  ).length
			: props.shifts.filter(
					(el) =>
						el.title === name &&
						el.month === monthSelect.toLowerCase() &&
						el.year === yearSelect
			  ).length;
	};

	return (
		<>
			{value === "Workers" ? (
				<>
					<table className={styles.table}>
						<caption>
							<select
								onChange={(e) => setYearSelect(e.target.value)}
								defaultValue={currentYear}
							>
								{yearsArr.map((year, index) => (
									<option key={index} value={year}>
										{year}
									</option>
								))}
							</select>
						</caption>
						<thead>
							<tr>
								<th>Worker</th>
								<th className={styles.flex}>
									Shifts
									<div className={styles.inputWrapper}>
										<select
											defaultValue={"All"}
											onChange={(e) =>
												setMonthSelect(e.target.value)
											}
											name="month"
											id="month"
										>
											{monthsArr.map((month, index) => (
												<option
													key={index}
													value={month}
												>
													{month}
												</option>
											))}
										</select>
									</div>
								</th>
								<th>Overtime</th>
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
										<td>0</td>
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
				</>
			) : (
				""
			)}
		</>
	);
};

export default CurrentWorkersList;
