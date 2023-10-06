import React from "react";
import AdminProtectedPage from "../admin-protected-page/admin-protected-page";
import { getWorkers } from "@/helpers/shiftHandlers/getData";
import styles from "./DashboardPage.module.css";
import AddWorkerForm from "@/components/forms/AddWorkerForm/AddWorkerForm";
import { WorkersCollectionType } from "@/types/WorkersCollectionType";

import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { useAppSelector } from "@/store/hooks";

const Dashboard = async () => {
  const workers = await getWorkers();
  // const { dashboardNavHandler } = useAppSelector((state) => state.dashboardNav);
  // console.log(dashboardNavHandler);
  return (
    <AdminProtectedPage>
      <div className={styles.sidebarWrapper}>
        <DashboardNav></DashboardNav>
        <>
          <AddWorkerForm></AddWorkerForm>
        </>
        {/* <>
        {workers.map((worker: WorkersCollectionType, index) => (
          <div key={index}>{worker.name}</div>
          ))}
        </> */}
      </div>
    </AdminProtectedPage>
  );
};

export default Dashboard;
