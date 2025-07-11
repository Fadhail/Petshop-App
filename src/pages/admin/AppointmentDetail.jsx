import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AppointmentDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/appointments/${id}`)
      .then(res => setDetail(res.data))
      .catch(err => console.error('Failed to load detail:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!detail) return <p>Data tidak ditemukan</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Detail Appointment</h1>
      <div className="space-y-2">
        <p><strong>Pet:</strong> {detail.pet?.name}</p>
        <p><strong>Service:</strong> {detail.service?.name}</p>
        <p><strong>Date:</strong> {detail.appointment.date}</p>
        <p><strong>Note:</strong> {detail.appointment.note}</p>
      </div>
    </div>
  );
}