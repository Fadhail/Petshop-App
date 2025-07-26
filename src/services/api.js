import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
});

// Auth API (tanpa prefix /api)
const authApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Pets API
export const fetchPets = () => api.get('/pets');
export const fetchPet = (id) => api.get(`/pets/${id}`);
export const createPet = (petData) => api.post('/pets', petData);
export const updatePet = (id, petData) => api.put(`/pets/${id}`, petData);
export const deletePet = (id) => api.delete(`/pets/${id}`);

// Owners API
export const fetchOwners = () => api.get('/owners');
export const fetchOwner = (id) => api.get(`/owners/${id}`);
export const createOwner = (ownerData) => api.post('/owners', ownerData);
export const updateOwner = (id, ownerData) => api.put(`/owners/${id}`, ownerData);
export const deleteOwner = (id) => api.delete(`/owners/${id}`);

// Appointments API
export const fetchAppointments = () => api.get('/appointments');
export const fetchAppointment = (id) => api.get(`/appointments/${id}`);
export const createAppointment = (appointmentData) => api.post('/appointments', appointmentData);
export const updateAppointment = (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

// Services API
export const fetchServices = () => api.get('/services');
export const fetchService = (id) => api.get(`/services/${id}`);
export const createService = (serviceData) => api.post('/services', serviceData);
export const updateService = (id, serviceData) => api.put(`/services/${id}`, serviceData);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Authentication API
export const loginUser = (credentials) => authApi.post('/login', credentials);
export const registerUser = (userData) => authApi.post('/register', userData);

// Adoptions API
export const fetchAdoptions = () => api.get('/adoptions');
export const fetchMyAdoptions = () => api.get('/adoptions/my'); // New endpoint for user's own adoptions
export const fetchAdoption = (id) => api.get(`/adoptions/${id}`);
export const fetchAdoptionsByStatus = (status) => api.get(`/adoptions/status?status=${status}`);
export const fetchAdoptionsByPetId = (petId) => api.get(`/adoptions/pet/${petId}`);
export const createAdoption = (adoptionData) => api.post('/adoptions', adoptionData);
export const updateAdoption = (id, adoptionData) => api.put(`/adoptions/${id}`, adoptionData);
export const deleteAdoption = (id) => api.delete(`/adoptions/${id}`);

// Export the base API instance in case it's needed
export default api;