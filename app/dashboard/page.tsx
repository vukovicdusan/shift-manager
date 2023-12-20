import React from "react";
import AdminProtectedPage from "../admin-protected-page/admin-protected-page";
import { getShifts, getWorkers } from "@/helpers/shiftHandlers/getData";
import styles from "./DashboardPage.module.css";
import AddWorkerForm from "@/components/forms/AddWorkerForm/AddWorkerForm";
import DashboardNav from "@/components/DashboardNav/DashboardNav";
import CurrentWorkersList from "@/components/CurrentWorkersList/CurrentWorkersList";

export const revalidate = 0;

const Dashboard = async () => {
  const shifts = JSON.parse(JSON.stringify(await getShifts()));
  const workers = JSON.parse(JSON.stringify(await getWorkers()));

  return (
    <AdminProtectedPage>
      <div className={styles.sidebarWrapper}>
        <DashboardNav></DashboardNav>
        <div className={styles.switcher}>
          <CurrentWorkersList
            workers={workers}
            shifts={shifts}
          ></CurrentWorkersList>
          <AddWorkerForm workers={workers}></AddWorkerForm>
        </div>
      </div>
    </AdminProtectedPage>
  );
};

export default Dashboard;
