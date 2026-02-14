import API from './axios';

export const getEvaluatorProfile = async () => {
  const res = await API.get('/evaluator/profile');
  return res.data;
};

export const saveEvaluatorProfile = async (profileData) => {
  const res = await API.post('/evaluator/profile', profileData);
  return res.data;
};
