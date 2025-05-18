import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Pets from "./pages/Pets"
import Owners from "./pages/Owners"
import Services from "./pages/Services"
import Appointments from "./pages/Appointments"
import AppointmentDetail from "./pages/AppointmentDetail"
import FormPet from "./pages/FormPet"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
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