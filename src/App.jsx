import { Routes, Route } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import Home from "./pages/admin/Home"
import Pets from "./pages/admin/Pets"
import Owners from "./pages/admin/Owners"
import Services from "./pages/admin/Services"
import Appointments from "./pages/admin/Appointments"
import AppointmentDetail from "./pages/admin/AppointmentDetail"
import FormPet from "./pages/admin/FormPet"
import AdoptionDashboard from "./pages/dashboard/AdoptionDashboard"
import MyAdoptions from "./pages/dashboard/MyAdoptions"
import AdoptionTips from "./pages/dashboard/AdoptionTips"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Home />} />
        <Route path="pets" element={<Pets />} />
        <Route path="owners" element={<Owners />} />
        <Route path="services" element={<Services />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/:id" element={<AppointmentDetail />} />
        <Route path="form-pet" element={<FormPet />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<AdoptionDashboard />} />
        <Route path="my-adoptions" element={<MyAdoptions />} />
        <Route path="tips" element={<AdoptionTips />} />
      </Route>

      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App