import { useState, useEffect } from 'react'
import { fetchServices } from '../../services/api'
import ServiceCard from '../../components/molecules/ServiceCard'
import SearchFilter from '../../components/molecules/SearchFilter'
import Button from '../../components/atoms/Button'

const Services = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    filterServices()
  }, [services, searchTerm, priceRange])

  const loadServices = async () => {
    try {
      setLoading(true)
      const response = await fetchServices()
      setServices(response.data)
      setFilteredServices(response.data)
    } catch (error) {
      console.error('Error loading services:', error)
      setError('Gagal memuat data layanan')
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'low':
          filtered = filtered.filter(service => service.price < 100000)
          break
        case 'medium':
          filtered = filtered.filter(service => service.price >= 100000 && service.price < 500000)
          break
        case 'high':
          filtered = filtered.filter(service => service.price >= 500000)
          break
      }
    }

    setFilteredServices(filtered)
  }

  const handleBookService = (service) => {
    setSelectedService(service)
    setShowBookingModal(true)
  }

  const handleBookingSubmit = () => {
    // TODO: Implement appointment booking functionality
    // This would typically create an appointment with the selected service
    alert(`Layanan ${selectedService.name} berhasil dipesan! Silakan tunggu konfirmasi dari admin.`)
    setShowBookingModal(false)
    setSelectedService(null)
  }

  const priceRangeOptions = [
    { value: 'all', label: 'Semua Harga' },
    { value: 'low', label: 'Di bawah Rp 100.000' },
    { value: 'medium', label: 'Rp 100.000 - Rp 500.000' },
    { value: 'high', label: 'Di atas Rp 500.000' }
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <Button onClick={loadServices} className="bg-blue-600 text-white">
          Coba Lagi
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col mx-auto md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari layanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-64">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priceRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Tidak ada layanan yang ditemukan</div>
          {(searchTerm || priceRange !== 'all') && (
            <Button 
              onClick={() => {
                setSearchTerm('')
                setPriceRange('all')
              }}
              className="mt-4 bg-blue-600 text-white"
            >
              Reset Filter
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookService={handleBookService}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Konfirmasi Pemesanan</h3>
            <div className="mb-4">
              <p className="text-gray-600">Anda akan memesan layanan:</p>
              <p className="font-semibold text-lg">{selectedService.name}</p>
              <p className="text-gray-600">{selectedService.description}</p>
              <p className="text-blue-600 font-bold text-xl mt-2">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(selectedService.price)}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowBookingModal(false)
                  setSelectedService(null)
                }}
                className="flex-1 bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Batal
              </Button>
              <Button
                onClick={handleBookingSubmit}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
              >
                Pesan Sekarang
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Informasi Pemesanan</h2>
        <div className="space-y-2 text-blue-700">
          <p>• Pemesanan layanan akan dikonfirmasi oleh admin dalam 1x24 jam</p>
          <p>• Pastikan hewan peliharaan Anda dalam kondisi sehat sebelum menggunakan layanan</p>
          <p>• Hubungi customer service untuk informasi lebih lanjut</p>
          <p>• Pembayaran dapat dilakukan secara tunai atau transfer</p>
        </div>
      </div>
    </div>
  )
}

export default Services
