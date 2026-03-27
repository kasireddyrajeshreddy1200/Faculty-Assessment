import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // { id, role, iat, exp }
  } catch {
    return null;
  }
};
