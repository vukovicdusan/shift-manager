import React from "react";
import AdminProtectedPage from "../admin-protected-page/admin-protected-page";
import { getWorkers } from "@/helpers/shiftHandlers/getData";
import styles from "./DashboardPage.module.css";
import AddWorkerForm from "@/components/forms/AddWorkerForm/AddWorkerForm";
import DashboardNav from "@/components/DashboardNav/DashboardNav";
import CurrentWorkersList from "@/components/CurrentWorkersList/CurrentWorkersList";

const Dashboard = async () => {
  const workers = await getWorkers();

  return (
    <AdminProtectedPage>
      <div className={styles.sidebarWrapper}>
        <DashboardNav></DashboardNav>
        <div className={styles.switcher}>
          <CurrentWorkersList workers={workers}></CurrentWorkersList>
          <AddWorkerForm></AddWorkerForm>
        </div>
      </div>
    </AdminProtectedPage>
  );
};

export default Dashboard;
