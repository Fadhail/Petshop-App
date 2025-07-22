import Card from '../atoms/Card'
import Button from '../atoms/Button'

const ServiceCard = ({ service, onBookService }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {service.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {service.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(service.price)}
          </div>
          <Button
            onClick={() => onBookService(service)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Pesan Layanan
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ServiceCard
