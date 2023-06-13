"use client";
import React from "react";
import ProtectedPage from "../protected-page/protected-page";
import AdminProtectedPage from "../admin-protected-page/admin-protected-page";
const Dashboard = () => {
  return (
    <AdminProtectedPage>
      <div>Dashboard</div>
    </AdminProtectedPage>
  );
};

export default Dashboard;
