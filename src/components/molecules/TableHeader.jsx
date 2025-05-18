export default function TableHeader() {
  return (
    <thead className="bg-gray-200">
      <tr>
        <th className="border border-gray-300 px-4 py-2">ID</th>
        <th className="border border-gray-300 px-4 py-2">Pet Name</th>
        <th className="border border-gray-300 px-4 py-2">Service</th>
        <th className="border border-gray-300 px-4 py-2">Date</th>
        <th className="border border-gray-300 px-4 py-2">Note</th>
        <th className="border border-gray-300 px-4 py-2">Status</th>
      </tr>
    </thead>
  );
}