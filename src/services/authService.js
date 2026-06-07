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
  }
};