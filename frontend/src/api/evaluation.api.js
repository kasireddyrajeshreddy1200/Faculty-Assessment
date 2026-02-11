import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const getPendingContributions = () =>
  API.get('/evaluations/pending');

export const evaluateContribution = (id, data) =>
  API.post(`/evaluations/${id}`, data);

export const createFinalEvaluation = (data) =>
  API.post('/evaluations/final', data);
