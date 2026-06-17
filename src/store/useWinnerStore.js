import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

/**
 * 💡 Safe Local Context Helper: Standardizes database row objects 
 * for your reusable SpotlightGrid cards without breaking Zustand closures.
 */
const formatToGridItem = (nominee) => ({
  id: nominee.id,
  title: nominee.name,
  subtitle: `${nominee.category_title} • ${nominee.votes?.toLocaleString() || 0} Votes`,
  image: nominee.image
});

export const useWinnerStore = create((set, get) => ({
  featuredWinners: [],
  allWinners: [],
  platformMvp: null,
  closeBattles: [],
  verificationResult: null,
  verificationStatus: 'idle', // 'idle' | 'loading' | 'verified' | 'unverified' | 'error'
  loadingWinners: false,

  fetchFeaturedWinners: async () => {
    try {
      const res = await axiosClient.get('/winners/featured');
      const transformed = (res.data.data || []).map(item => formatToGridItem(item));
      set({ featuredWinners: transformed });
    } catch (err) {
      console.error("Error fetching featured showrunners:", err);
    }
  },

  fetchAllWinners: async () => {
    set({ loadingWinners: true });
    try {
      const res = await axiosClient.get('/winners/all');
      const transformed = (res.data.data || []).map(item => formatToGridItem(item));
      set({ allWinners: transformed });
    } catch (err) {
      console.error("Error building global Hall of Fame:", err);
    } finally {
      set({ loadingWinners: false });
    }
  },

  fetchPlatformMvp: async () => {
    try {
      const res = await axiosClient.get('/winners/mvp');
      if (res.data.status === 'success' && res.data.data) {
        set({ platformMvp: formatToGridItem(res.data.data) });
      }
    } catch (err) {
      console.error("Error pulling platform MVP metrics:", err);
    }
  },

  fetchCloseBattles: async () => {
    try {
      const res = await axiosClient.get('/winners/battles');
      set({ closeBattles: res.data.data || [] });
    } catch (err) {
      console.error("Error mapping close matchups:", err);
    }
  },

  /**
   * ⚡ FIXED ACTION: Clean pipeline tracking execution block
   */
  verifyHonoreeRecord: async (nameQuery) => {
    if (!nameQuery || !nameQuery.trim()) return;
    
    set({ verificationStatus: 'loading', verificationResult: null });
    console.log("🚀 Store executing network call for query:", nameQuery); // Sanity check log

    try {
      const res = await axiosClient.get(`/winners/verify?search=${encodeURIComponent(nameQuery.trim())}`);
      console.log("📬 Backend verification response received:", res.data);

      set({ 
        verificationResult: res.data.data,
        verificationStatus: 'verified'
      });
    } catch (err) {
      console.error("❌ Verification error caught:", err);
      set({ 
        verificationResult: null,
        verificationStatus: err.response?.status === 404 ? 'unverified' : 'error'
      });
    }
  },

  clearVerificationState: () => set({ verificationStatus: 'idle', verificationResult: null })
}));