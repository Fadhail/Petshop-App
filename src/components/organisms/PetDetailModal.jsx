import { useState } from "react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Badge from "../atoms/Badge";

const PetDetailModal = ({ pet, isOpen, onClose, onAdopt }) => {
  if (!isOpen || !pet) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "success";
      case "pending":
        return "warning";
      case "adopted":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Tersedia";
      case "pending":
        return "Menunggu";
      case "adopted":
        return "Telah Diadopsi";
      default:
        return status;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{pet.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={pet.image || "/api/placeholder/400/300"}
                alt={pet.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <Badge variant={getStatusColor(pet.status)}>
                  {getStatusText(pet.status)}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Jenis:</span>
                  <span className="ml-2 text-gray-600">{pet.species}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Umur:</span>
                  <span className="ml-2 text-gray-600">{pet.age} tahun</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Jenis Kelamin:</span>
                  <span className="ml-2 text-gray-600">{pet.gender}</span>
                </div>
                {pet.breed && (
                  <div>
                    <span className="font-medium text-gray-700">Ras:</span>
                    <span className="ml-2 text-gray-600">{pet.breed}</span>
                  </div>
                )}
                {pet.color && (
                  <div>
                    <span className="font-medium text-gray-700">Warna:</span>
                    <span className="ml-2 text-gray-600">{pet.color}</span>
                  </div>
                )}
                {pet.weight && (
                  <div>
                    <span className="font-medium text-gray-700">Berat:</span>
                    <span className="ml-2 text-gray-600">{pet.weight} kg</span>
                  </div>
                )}
                {pet.owner && (
                  <div>
                    <span className="font-medium text-gray-700">Pemilik:</span>
                    <span className="ml-2 text-gray-600">{pet.owner.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {pet.description && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">Deskripsi:</h3>
              <p className="text-gray-600 leading-relaxed">{pet.description}</p>
            </div>
          )}
          
          {pet.healthInfo && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">Informasi Kesehatan:</h3>
              <p className="text-gray-600 leading-relaxed">{pet.healthInfo}</p>
            </div>
          )}
          
          {pet.specialNeeds && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">Kebutuhan Khusus:</h3>
              <p className="text-gray-600 leading-relaxed">{pet.specialNeeds}</p>
            </div>
          )}
          
          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Tutup
            </Button>
            {pet.status === "available" && (
              <Button
                variant="primary"
                onClick={() => onAdopt(pet)}
              >
                Adopsi Sekarang
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PetDetailModal;
