import { useEffect, useState } from 'react';
import { 
  fetchOwners, 
  fetchOwner, 
  createOwner, 
  updateOwner, 
  deleteOwner 
} from '../../services/api';

export default function Owners() {
  const [owners, setOwners] = useState([]);
  const [currentOwner, setCurrentOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Fetch all owners
  const loadOwners = async () => {
    try {
      const response = await fetchOwners();
      setOwners(response.data);
    } catch (error) {
      alert('Failed to load owners');
    }
  };

  useEffect(() => {
    loadOwners();
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
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    setCurrentOwner(null);
  };

  // Open modal for creating a new owner
  const handleCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open modal for editing an existing owner
  const handleEdit = async (id) => {
    try {
      const response = await fetchOwner(id);
      const owner = response.data;
      setCurrentOwner(owner);
      setFormData({
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
        address: owner.address
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching owner:', error);
      alert('Failed to load owner data');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentOwner && currentOwner.id) {
        // Update existing owner
        await updateOwner(currentOwner.id, formData);
      } else {
        // Create new owner
        await createOwner(formData);
      }
      setIsModalOpen(false);
      await loadOwners();
    } catch (error) {
      console.error('Error saving owner:', error);
      alert(`Failed to save owner: ${error.message || 'Unknown error'}`);
    }
  };

  // Handle owner deletion
  const handleDelete = async (id) => {
    if (!id) {
      console.error('No ID provided for deletion');
      alert('Error: No owner ID provided');
      return;
    }

    if (window.confirm('Are you sure you want to delete this owner?')) {
      try {
        await deleteOwner(id);
        await loadOwners();
      } catch (error) {
        alert(`Failed to delete owner: ${error.message || 'Unknown error'}`);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Owners Management</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add New Owner
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {owners.map((owner) => (
                <tr key={owner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{owner.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{owner.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{owner.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{owner.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(owner.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(owner.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Owner Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {currentOwner ? 'Edit Owner' : 'Add New Owner'}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    >
                      {currentOwner ? 'Update' : 'Create'}
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