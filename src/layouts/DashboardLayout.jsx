import { Outlet } from "react-router-dom";
import DashboardNavigation from "../components/organisms/DashboardNavigation";
import DashboardSubNavbar from "../components/organisms/DashboardSubNavbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      <DashboardSubNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
