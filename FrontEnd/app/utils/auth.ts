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
  return !!getToken();
};

export const getUserData = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('http://localhost:3000/api/auth/whoami', {
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