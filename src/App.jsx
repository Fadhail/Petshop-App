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
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import UserRoute from "./components/UserRoute"
import PublicRoute from "./components/PublicRoute"
import Adoptions from "./pages/admin/Adoptions"

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      {/* Admin Routes - Only for Admin Role */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<Home />} />
        <Route path="pets" element={<Pets />} />
        <Route path="owners" element={<Owners />} />
        <Route path="services" element={<Services />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/:id" element={<AppointmentDetail />} />
        <Route path="form-pet" element={<FormPet />} />
        <Route path="adoptions" element={<Adoptions />} />
      </Route>

      {/* Dashboard Routes - Only for User Role */}
      <Route path="/dashboard" element={
        <UserRoute>
          <DashboardLayout />
        </UserRoute>
      }>
        <Route index element={<AdoptionDashboard />} />
        <Route path="my-adoptions" element={<MyAdoptions />} />
        <Route path="adoption-tips" element={<AdoptionTips />} />
      </Route>
    </Routes>
  )
}

export default App