import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
// This allows you to import it anywhere using: import { useNominationStore } from '...'
export const useNominationStore = create((set) => ({
  isOpen: false,
  isSubmitting: false,
  categories: [],
  error: null,
  success: false,

  openModal: () => set({ isOpen: true, error: null, success: false }),
  closeModal: () => set({ isOpen: false }),

  fetchCategories: async () => {
    try {
      const response = await axiosClient.get('/categories');
      set({ categories: response.data.data });
    } catch (err) {
      console.error('Failed fetching dynamic seeder options:', err);
    }
  },

  submitNomination: async (formData) => {
    set({ isSubmitting: true, error: null, success: false });
    try {
      const response = await axiosClient.post('/nominations', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      set({ isSubmitting: false, success: true });
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to submit nomination.';
      set({ isSubmitting: false, error: errorMsg });
      throw err;
    }
  },
}));