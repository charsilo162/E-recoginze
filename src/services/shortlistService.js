import axiosClient from '../api/axiosClient';

export const shortlistService = {
  /**
   * Fetch verified "claimed" records awaiting shortlist approval (with pagination)
   * @param {number} page
   */
  getPendingShortlist: async (page = 1) => {
    try {
      const response = await axiosClient.get(`/admin/nominations/pending-shortlist?page=${page}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to hydrate review queue." };
    }
  },

  /**
   * Handle State Mutation updates directly to live ballot layers
   * @param {string|number} id - Nomination ID
   */
  approveAndPublish: async (id) => {
    try {
      const response = await axiosClient.post(`/nominations/${id}/shortlist`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Transactional confirmation failed." };
    }
  }
};