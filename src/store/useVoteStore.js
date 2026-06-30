import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

export const useVoteStore = create((set, get) => ({
  categories: [], 
  votes: {},      
  loading: false,
  message: '',
  resultsHidden: false,   // 🔊 Tracks if public views should hide elements
  isToggling: false,
  leaderboardData: [],
  leaderboardMeta: {},     
  categoriesList: [],      
  loadingLeaderboard: false,
  leaderboardMessage: '', 

  fetchBallot: async () => {
    set({ loading: true });
    try {
      const response = await axiosClient.get('/voting-ballot');
      set({ categories: response.data.data });
    } catch (err) {
      console.error("Error pulling ballot papers:", err);
    } finally {
      set({ loading: false });
    }
  },
  
  castVote: (categoryId, candidateId) => set((state) => ({
    votes: { ...state.votes, [categoryId]: candidateId }
  })),

  submitVotes: async () => {
    const currentVotes = get().votes;
    if (Object.keys(currentVotes).length === 0) return;

    try {
      const response = await axiosClient.post('/votes', { votes: currentVotes });
      set({ message: response.data.message, votes: {} }); 
      alert("🎉 Success: Your choices have been synced securely!");
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred locking down your selections.");
    }
  },

  fetchFilterCategories: async () => {
    try {
      const response = await axiosClient.get('/voting-ballot'); 
      set({ categoriesList: response.data.data });
    } catch (err) {
      console.error("Error fetching categories dropdown list:", err);
    }
  },

fetchLeaderboard: async (filters = {}) => {
    set({ loadingLeaderboard: true });
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category_id) params.append('category_id', filters.category_id);
      if (filters.page) params.append('page', filters.page);

      const response = await axiosClient.get(`/leaderboard?${params.toString()}`);
      
      set({ 
        leaderboardData: response.data.data, 
        leaderboardMeta: response.data.meta,
        // 🛡️ RE-COUPLED FIX: Synchronize the toggle switch based on what MySQL returned
        resultsHidden: response.data.results_hidden === true
      });
    } catch (err) {
      if (err.response?.status === 403) {
        set({ 
          resultsHidden: true, 
          leaderboardData: [],
          leaderboardMessage: err.response.data.message 
        });
      } else {
        console.error("Error fetching standings:", err);
      }
    } finally {
      set({ loadingLeaderboard: false });
    }
  },

  /**
   * 🛡️ FIXED: Mutates store values and triggers a dashboard layout re-fetch
   */
togglePublicResults: async (shouldShow) => {
    console.log("🧠 [Store Action] togglePublicResults called with value:", shouldShow);
    set({ isToggling: true });
    
    try {
      const payload = { visible: shouldShow };
      console.log("🌐 [Axios Request] POSTing payload data:", payload);
      
      const response = await axiosClient.post('/admin/toggle-results', payload);
      
      console.log("✅ [Axios Response] Server responded with status 200:", response.data);
      
      // Mutate frontend store memory attributes
      set({ resultsHidden: !shouldShow });
      
      console.log("💾 [Store Mutation Synced] New store value for resultsHidden is now:", !shouldShow);
      
      alert(`🎉 Server Sync Success!\nMessage: ${response.data.message}\nNew Local State: ${shouldShow ? 'LIVE' : 'HIDDEN'}`);
      
    } catch (err) {
      console.error("❌ [Axios Error] Something went wrong with the toggle request:", err);
      alert(`Error modifying configurations: ${err.response?.data?.message || err.message}`);
    } finally {
      set({ isToggling: false });
    }
  }
}));