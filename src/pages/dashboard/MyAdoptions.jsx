import { useState, useEffect } from "react";
import { fetchMyAdoptions, fetchPets } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";
import Badge from "../../components/atoms/Badge";

const MyAdoptions = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  // Load adoptions from API
  useEffect(() => {
    const loadAdoptions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user is authenticated
        if (!isAuthenticated()) {
          setError('Anda harus login untuk melihat adopsi Anda.');
          return;
        }
        
        const [adoptionsResponse, petsResponse] = await Promise.all([
          fetchMyAdoptions(), // Use the new endpoint
          fetchPets()
        ]);

        const adoptionsData = adoptionsResponse.data?.data || []; // Updated to handle new response format
        const petsData = petsResponse.data || [];

        // Transform adoptions data to include pet info
        const transformedAdoptions = adoptionsData.map(adoption => {
          const pet = petsData.find(p => p.id === adoption.pet_id);
          return {
            ...adoption,
            petName: pet ? pet.name : adoption.pet_name || 'Unknown Pet',
            petSpecies: pet ? pet.species : 'Unknown',
            petBreed: pet ? pet.breed || 'Mixed' : 'Unknown',
            petImage: pet ? pet.image_url || "/api/placeholder/300/200" : "/api/placeholder/300/200",
            applicantName: adoption.name, // Updated field mapping
            applicantEmail: adoption.email, // Updated field mapping
            applicationDate: adoption.submission_date || adoption.created_at || new Date().toISOString(),
            notes: adoption.notes || getDefaultNotes(adoption.status)
          };
        });

        setAdoptions(transformedAdoptions);
      } catch (error) {
        console.error('Error loading adoptions:', error);
        if (error.response?.status === 401) {
          setError('Sesi Anda telah berakhir. Silakan login kembali.');
        } else {
          setError('Gagal memuat data adopsi. Silakan coba lagi.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadAdoptions();
  }, [isAuthenticated]); // Add dependency to reload when auth status changes

  const getDefaultNotes = (status) => {
    switch (status) {
      case 'pending':
        return 'Permohonan sedang diproses';
      case 'approved':
        return 'Permohonan disetujui, silakan hubungi kami';
      case 'rejected':
        return 'Permohonan ditolak';
      default:
        return 'Status tidak diketahui';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Menunggu";
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-600">Memuat data adopsi...</p>
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
            Permohonan Adopsi Saya
          </h1>
          <p className="text-gray-600">
            Pantau status permohonan adopsi Anda
          </p>
        </div>

        {/* Adoptions List */}
        {adoptions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada permohonan adopsi
            </h3>
            <p className="text-gray-500 mb-4">
              Anda belum mengajukan permohonan adopsi
            </p>
            <Button variant="primary">
              Jelajahi Hewan
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {adoptions.map(adoption => (
              <Card key={adoption.id} className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Pet Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={adoption.petImage}
                      alt={adoption.petName}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {adoption.petName}
                        </h3>
                        <p className="text-gray-600">
                          {adoption.petBreed} • {adoption.petSpecies}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(adoption.status)}>
                        {getStatusText(adoption.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Tanggal Permohonan:</span>
                          <br />
                          {formatDate(adoption.applicationDate)}
                        </p>
                      </div>
                      
                      {adoption.approvalDate && (
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Tanggal Disetujui:</span>
                            <br />
                            {formatDate(adoption.approvalDate)}
                          </p>
                        </div>
                      )}
                      
                      {adoption.rejectionDate && (
                        <div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Tanggal Ditolak:</span>
                            <br />
                            {formatDate(adoption.rejectionDate)}
                          </p>
                        </div>
                      )}
                    </div>

                    {adoption.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Catatan:</span>
                          <br />
                          {adoption.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      <Button variant="outline" size="small">
                        Lihat Detail
                      </Button>
                      {adoption.status === "pending" && (
                        <Button variant="secondary" size="small">
                          Edit Permohonan
                        </Button>
                      )}
                      {adoption.status === "approved" && (
                        <Button variant="success" size="small">
                          Hubungi Kami
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAdoptions;
