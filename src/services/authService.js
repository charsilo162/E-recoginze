import axiosClient from '../api/axiosClient';

export const authService = {
  /**
   * Register a new user account
   * @param {Object} data - { name, email, password }
   */
  register: async (data) => {
    try {
      const response = await axiosClient.post('/register', data);
      if (response.data.access_token) {
        localStorage.setItem('auth_token', response.data.access_token);
        
        // Extract role from backend payload if available
        const role = response.data.user?.role || 'user';
        localStorage.setItem('user_role', role);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during registration.' };
    }
  },

  /**
   * Authenticate an existing user
   * @param {Object} data - { email, password }
   */
  login: async (data) => {
    try {
      const response = await axiosClient.post('/login', data);
      if (response.data.access_token) {
        localStorage.setItem('auth_token', response.data.access_token);
        
        // Extract role from backend payload (e.g., response.data.user.role or response.data.role)
        const role = response.data.user?.role || response.data.role || 'user';
        localStorage.setItem('user_role', role);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during login.' };
    }
  },

  /**
   * Remove tokens and clear authentication state
   */
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
  },

  /**
   * Check if the client holds a valid token string
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Retrieve the current active account role configuration
   * @returns {string}
   */
  getRole: () => {
    return localStorage.getItem('user_role') || 'user';
  }
};