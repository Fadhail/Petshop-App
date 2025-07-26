import { useEffect, useState } from 'react';
import { 
  fetchPets, 
  fetchPet, 
  createPet, 
  updatePet, 
  deletePet,
  fetchOwners
} from '../../services/api';
import Modal from '../../components/atoms/Modal';
import Button from '../../components/atoms/Button';
import PetForm from '../../components/molecules/PetForm';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [currentPet, setCurrentPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    age: '',
    owner_id: '',
    gender: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      owner_id: '',
      name: '',
      species: '',
      age: '',
      gender: '',
      image: null
    });
    setImagePreview(null);
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
        owner_id: pet.owner_id,
        name: pet.name,
        species: pet.species,
        age: pet.age,
        gender: pet.gender,
        image: null,
      });
      setImagePreview(pet.image_url || null);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching pet:', error);
      alert('Failed to load pet data');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('species', formData.species);
    data.append('age', formData.age);
    data.append('gender', formData.gender);
    data.append('owner_id', formData.owner_id);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (currentPet && currentPet.id) {
        await updatePet(currentPet.id, data);
      } else {
        await createPet(data);
      }
      
      setIsModalOpen(false);
      resetForm();
      await loadPets();
    } catch (error) {
      console.error('Error saving pet:', error);
      if (error.response) {
        // Backend error occurred
      }
      alert(`Failed to save pet: ${error.message || 'Unknown error'}`);
    } finally {
      setIsUploading(false);
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
        await deletePet(id);
        await loadPets();
      } catch (error) {
        alert(`Failed to delete pet: ${error.message || 'Unknown error'}`);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pets Management</h1>
        <Button
          onClick={handleCreate}
          variant="primary"
        >
          Add New Pet
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pets.map((pet) => (
                <tr key={pet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-10 w-10">
                      {pet.image_url ? (
                        <img 
                          className="h-10 w-10 rounded-full object-cover" 
                          src={pet.image_url} 
                          alt={pet.name}
                          onError={(e) => {
                            e.target.src = '/api/placeholder/40/40';
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs text-gray-600">No img</span>
                        </div>
                      )}
                    </div>
                  </td>
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
                    <div className="text-sm text-gray-500">{pet.gender || 'Not specified'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {owners.find(owner => owner.id === pet.owner_id)?.name || 'Unknown Owner'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      onClick={() => handleEdit(pet.id)}
                      variant="outline"
                      size="sm"
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(pet.id)}
                      variant="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Pet Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={currentPet ? 'Edit Pet' : 'Add New Pet'}
        size="medium"
      >
        <PetForm
          formData={formData}
          owners={owners}
          imagePreview={imagePreview}
          isUploading={isUploading}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          isEdit={!!currentPet}
        />
      </Modal>
    </div>
  );
}