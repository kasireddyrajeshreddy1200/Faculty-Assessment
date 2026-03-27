import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
};
