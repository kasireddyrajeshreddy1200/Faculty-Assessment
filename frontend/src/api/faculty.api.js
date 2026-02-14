import API from './axios';

export const getFacultyProfile = async () => {
  const res = await API.get('/faculty/profile');
  return res.data;
};

export const saveFacultyProfile = async (profileData) => {
  const res = await API.post('/faculty/profile', profileData);
  return res.data;
};

export const getMyFinalEvaluations = async () => {
  const res = await API.get('/faculty/final-evaluations');
  return res.data;
};


