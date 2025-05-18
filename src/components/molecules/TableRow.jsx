export default function TableRow({ appointment }) {
  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2">{appointment.id}</td>
      <td className="border border-gray-300 px-4 py-2">{appointment.pet?.name || '-'}</td>
      <td className="border border-gray-300 px-4 py-2">{appointment.service?.name || '-'}</td>
      <td className="border border-gray-300 px-4 py-2">{new Date(appointment.date).toLocaleDateString()}</td>
      <td className="border border-gray-300 px-4 py-2">{appointment.note || '-'}</td>
      <td className="border border-gray-300 px-4 py-2">{appointment.status || 'Pending'}</td>
    </tr>
  );
}