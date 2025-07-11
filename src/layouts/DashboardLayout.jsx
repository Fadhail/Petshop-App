import { Outlet } from "react-router-dom";
import DashboardNavigation from "../components/organisms/DashboardNavigation";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
