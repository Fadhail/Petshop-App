import { useState } from 'react';
import api from '../../services/api';

export default function FormPet() {
  const [form, setForm] = useState({ name: '', species: '', age: 0, image: null , status: 'available' });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('species', form.species);
    formData.append('age', form.age);
    formData.append('image', form.image);
    formData.append('status', form.status); // Include status in the form data

    api.post('/pets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => alert('Pet added!'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
      <input type="text" name="species" value={form.species} onChange={handleChange} placeholder="Species" className="border p-2 w-full" />
      <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border p-2 w-full" />
      <input type="file" name="image" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Pet</button>
    </form>
  );
}