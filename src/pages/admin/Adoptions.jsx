import { useState, useEffect } from "react";
import { 
  fetchAdoptions, 
  fetchAdoptionsByStatus, 
  updateAdoption,
  deleteAdoption 
} from "../../services/api";
import Card from "../../components/atoms/Card";
import Button from "../../components/atoms/Button";
import Badge from "../../components/atoms/Badge";

const Adoptions = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // Load adoptions data
  useEffect(() => {
    loadAdoptions();
  }, []);

  // Filter adoptions when status filter changes
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredAdoptions(adoptions);
    } else {
      setFilteredAdoptions(adoptions.filter(adoption => adoption.status === statusFilter));
    }
  }, [adoptions, statusFilter]);

  const loadAdoptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchAdoptions();
      const adoptionsData = response.data || [];
      setAdoptions(adoptionsData);
    } catch (error) {
      console.error('Error loading adoptions:', error);
      setError('Gagal memuat data adopsi');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (adoptionId, newStatus) => {
    try {
      await updateAdoption(adoptionId, { status: newStatus });
      
      // Update local state
      setAdoptions(prevAdoptions =>
        prevAdoptions.map(adoption =>
          adoption.id === adoptionId
            ? { ...adoption, status: newStatus }
            : adoption
        )
      );

      if (selectedAdoption && selectedAdoption.id === adoptionId) {
        setSelectedAdoption({ ...selectedAdoption, status: newStatus });
      }

      alert(`Status adopsi berhasil diubah menjadi ${newStatus}`);
    } catch (error) {
      console.error('Error updating adoption status:', error);
      alert('Gagal mengubah status adopsi');
    }
  };

  const handleDelete = async (adoptionId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data adopsi ini?')) {
      try {
        await deleteAdoption(adoptionId);
        setAdoptions(prevAdoptions =>
          prevAdoptions.filter(adoption => adoption.id !== adoptionId)
        );
        if (selectedAdoption && selectedAdoption.id === adoptionId) {
          setShowDetail(false);
          setSelectedAdoption(null);
        }
        alert('Data adopsi berhasil dihapus');
      } catch (error) {
        console.error('Error deleting adoption:', error);
        alert('Gagal menghapus data adopsi');
      }
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Menunggu';
      case 'approved': return 'Disetujui';
      case 'rejected': return 'Ditolak';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-2xl mb-4">🐾</div>
          <p>Memuat data adopsi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadAdoptions}>Coba Lagi</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Adopsi</h1>
        <p className="text-gray-600">Kelola permohonan adopsi hewan peliharaan</p>
      </div>

      {/* Filter */}
      <Card className="p-4 mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {adoptions.length}
            </div>
            <div className="text-sm text-gray-600">Total Adopsi</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {adoptions.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Menunggu</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {adoptions.filter(a => a.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Disetujui</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {adoptions.filter(a => a.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600">Ditolak</div>
          </div>
        </Card>
      </div>

      {/* Adoptions List */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Daftar Adopsi ({filteredAdoptions.length})
          </h2>
          
          {filteredAdoptions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🐕</div>
              <p className="text-gray-500">Tidak ada data adopsi</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Nama Pengadopsi</th>
                    <th className="text-left py-3 px-4">Hewan</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Telepon</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Tanggal</th>
                    <th className="text-left py-3 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdoptions.map((adoption) => (
                    <tr key={adoption.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{adoption.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{adoption.pet_name}</div>
                      </td>
                      <td className="py-3 px-4">{adoption.email}</td>
                      <td className="py-3 px-4">{adoption.phone}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusBadgeVariant(adoption.status)}>
                          {getStatusText(adoption.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(adoption.submission_date || adoption.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedAdoption(adoption);
                              setShowDetail(true);
                            }}
                          >
                            Detail
                          </Button>
                          {adoption.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => handleStatusUpdate(adoption.id, 'approved')}
                              >
                                Setujui
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleStatusUpdate(adoption.id, 'rejected')}
                              >
                                Tolak
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(adoption.id)}
                          >
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>

      {/* Detail Modal */}
      {showDetail && selectedAdoption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Detail Adopsi</h2>
                  <p className="text-gray-600">ID: {selectedAdoption.id}</p>
                </div>
                <button
                  onClick={() => setShowDetail(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Pengadopsi
                    </label>
                    <p className="text-gray-900">{selectedAdoption.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Hewan
                    </label>
                    <p className="text-gray-900">{selectedAdoption.pet_name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedAdoption.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nomor Telepon
                    </label>
                    <p className="text-gray-900">{selectedAdoption.phone}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat
                  </label>
                  <p className="text-gray-900">{selectedAdoption.address}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kondisi Tempat Tinggal
                  </label>
                  <p className="text-gray-900">{selectedAdoption.living_space}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alasan Adopsi
                  </label>
                  <p className="text-gray-900">{selectedAdoption.reason}</p>
                </div>

                {selectedAdoption.experience && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pengalaman Memelihara Hewan
                    </label>
                    <p className="text-gray-900">{selectedAdoption.experience}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Memiliki Hewan Peliharaan Lain
                  </label>
                  <p className="text-gray-900">
                    {selectedAdoption.has_other_pets ? 'Ya' : 'Tidak'}
                  </p>
                </div>

                {selectedAdoption.has_other_pets && selectedAdoption.other_pets_details && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detail Hewan Peliharaan Lain
                    </label>
                    <p className="text-gray-900">{selectedAdoption.other_pets_details}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <Badge variant={getStatusBadgeVariant(selectedAdoption.status)}>
                      {getStatusText(selectedAdoption.status)}
                    </Badge>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Permohonan
                    </label>
                    <p className="text-gray-900">
                      {formatDate(selectedAdoption.submission_date || selectedAdoption.created_at)}
                    </p>
                  </div>
                </div>

                {selectedAdoption.adoption_date && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Adopsi
                    </label>
                    <p className="text-gray-900">
                      {formatDate(selectedAdoption.adoption_date)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowDetail(false)}
                >
                  Tutup
                </Button>
                {selectedAdoption.status === 'pending' && (
                  <>
                    <Button
                      variant="success"
                      onClick={() => {
                        handleStatusUpdate(selectedAdoption.id, 'approved');
                        setShowDetail(false);
                      }}
                    >
                      Setujui
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleStatusUpdate(selectedAdoption.id, 'rejected');
                        setShowDetail(false);
                      }}
                    >
                      Tolak
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Adoptions;
