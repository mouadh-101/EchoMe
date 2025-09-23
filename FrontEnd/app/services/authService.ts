import { setToken, getToken } from '../utils/auth';
import { BackendResponse } from '../utils/backEndRespons';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}



interface UserData {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: UserData;
}

class AuthService {
  private baseUrl = 'https://echo-backend-w51u.onrender.com/api/auth';

  async login(email: string, password: string): Promise<BackendResponse<AuthResponse>> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data: BackendResponse<AuthResponse> = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message || 'Login failed');
      }

      setToken(data.data.token);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  }

  async register(formData: AuthFormData): Promise<BackendResponse<AuthResponse>> {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data: BackendResponse<AuthResponse> = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message || 'Registration failed');
      }

      setToken(data.data.token);
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  }
  async whoami(): Promise<BackendResponse<UserData>> {
    try {
      const response = await fetch(`${this.baseUrl}/whoami`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const data: BackendResponse<UserData> = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Whoami failed');
    }
  }

  async updateProfile(email?: string, name?: string): Promise<BackendResponse<UserData>> {
    try {
      const response = await fetch(`${this.baseUrl}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ email, name })
      });

      const data: BackendResponse<UserData> = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message || 'Profile update failed');
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Profile update failed');
    }
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<BackendResponse<UserData>> {
    try {
      const response = await fetch(`${this.baseUrl}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data: BackendResponse<UserData> = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message || 'Password update failed');
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Password update failed');
    }
  }
  async handleLogout() {
  await fetch(`${this.baseUrl}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  localStorage.removeItem("token")
  window.location.href = "/auth"
}
}

export const authService = new AuthService();
export type { UserData };
export type { BackendResponse, AuthFormData, AuthResponse };