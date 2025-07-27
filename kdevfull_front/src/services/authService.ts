import type { 
  AuthResponse, 
  LoginCredentials,
  RegisterCredentials
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class AuthService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await this.handleResponse<AuthResponse>(response);
    
    // Store token in localStorage
    localStorage.setItem('token', data.token);
    
    return data;
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(credentials)
    });
    
    await this.handleResponse<void>(response);
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getUserFromToken(): { sub: string; role: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { sub: payload.sub, role: payload.role };
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
