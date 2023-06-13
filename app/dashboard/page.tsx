import React from "react";
import AdminProtectedPage from "../admin-protected-page/admin-protected-page";
import { getWorkers } from "@/helpers/shiftHandlers/getData";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";
import styles from "./DashboardPage.module.css";

const Dashboard = async () => {
  const workers: WorkersCollectionType[] = await getWorkers();

  workers.map((worker) => console.log(worker.name));
  return (
    <AdminProtectedPage>
      <div className={styles.sidebarWrapper}>
        <div>Sidebar</div>
        <div>Content</div>
        {/* {workers.map((worker: WorkersCollectionType, index) => (
          <div key={index}>{worker}</div>
        ))} */}
      </div>
    </AdminProtectedPage>
  );
};

export default Dashboard;
