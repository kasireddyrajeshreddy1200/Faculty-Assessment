import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Create contribution
export const createContribution = (data) =>
  API.post('/contributions', data);

// Get my contributions
export const getMyContributions = () =>
  API.get('/contributions');

// Update contribution
export const updateContribution = (id, data) =>
  API.put(`/contributions/${id}`, data);

// Delete contribution
export const deleteContribution = (id) =>
  API.delete(`/contributions/${id}`);
