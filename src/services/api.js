import axios from 'axios';
import { io } from 'socket.io-client';

const API_BASE = '/api/v1/admin';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auto-attach JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('lumedrive_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized responses automatically
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('lumedrive_admin_token');
      localStorage.removeItem('lumedrive_admin_user');
      window.dispatchEvent(new Event('lumedrive_admin_unauthorized'));
    }
    return Promise.reject(error);
  }
);

export const socket = io('/', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
});

export const AdminAPI = {
  // 0. Auth
  login: (email, password) => axios.post('/api/v1/admin/login', { email, password }),
  register: (data) => axios.post('/api/v1/admin/register', data),
  getMe: () => apiClient.get('/me'),

  // 1. Stats
  getStats: () => apiClient.get('/stats'),

  // 2. Rides
  getRides: (params) => apiClient.get('/rides', { params }),
  assignRide: (rideId, chauffeurId) => apiClient.post(`/rides/${rideId}/assign`, { chauffeurId }),
  updateRideStatus: (rideId, status) => apiClient.put(`/rides/${rideId}/status`, { status }),

  // 3. Chauffeurs
  getChauffeurs: () => apiClient.get('/chauffeurs'),
  createChauffeur: (data) => apiClient.post('/chauffeurs', data),
  updateChauffeur: (id, data) => apiClient.put(`/chauffeurs/${id}`, data),

  // 4. Customers
  getUsers: () => apiClient.get('/users'),

  // 5. Vehicles
  getVehicles: () => apiClient.get('/vehicles'),
  createVehicle: (data) => apiClient.post('/vehicles', data),
  updateVehicle: (id, data) => apiClient.put(`/vehicles/${id}`, data),

  // 6. Fleet Classes
  getFleetClasses: () => apiClient.get('/fleet'),
  updateFleetClass: (id, data) => apiClient.put(`/fleet/${id}`, data),

  // 7. Cities
  getCities: () => apiClient.get('/cities'),
  createCity: (data) => apiClient.post('/cities', data),
  updateCity: (id, data) => apiClient.put(`/cities/${id}`, data),

  // 8. Hotels
  getHotels: () => apiClient.get('/hotels'),
  createHotel: (data) => apiClient.post('/hotels', data),
  updateHotel: (id, data) => apiClient.put(`/hotels/${id}`, data),

  // 9. Corporates
  getCorporates: () => apiClient.get('/corporates'),
  createCorporate: (data) => apiClient.post('/corporates', data),
  updateCorporate: (id, data) => apiClient.put(`/corporates/${id}`, data),

  // 10. Partners
  getPartners: () => apiClient.get('/partners'),
  createPartner: (data) => apiClient.post('/partners', data),
  updatePartner: (id, data) => apiClient.put(`/partners/${id}`, data),

  // 11. Invoices
  getInvoices: () => apiClient.get('/invoices'),

  // 12. Reports
  getReports: () => apiClient.get('/reports'),

  // 13. Support
  getSupportTickets: () => apiClient.get('/support'),
  updateSupportTicket: (id, data) => apiClient.put(`/support/${id}`, data),
};
