import { useEffect, useState } from 'react';
import { 
  fetchPets, 
  fetchPet, 
  createPet, 
  updatePet, 
  deletePet,
  fetchOwners 
} from '../../services/api';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [currentPet, setCurrentPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    age: '',
    owner_id: ''
  });

  // Fetch all pets
  const loadPets = async () => {
    try {
      const response = await fetchPets();
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
      alert('Failed to load pets');
    }
  };

  // Fetch all owners
  const loadOwners = async () => {
    try {
      const response = await fetchOwners();
      setOwners(response.data);
    } catch (error) {
      console.error('Error fetching owners:', error);
      alert('Failed to load owners');
    }
  };

  useEffect(() => {
    loadPets();
    loadOwners();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) : value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      species: '',
      age: '',
      owner_id: ''
    });
    setCurrentPet(null);
  };

  // Open modal for creating a new pet
  const handleCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open modal for editing an existing pet
  const handleEdit = async (id) => {
    try {
      const response = await fetchPet(id);
      const pet = response.data;
      setCurrentPet(pet);
      setFormData({
        name: pet.name,
        species: pet.species,
        age: pet.age,
        owner_id: pet.owner_id
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching pet:', error);
      alert('Failed to load pet data');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentPet && currentPet.id) {
        // Update existing pet
        console.log('Updating pet with ID:', currentPet.id, 'Data:', formData);
        await updatePet(currentPet.id, formData);
      } else {
        // Create new pet
        console.log('Creating new pet with data:', formData);
        await createPet(formData);
      }
      setIsModalOpen(false);
      await loadPets(); // Ensure we wait for the update to complete
    } catch (error) {
      console.error('Error saving pet:', error);
      alert(`Failed to save pet: ${error.message || 'Unknown error'}`);
    }
  };

  // Handle pet deletion
  const handleDelete = async (id) => {
    if (!id) {
      console.error('No ID provided for deletion');
      alert('Error: No pet ID provided');
      return;
    }

    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        console.log('Deleting pet with ID:', id);
        await deletePet(id);
        await loadPets();
      } catch (error) {
        console.error('Error deleting pet:', error);
        alert(`Failed to delete pet: ${error.message || 'Unknown error'}`);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pets Management</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add New Pet
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pets.map((pet) => (
                <tr key={pet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pet.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{pet.species}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{pet.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {owners.find(owner => owner.id === pet.owner_id)?.name || 'Unknown Owner'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(pet.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pet.id)}
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

      {/* Add/Edit Pet Modal */}
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
            {currentPet ? 'Edit Pet' : 'Add New Pet'}
              </h3>
              <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Pet Name
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
              <label htmlFor="species" className="block text-sm font-medium text-gray-700">
                Species
              </label>
              <input
                type="text"
                name="species"
                id="species"
                value={formData.species}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                min="0"
                value={formData.age}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="owner_id" className="block text-sm font-medium text-gray-700">
                Owner
              </label>
              <select
                name="owner_id"
                id="owner_id"
                value={formData.owner_id}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Owner</option>
                {owners.map(owner => (
              <option key={owner.id} value={owner.id}>
                {owner.name}
              </option>
                ))}
              </select>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
              >
                {currentPet ? 'Update' : 'Create'}
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