import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useVoteStore } from '../store/useVoteStore';
import { useWinnerStore } from '../store/useWinnerStore';
import { useCycleStore } from '../store/useCycleStore'; // 🔑 Import cycle states
import LeaderboardView from '../components/voting/LeaderboardView';
import DashboardFilters from '../components/voting/DashboardFilters';     
import PaginationControls from '../components/voting/PaginationControls'; 
import RaceTracker from '../components/ui/RaceTracker'; 
import { CycleSelector } from '../components/ui/CycleSelector'; // 🔑 Import dropdown selector component

export default function PublicLeaderboard() {
  const { 
    leaderboardData, 
    leaderboardMeta, 
    fetchLeaderboard, 
    loadingLeaderboard, 
    resultsHidden, 
    leaderboardMessage 
  } = useVoteStore();

  const { closeBattles, fetchCloseBattles } = useWinnerStore();
  
  // 🔑 Extract current cycle selection parameters from store layer
  const { selectedCycleId } = useCycleStore();

  // Manage local search states
  const [currentFilters, setCurrentFilters] = useState({ search: '', category_id: '', page: 1 });

  // 🔄 Sync state mutations cleanly, passing down the target cycle time parameters dynamically
  useEffect(() => {
    fetchLeaderboard({
      ...currentFilters,
      election_cycle_id: selectedCycleId // Hook the dashboard parameters safely directly to backend queries
    });
  }, [currentFilters, selectedCycleId, fetchLeaderboard]);

  // Fetch close matchups in real-time when the page mounts
  useEffect(() => {
    fetchCloseBattles();
  }, [fetchCloseBattles]);

  const handleFilterChange = (newFilters) => {
    // Reset page parameters back to index 1 when adjustments trigger
    setCurrentFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setCurrentFilters(prev => ({ ...prev, page: newPage }));
  };

  /* 🔒 Lock Screen Mode */
  if (resultsHidden) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/crowd-texture.jpg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 text-center rounded-2xl shadow-2xl relative z-10"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-b from-amber-500/20 to-orange-600/5 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-xl font-black text-white tracking-tight uppercase">Ballot Box Sealed</h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-medium bg-zinc-950/40 border border-zinc-800/40 rounded-xl p-4">
            {leaderboardMessage || "The voting ballot results are currently sealed by the administrator until winners are announced."}
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Awaiting Official Verification Broadcast</span>
          </div>
        </motion.div>
      </div>
    );
  }

  /* 📊 Standard Standings Feed Layout with Dynamic Cycle Selectors */
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-32 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Title Heading Area Layer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border-b border-zinc-200/60 pb-6">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">E-Recognize Live Standings</h1>
            <p className="text-sm text-slate-500 mt-1">See how the community is validating their leaders in real-time.</p>
          </div>
          
          {/* 🎯 Timeline Filter Dropdown Node Injection */}
          <CycleSelector />
        </div>

        {/* 🔥 DYNAMIC ALERT SLOT: Show high-stakes battle parameters if they exist */}
        {closeBattles && closeBattles.length > 0 && (
          <div className="mb-6">
            <RaceTracker battles={closeBattles} />
          </div>
        )}

        {/* 🎛️ Shared Filter Bar Controls */}
        <DashboardFilters onFilterChange={handleFilterChange} />

        {loadingLeaderboard ? (
          <div className="p-8 text-center font-bold text-slate-400 animate-pulse">Syncing Leaderboard Metrics...</div>
        ) : (
          <LeaderboardView data={leaderboardData} isAdmin={false} />
        )}

        {/* 📄 Shared Pagination Bar UI */}
        <PaginationControls meta={leaderboardMeta} onPageChange={handlePageChange} />

      </div> 
    </div>
  );
}