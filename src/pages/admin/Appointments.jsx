import { useEffect, useState } from 'react';
import { 
  fetchAppointments, 
  fetchAppointment, 
  createAppointment, 
  updateAppointment, 
  deleteAppointment,
  fetchPets,
  fetchServices
} from '../../services/api';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    pet_id: '',
    service_id: '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
    status: 'scheduled' // scheduled, completed, cancelled, no_show
  });

  // Fetch all data
  const loadData = async () => {
    try {
      setIsLoading(true);
      const [apptsRes, petsRes, servicesRes] = await Promise.all([
        fetchAppointments(),
        fetchPets(),
        fetchServices()
      ]);
      
      setAppointments(apptsRes.data);
      setPets(petsRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      pet_id: '',
      service_id: '',
      appointment_date: '',
      appointment_time: '',
      notes: '',
      status: 'scheduled'
    });
    setCurrentAppointment(null);
  };

  // Open modal for creating a new appointment
  const handleCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open modal for editing an existing appointment
  const handleEdit = async (id) => {
    try {
      const response = await fetchAppointment(id);
      const appt = response.data;
      setCurrentAppointment(appt);
      
      // Format date and time for the form
      const apptDate = appt.appointment_time ? new Date(appt.appointment_time) : new Date();
      const dateStr = apptDate.toISOString().split('T')[0];
      const timeStr = apptDate.toTimeString().substring(0, 5);
      
      setFormData({
        pet_id: appt.pet_id?.id || '',
        service_id: appt.service_id?.id || '',
        appointment_date: dateStr,
        appointment_time: timeStr,
        notes: appt.notes || '',
        status: appt.status || 'scheduled'
      });
      
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      alert('Failed to load appointment data');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine date and time
      const dateTime = new Date(`${formData.appointment_date}T${formData.appointment_time}`);
      
      const appointmentData = {
        pet_id: formData.pet_id,
        service_id: formData.service_id,
        appointment_time: dateTime.toISOString(),
        notes: formData.notes,
        status: formData.status
      };

      if (currentAppointment && currentAppointment.id) {
        // Update existing appointment
        console.log('Updating appointment with ID:', currentAppointment.id, 'Data:', appointmentData);
        await updateAppointment(currentAppointment.id, appointmentData);
      } else {
        // Create new appointment
        console.log('Creating new appointment with data:', appointmentData);
        await createAppointment(appointmentData);
      }
      
      setIsModalOpen(false);
      await loadData();
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert(`Failed to save appointment: ${error.message || 'Unknown error'}`);
    }
  };

  // Handle appointment deletion
  const handleDelete = async (id) => {
    if (!id) {
      console.error('No ID provided for deletion');
      alert('Error: No appointment ID provided');
      return;
    }

    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        console.log('Deleting appointment with ID:', id);
        await deleteAppointment(id);
        await loadData();
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert(`Failed to delete appointment: ${error.message || 'Unknown error'}`);
      }
    }
  };

  // Format date and time for display
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    // Default to 'scheduled' if status is undefined or null
    const statusValue = status || 'scheduled';
    
    const statusClasses = {
      scheduled: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      no_show: 'bg-gray-100 text-gray-800'
    };

    // Safely replace underscores with spaces
    const displayText = String(statusValue).replace(/_/g, ' ');

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[statusValue] || 'bg-gray-100 text-gray-800'}`}>
        {displayText}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Schedule New Appointment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No appointments found. Schedule one to get started!
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {appt.pet_id?.name || 'Unknown Pet'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appt.pet_id?.owner_id?.name || 'Unknown Owner'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appt.service_id?.name || 'Unknown Service'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appt.service_id?.price ? `Rp${appt.service_id.price.toLocaleString()}` : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDateTime(appt.appointment_time)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(appt.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(appt.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Appointment Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {currentAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label htmlFor="pet_id" className="block text-sm font-medium text-gray-700">
                        Pet
                      </label>
                      <select
                        name="pet_id"
                        id="pet_id"
                        value={formData.pet_id}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="">Select a pet</option>
                        {pets.map((pet) => (
                          <option key={pet.id} value={pet.id}>
                            {pet.name} ({pet.owner_id?.name || 'No Owner'})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="service_id" className="block text-sm font-medium text-gray-700">
                        Service
                      </label>
                      <select
                        name="service_id"
                        id="service_id"
                        value={formData.service_id}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} (Rp{service.price?.toLocaleString() || '0'})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        name="appointment_date"
                        id="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="appointment_time" className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="time"
                        name="appointment_time"
                        id="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no_show">No Show</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Any special instructions or notes..."
                    />
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    >
                      {currentAppointment ? 'Update' : 'Schedule'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        resetForm();
                      }}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

