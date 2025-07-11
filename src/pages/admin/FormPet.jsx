import { useState } from 'react';
import api from '../../services/api';

export default function FormPet() {
  const [form, setForm] = useState({ name: '', species: '', age: 0 });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/pets', form)
      .then(() => alert('Pet added!'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
      <input type="text" name="species" value={form.species} onChange={handleChange} placeholder="Species" className="border p-2 w-full" />
      <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Pet</button>
    </form>
  );
}