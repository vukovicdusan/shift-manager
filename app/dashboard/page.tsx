import React from "react";
import AdminProtectedPage from "../admin-protected-page/admin-protected-page";
import { getWorkers } from "@/helpers/shiftHandlers/getData";
import styles from "./DashboardPage.module.css";
import AddWorkerForm from "@/components/forms/AddWorkerForm/AddWorkerForm";

const Dashboard = async () => {
  const workers = await getWorkers();
  return (
    <div className={styles.sidebarWrapper}>
      <div>Sidebar</div>
      <>
        <AdminProtectedPage>
          <AddWorkerForm></AddWorkerForm>
        </AdminProtectedPage>
      </>
      <></>
      {/* {workers.map((worker: WorkersCollectionType, index) => (
          <div key={index}>{worker}</div>
        ))} */}
    </div>
  );
};

export default Dashboard;
