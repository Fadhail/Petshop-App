import Input from '../atoms/Input';
import Select from '../atoms/Select';
import ImageUpload from '../atoms/ImageUpload';
import Button from '../atoms/Button';

const PetForm = ({
  formData,
  owners,
  imagePreview,
  isUploading,
  onInputChange,
  onFileChange,
  onSubmit,
  onCancel,
  isEdit = false
}) => {
  // Prepare gender options
  const genderOptions = [
    { value: 'Jantan', label: 'Jantan' },
    { value: 'Betina', label: 'Betina' }
  ];

  // Prepare owner options
  const ownerOptions = owners.map(owner => ({
    value: owner.id,
    label: owner.name
  }));

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Pet Name"
        name="name"
        id="name"
        value={formData.name}
        onChange={onInputChange}
        required
      />

      <Input
        label="Species"
        name="species"
        id="species"
        value={formData.species}
        onChange={onInputChange}
        required
      />

      <Input
        label="Age"
        name="age"
        id="age"
        type="number"
        min="0"
        value={formData.age}
        onChange={onInputChange}
        required
      />

      <Select
        label="Gender"
        name="gender"
        id="gender"
        value={formData.gender}
        onChange={onInputChange}
        options={genderOptions}
        placeholder="Select Gender"
        required
      />

      <ImageUpload
        label="Pet Image"
        name="image"
        id="image"
        onChange={onFileChange}
        preview={imagePreview}
      />

      <Select
        label="Owner"
        name="owner_id"
        id="owner_id"
        value={formData.owner_id}
        onChange={onInputChange}
        options={ownerOptions}
        placeholder="Select Owner"
        required
      />

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <Button
          type="submit"
          disabled={isUploading}
          variant="primary"
          className="w-full sm:col-start-2"
        >
          {isUploading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
        </Button>
        
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="w-full mt-3 sm:mt-0 sm:col-start-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PetForm;
