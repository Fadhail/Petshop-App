import { useState, useEffect } from "react";
import { fetchPets, fetchOwners, createAdoption, updatePet } from "../../services/api";
import DashboardStats from "../../components/organisms/DashboardStats";
import PetGrid from "../../components/organisms/PetGrid";
import PetDetailModal from "../../components/organisms/PetDetailModal";
import AdoptionForm from "../../components/organisms/AdoptionForm";

const AdoptionDashboard = () => {
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedPet, setSelectedPet] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load pets and owners from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch pets and owners data
        const [petsResponse, ownersResponse] = await Promise.all([
          fetchPets(),
          fetchOwners()
        ]);

        const petsData = petsResponse.data || [];
        const ownersData = ownersResponse.data || [];

        // Transform pets data to include adoption status
        const transformedPets = petsData.map(pet => ({
          ...pet,
          // Map species to Indonesian
          species: pet.species === 'dog' ? 'anjing' : 
                   pet.species === 'cat' ? 'kucing' : 
                   pet.species === 'bird' ? 'burung' :
                   pet.species === 'rabbit' ? 'kelinci' :
                   pet.species === 'hamster' ? 'hamster' :
                   pet.species === 'fish' ? 'ikan' : pet.species,
          // Add default status if not present
          status: pet.status || 'available',
          // Add gender in Indonesian
          gender: pet.gender || 'Tidak diketahui',
          // Add default image if not present
          image: pet.image || "/api/placeholder/300/200",
          // Add owner info
          owner: ownersData.find(owner => owner.id === pet.owner_id),
          // Add description if not present
          description: pet.description || `${pet.name} adalah hewan yang membutuhkan rumah penuh kasih sayang.`,
          // Add health info if not present
          healthInfo: pet.healthInfo || "Kondisi kesehatan baik, siap untuk diadopsi"
        }));

        // Calculate stats
        const statsData = {
          totalPets: transformedPets.length,
          availablePets: transformedPets.filter(pet => pet.status === "available").length,
          pendingPets: transformedPets.filter(pet => pet.status === "pending").length,
          adoptedPets: transformedPets.filter(pet => pet.status === "adopted").length
        };

        setPets(transformedPets);
        setOwners(ownersData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Gagal memuat data hewan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleViewDetails = (pet) => {
    setSelectedPet(pet);
    setShowDetailModal(true);
  };

  const handleAdopt = (pet) => {
    setSelectedPet(pet);
    setShowDetailModal(false);
    setShowAdoptionForm(true);
  };

  const handleAdoptionSubmit = async (formData) => {
    try {
      // Create adoption request with the correct field names matching backend model
      const adoptionData = {
        pet_id: formData.petId,
        pet_name: formData.petName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        experience: formData.experience || "",
        reason: formData.reason,
        living_space: formData.livingSpace,
        has_other_pets: formData.hasOtherPets,
        other_pets_details: formData.otherPetsDetails || ""
      };

      const response = await createAdoption(adoptionData);
      
      // Update pet status to pending (optional - depends on business logic)
      // await updatePet(formData.petId, { status: 'pending' });
      
      // Update local state
      setPets(prevPets =>
        prevPets.map(pet =>
          pet.id === formData.petId
            ? { ...pet, status: "pending" }
            : pet
        )
      );

      // Update stats
      setStats(prevStats => ({
        ...prevStats,
        availablePets: prevStats.availablePets - 1,
        pendingPets: prevStats.pendingPets + 1
      }));

      setShowAdoptionForm(false);
      setSelectedPet(null);
      
      // Show success message
      alert("Permohonan adopsi berhasil dikirim! Kami akan menghubungi Anda segera.");
    } catch (error) {
      console.error('Error submitting adoption:', error);
      let errorMessage = "Terjadi kesalahan saat mengirim permohonan adopsi.";
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setShowAdoptionForm(false);
    setSelectedPet(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐾</div>
          <p className="text-gray-600">Memuat data hewan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Adopsi Hewan
          </h1>
          <p className="text-gray-600">
            Temukan teman berbulu baru untuk keluarga Anda
          </p>
        </div>

        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Pet Grid */}
        <PetGrid
          pets={pets}
          onAdopt={handleAdopt}
          onViewDetails={handleViewDetails}
        />

        {/* Modals */}
        <PetDetailModal
          pet={selectedPet}
          isOpen={showDetailModal}
          onClose={handleCloseModal}
          onAdopt={handleAdopt}
        />

        <AdoptionForm
          pet={selectedPet}
          isOpen={showAdoptionForm}
          onClose={handleCloseModal}
          onSubmit={handleAdoptionSubmit}
        />
      </div>
    </div>
  );
};

export default AdoptionDashboard;
