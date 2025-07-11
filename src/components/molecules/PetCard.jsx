import Card from "../atoms/Card";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

const PetCard = ({ pet, onAdopt, onViewDetails }) => {
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
    <Card className="overflow-hidden cursor-pointer">
      <div className="aspect-w-16 aspect-h-12">
        <img
          src={pet.image_url || "/api/placeholder/300/200"}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
          <Badge variant={getStatusColor(pet.status)}>
            {getStatusText(pet.status)}
          </Badge>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p><span className="font-medium">Jenis:</span> {pet.species}</p>
          <p><span className="font-medium">Umur:</span> {pet.age} tahun</p>
          <p><span className="font-medium">Jenis Kelamin:</span> {pet.gender}</p>
          {pet.breed && <p><span className="font-medium">Ras:</span> {pet.breed}</p>}
          {pet.owner && <p><span className="font-medium">Pemilik:</span> {pet.owner.name}</p>}
        </div>
        
        {pet.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {pet.description}
          </p>
        )}
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="small"
            onClick={() => onViewDetails(pet)}
            className="flex-1"
          >
            Detail
          </Button>
          {pet.status === "available" && (
            <Button
              variant="primary"
              size="small"
              onClick={() => onAdopt(pet)}
              className="flex-1"
            >
              Adopsi
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PetCard;
