import React from "react";
import AdminProtectedPage from "../admin-protected-page/admin-protected-page";
import { getWorkers } from "@/helpers/shiftHandlers/getData";
import styles from "./DashboardPage.module.css";
import AddWorkerForm from "@/components/forms/AddWorkerForm/AddWorkerForm";
import DashboardNav from "@/components/DashboardNav/DashboardNav";
import { useAppSelector } from "@/store/hooks";
import CurrentWorkersList from "@/components/CurrentWorkersList/CurrentWorkersList";
// import { deleteUser } from "../api/deleteUser/route";

const Dashboard = async () => {
  const workers = await getWorkers();
  // const { dashboardNavHandler } = useAppSelector((state) => state.dashboardNav);
  // console.log(dashboardNavHandler);

  // deleteUser("3i94Kg4S9zLnI1wWeLx4OwKQ1gr1");

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
