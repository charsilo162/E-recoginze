import React, { useEffect } from 'react';
import { useVoteStore } from '../../store/useVoteStore';
import LeaderboardView from '../../components/voting/LeaderboardView';
import DashboardFilters from '../../components/voting/DashboardFilters';
import PaginationControls from '../../components/voting/PaginationControls';
import VoterAuditModal from '../../components/voting/VoterAuditModal';

export default function AdminDashboard() {
  const { 
    leaderboardData, 
    leaderboardMeta, 
    fetchLeaderboard, 
    loadingLeaderboard,
    togglePublicResults, 
    isToggling,
    resultsHidden 
  } = useVoteStore();

  const [currentFilters, setCurrentFilters] = React.useState({ search: '', category_id: '', page: 1 });
  const [auditTarget, setAuditTarget] = React.useState(null); 

  const isCurrentlyPublic = !resultsHidden;

  // Track store changes
  useEffect(() => {
    console.log("📊 [UI Render] Current store state -> resultsHidden:", resultsHidden, "| isCurrentlyPublic (checkbox checked state):", isCurrentlyPublic);
  }, [resultsHidden, isCurrentlyPublic]);

  useEffect(() => {
    fetchLeaderboard(currentFilters);
  }, [currentFilters, fetchLeaderboard]);

  const handleFilterChange = (newFilters) => {
    setCurrentFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setCurrentFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleToggle = async (e) => {
    const checked = e.target.checked;
    
    console.log("👆 [UI Clicked] Checkbox changed to:", checked);
    console.log("📡 Sending visibility action request payload to Zustand store...");

    if (togglePublicResults) {
      await togglePublicResults(checked);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-32 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* ⚙️ Action Header Panel */}
        <div className="mb-8 bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Live Vote Audit Stream</h1>
            <p className="text-sm text-slate-500 mt-0.5">Control global platform ballot results visibility parameters.</p>
          </div>
          
          {/* Dynamic Switch Control */}
          <label className="inline-flex items-center gap-3 cursor-pointer select-none self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              {isCurrentlyPublic ? "🔊 Public Standings: Live" : "🔇 Public Standings: Hidden"}
            </span>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={isCurrentlyPublic} 
                disabled={isToggling}
                onChange={handleToggle} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </div>
          </label>
        </div>

        {/* Shared Filters Panel Bar */}
        <DashboardFilters onFilterChange={handleFilterChange} />

        {/* Live Metrics Content Body */}
        {loadingLeaderboard ? (
          <div className="p-12 text-center font-bold text-slate-400 animate-pulse">
            Syncing Leaderboard Elements...
          </div>
        ) : (
          <LeaderboardView 
            data={leaderboardData} 
            isAdmin={true} 
            onNomineeClick={(id, name) => setAuditTarget({ id, name })} 
          />
        )}

        {/* Reusable Shared Pagination Bars */}
        <PaginationControls meta={leaderboardMeta} onPageChange={handlePageChange} />

        {/* Audit Overlay Component Activation Slot */}
        {auditTarget && (
          <VoterAuditModal 
            nominationId={auditTarget.id}
            nomineeName={auditTarget.name}
            onClose={() => setAuditTarget(null)}
          />
        )}

      </div>
    </div>
  );
}