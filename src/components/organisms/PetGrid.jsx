import { useState } from "react";
import PetCard from "../molecules/PetCard";
import SearchFilter from "../molecules/SearchFilter";

const PetGrid = ({ pets, onAdopt, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Filter pets based on search and filter criteria
  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecies = selectedSpecies === "" || pet.species === selectedSpecies;
    const matchesStatus = selectedStatus === "" || pet.status === selectedStatus;
    
    return matchesSearch && matchesSpecies && matchesStatus;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSpecies("");
    setSelectedStatus("");
  };

  return (
    <div>
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSpecies={selectedSpecies}
        onSpeciesChange={setSelectedSpecies}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onClearFilters={handleClearFilters}
      />
      
      {filteredPets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🐾</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada hewan yang ditemukan
          </h3>
          <p className="text-gray-500">
            Coba ubah kriteria pencarian atau filter Anda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map(pet => (
            <PetCard
              key={pet.id}
              pet={pet}
              onAdopt={onAdopt}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetGrid;
