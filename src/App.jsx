import { Routes, Route } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import Home from "./pages/admin/Home"
import Pets from "./pages/admin/Pets"
import Owners from "./pages/admin/Owners"
import Services from "./pages/admin/Services"
import Appointments from "./pages/admin/Appointments"
import AppointmentDetail from "./pages/admin/AppointmentDetail"
import FormPet from "./pages/admin/FormPet"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/:id" element={<AppointmentDetail />} />
        <Route path="/form-pet" element={<FormPet />} />
      </Route>
    </Routes>
  )
}

export default App