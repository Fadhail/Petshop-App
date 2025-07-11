import Input from "../atoms/Input";
import Button from "../atoms/Button";

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedSpecies, 
  onSpeciesChange,
  selectedStatus,
  onStatusChange,
  onClearFilters
}) => {
  const speciesOptions = [
    { value: "", label: "Semua Jenis" },
    { value: "anjing", label: "Anjing" },
    { value: "kucing", label: "Kucing" },
    { value: "burung", label: "Burung" },
    { value: "kelinci", label: "Kelinci" },
    { value: "hamster", label: "Hamster" },
    { value: "ikan", label: "Ikan" }
  ];

  const statusOptions = [
    { value: "", label: "Semua Status" },
    { value: "available", label: "Tersedia" },
    { value: "pending", label: "Menunggu" },
    { value: "adopted", label: "Telah Diadopsi" }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <Input
            label="Cari Hewan"
            type="text"
            placeholder="Masukkan nama hewan..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jenis Hewan
          </label>
          <select
            value={selectedSpecies}
            onChange={(e) => onSpeciesChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {speciesOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full"
          >
            Reset Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
