import axiosClient from '../api/axiosClient';

export const ballotService = {
  /**
   * Fetch active categories and their shortlisted nominees
   */
  getActiveBallot: async () => {
    try {
      const response = await axiosClient.get('/ballot/active');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to hydrate ballot landscape.' };
    }
  },

  /**
   * Fetch detailed profile information for a specific honoree
   * @param {string|number} id - The nomination/honoree ID
   */
  getHonoreeProfile: async (id) => {
    try {
      const response = await axiosClient.get(`/honoree/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch honoree details.' };
    }
  },

  /**
   * Cast a secure vote for a specific nominee
   * @param {string|number} nominationId
   */
  castVote: async (nominationId) => {
    try {
      const response = await axiosClient.post('/votes/cast', { nomination_id: nominationId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Transactional communication issue.' };
    }
  },

  /**
   * Fetch pending shortlist workspace records
   */
  getPendingShortlistQueue: async (page = 1) => {
    try {
      const response = await axiosClient.get(`/admin/nominations/pending-shortlist?page=${page}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch pending shortlist queue.' };
    }
  },

  /**
   * Fetches paginated entries containing both 'claimed' and 'shortlisted' contenders
   * @param {number} page 
   */
  getPublicRegistryQueue: async (page = 1) => {
    try {
      const response = await axiosClient.get(`/public-registry?page=${page}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to populate public entries.' };
    }
  },

  /**
   * 🚀 DRY Gateway: Track interaction updates dynamically (views, shares, likes)
   * Maps straight to your new Laravel controller logic routing setup
   * @param {string|number} id - Nomination ID
   * @param {'view'|'share'|'toggle-like'} action - Type of metric interaction
   */
  trackInteraction: async (id, action) => {
    try {
      const response = await axiosClient.post(`/nominations/${id}/interact/${action}`);
      return response.data;
    } catch (error) {
      console.error(`Failed pushing engagement action [${action}]:`, error.message);
      throw error.response?.data || { message: `Failed running interaction engine for ${action}.` };
    }
  }
};