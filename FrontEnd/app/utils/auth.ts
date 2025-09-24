import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number; 
  [key: string]: any;
}
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};


export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: JwtPayload = jwtDecode(token);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      removeToken();
      return false;
    }
    return true;
  } catch (err) {
    console.error("Invalid token:", err);
    removeToken();
    return false;
  }
};

export const getUserData = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('https://echo-backend-w51u.onrender.com/api/auth/whoami', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}; 