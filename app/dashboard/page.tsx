import React from "react";
import ProtectedPage from "../protected-page/protected-page";

const Dashboard = () => {
  return (
    <ProtectedPage>
      <div>Loged</div>
    </ProtectedPage>
  );
};

export default Dashboard;
