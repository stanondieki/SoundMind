const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_hours: number;
  category_name: string;
  category_type: string;
  features: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  full_name: string;
  created_at: string;
}

export interface Booking {
  id: number;
  customer: Customer;
  service: Service;
  booking_date: string;
  end_date: string;
  status: string;
  status_display: string;
  total_price: string;
  notes: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface BookingCreateData {
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address?: string;
  service_id: number;
  booking_date: string;
  end_date: string;
  total_price: string;
  notes?: string;
  location: string;
}

// Authentication interfaces
export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  company_name: string;
  is_verified: boolean;
  profile: UserProfile;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: number;
  bio: string;
  avatar?: string;
  preferred_contact_method: string;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  company_name?: string;
  password: string;
  password_confirm: string;
}

export interface DashboardStats {
  stats: {
    total_bookings: number;
    pending_bookings: number;
    confirmed_bookings: number;
    completed_bookings: number;
  };
  recent_bookings: Booking[];
  upcoming_bookings: Booking[];
}

// API functions
export const apiService = {
  // Services
  async getServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/services/`);
    if (!response.ok) throw new Error('Failed to fetch services');
    const data = await response.json();
    return data.results || data;
  },

  async getFeaturedServices(): Promise<Service[]> {
    const response = await fetch(`${API_BASE_URL}/services/featured/`);
    if (!response.ok) throw new Error('Failed to fetch featured services');
    return response.json();
  },

  async getService(id: number): Promise<Service> {
    const response = await fetch(`${API_BASE_URL}/services/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch service');
    return response.json();
  },

  // Bookings
  async createBooking(bookingData: BookingCreateData): Promise<Booking> {
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
    };

    const response = await fetch(`${API_BASE_URL}/bookings/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create booking');
    }
    
    return response.json();
  },

  async getBookings(): Promise<Booking[]> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/bookings/`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch bookings');
    const data = await response.json();
    return data.results || data;
  },

  async getMyBookings(): Promise<Booking[]> {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/bookings/my_bookings/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user bookings');
    return response.json();
  },

  async getBooking(id: number): Promise<Booking> {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch booking');
    return response.json();
  },

  async updateBookingStatus(id: number, status: string, notes?: string): Promise<Booking> {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/bookings/${id}/update_status/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, notes }),
    });
    
    if (!response.ok) throw new Error('Failed to update booking status');
    return response.json();
  },
  async getDashboardStats(): Promise<DashboardStats> {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE_URL}/bookings/dashboard_stats/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  },

  // Service Categories
  async getServiceCategories() {
    const response = await fetch(`${API_BASE_URL}/categories/`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data.results || data;
  },

  // Authentication methods
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await response.json();
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    
    return data;
  },

  async register(registerData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    
    return data;
  },

  async logout(): Promise<void> {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('auth_token');
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No authentication token');
    
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('auth_token');
      }
      throw new Error('Failed to fetch user profile');
    }
    
    return response.json();
  },

  async updateUserProfile(userData: Partial<User>): Promise<User> {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No authentication token');
    
    const response = await fetch(`${API_BASE_URL}/auth/profile/update/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }
    
    return response.json();
  },
  async verifyToken(): Promise<{valid: boolean, user?: User}> {
    const token = localStorage.getItem('auth_token');
    if (!token) return { valid: false };
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-token/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      
      if (!response.ok) {
        localStorage.removeItem('auth_token');
        return { valid: false };
      }
      
      return await response.json();
    } catch {
      localStorage.removeItem('auth_token');
      return { valid: false };
    }
  },

  async changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string): Promise<{message: string, token: string}> {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('No authentication token');
    
    const response = await fetch(`${API_BASE_URL}/auth/change-password/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        new_password_confirm: newPasswordConfirm,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to change password');
    }
    
    const data = await response.json();
    // Update token in localStorage
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    
    return data;
  },

  // Helper method to get auth headers
  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Token ${token}` } : {};
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  // Check availability
  async checkAvailability(date: string, serviceId: number): Promise<{is_available: boolean, conflicting_bookings: number}> {
    const response = await fetch(`${API_BASE_URL}/bookings/availability/?date=${date}&service_id=${serviceId}`);
    if (!response.ok) throw new Error('Failed to check availability');
    return response.json();
  }
};

export default apiService;
