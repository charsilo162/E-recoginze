import { create } from 'zustand';
import axiosClient from '../api/axiosClient';

export const useCycleStore = create((set, get) => ({
  cycles: [],
  activeCycle: null,
  selectedCycleId: null, // Tracks historical lookups on leaderboards/hall-of-fame
  loadingCycles: false,

  fetchCycles: async () => {
    set({ loadingCycles: true });
    try {
      const res = await axiosClient.get('/election-cycles');
      if (res.data.status === 'success') {
        const allCycles = res.data.data;
        const active = allCycles.find(c => c.status === 'active') || null;
        
        set({ 
          cycles: allCycles, 
          activeCycle: active,
          // Default selection to the active batch if not already manually set by the user
          selectedCycleId: get().selectedCycleId || (active ? active.id : allCycles[0]?.id || null)
        });
      }
    } catch (err) {
      console.error("Failed syncing election metadata:", err);
    } finally {
      set({ loadingCycles: false });
    }
  },

  setSelectedCycle: (id) => set({ selectedCycleId: id }),

  // 🔒 Admin Core Actions
  createNextBatch: async (batchData) => {
    try {
      const res = await axiosClient.post('/admin/election-cycles', batchData);
      if (res.data.status === 'success') {
        await get().fetchCycles(); // Auto refresh and sync entire dataset state
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || "Transactional execution failed." 
      };
    }
  },

  terminateActiveBatch: async (id) => {
    try {
      await axiosClient.patch(`/admin/election-cycles/${id}/stop`);
      await get().fetchCycles();
    } catch (err) {
      console.error("Failed to safely seal voting window:", err);
    }
  }
}));