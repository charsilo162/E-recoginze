// src/pages/BallotListing.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ballotService } from '../services/ballotService';

export default function BallotListing() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votingId, setVotingId] = useState(null);

  useEffect(() => {
    fetchActiveBallot();
  }, []);

  const fetchActiveBallot = async () => {
    try {
      const result = await ballotService.getActiveBallot();
      if (result.status === 'success') {
        setCategories(result.data || []);
      }
    } catch (error) {
      console.error("Error hydrating ballot landscape:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCastVote = async (nominationId) => {
    setVotingId(nominationId);
    try {
      const result = await ballotService.castVote(nominationId);
      if (result.status === 'success') {
        alert("Vote securely recorded!");
        fetchActiveBallot(); // Refresh counts live from the database
      } else {
        alert(result.message || "Could not cast vote.");
      }
    } catch (err) {
      alert(err.message || "Network processing error.");
    } finally {
      setVotingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-8 animate-pulse">
        <div className="h-10 bg-zinc-800 rounded-lg w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => <div key={n} className="h-64 bg-zinc-900 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  // 🔒 SECURITY CHECK: Render an elegant closed screen if no categories exist or active cycles aren't running
  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 text-center rounded-2xl shadow-2xl relative z-10"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/60 rounded-2xl flex items-center justify-center mb-6 shadow-inner text-xl">🗳️</div>
          <h2 className="text-xl font-black text-white tracking-tight uppercase">Ballot Box Closed</h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed bg-zinc-950/40 border border-zinc-800/40 rounded-xl p-4">
            The voting windows are currently closed. No active validation batches are running at this moment.
          </p>
          <div className="mt-8">
            <Link to="/reward" className="inline-flex items-center justify-center bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md w-full">
              Return To Dashboard Overview
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Premium Header Layout */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-black tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          Live Voting Ballot
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight mt-4 sm:text-4xl">
          Shape the Cohort Cycle
        </h1>
        <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
          Review the vetted shortlisted nominees below and cast your vote to finalize this batch's top honorees.
        </p>
      </div>

      {/* Loop Categories mapped seamlessly from your Laravel backend setup */}
      {categories.map((category) => (
        <div key={category.id} className="mb-16 last:mb-0">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-bold text-white tracking-tight">{category.name}</h2>
            <div className="h-px bg-zinc-800/80 flex-1" />
            <span className="text-xs font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-md">
              {category.shortlists?.length || 0} Contenders
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.shortlists?.map((nominee) => (
              <motion.div
                key={nominee.id}
                whileHover={{ y: -4 }}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={nominee.avatar_path ? `${nominee.avatar_path}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      className="w-14 h-14 rounded-xl object-cover border border-zinc-800 shadow-inner"
                      alt={nominee.nominate_name}
                    />
                    <div>
                      <h3 className="font-bold text-zinc-100 text-base leading-tight hover:text-emerald-400 transition-colors">
                        <Link to={`/honoree/${nominee.id}`}>{nominee.nominate_name}</Link>
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 font-medium">🗳️ {nominee.votes_count || 0} votes recorded</p>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                    {nominee.reason}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-zinc-800/60">
                  <Link 
                    to={`/honoree/${nominee.id}`} 
                    className="flex-1 text-center py-2.5 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs rounded-xl transition-colors bg-zinc-950/40"
                  >
                    View Profile
                  </Link>
                  <button
                    disabled={votingId === nominee.id}
                    onClick={() => handleCastVote(nominee.id)}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white font-bold text-xs rounded-xl shadow-sm tracking-wide transition-colors"
                  >
                    {votingId === nominee.id ? 'Voting...' : 'Cast Vote'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}