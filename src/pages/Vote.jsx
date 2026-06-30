import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoteStore } from '../store/useVoteStore';

export default function Vote() {
  const { categories, votes, castVote, submitVotes, fetchBallot, loading, message } = useVoteStore();

  // 🔌 Automatically hydrate ballot structures directly from database seed records on mount
  useEffect(() => {
    fetchBallot();
  }, [fetchBallot]);

  // 🔒 SECURITY CHECK: If backend explicitly sends 'closed' status signals or categories are empty
  const isClosed = !loading && (!categories || categories.length === 0);

  if (isClosed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Modern decorative visual lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 text-center rounded-2xl shadow-2xl relative z-10"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/60 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-xl font-black text-white tracking-tight uppercase">Ballot Box Closed</h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-medium bg-zinc-950/40 border border-zinc-800/40 rounded-xl p-4">
            {message || "The voting windows are currently closed. No active validation batches are running at this moment."}
          </p>

          <div className="mt-8">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md w-full"
            >
              Return To Dashboard Overview
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* 📊 Standard Active Voting Feed Layout */
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-32 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Back navigation & Header */}
        <div className="mb-12">
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-all flex items-center gap-1 mb-4">
            ← Back to Overview
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Community Balloting Platform
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Click on any card containing your best candidate to vote. Your votes count, but don't forget you can only vote once per category.
          </p>
        </div>

        {/* ⏳ Skeleton Loader State UI */}
        {loading && (!categories || categories.length === 0) ? (
          <div className="space-y-8 animate-pulse">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-8 border border-slate-200/60 h-64 w-full" />
            ))}
          </div>
        ) : (
          /* 🗳️ Live Categories Loop mapped from DB records */
          <div className="space-y-12">
            {categories?.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-sm">
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-emerald-500 rounded-full"></span>
                    {category.title}
                  </h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium transition-colors duration-200 ${
                    votes[category.id] 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {votes[category.id] ? "Selection Saved" : "Selection Required"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {category.candidates?.map((candidate) => {
                    const isSelected = votes[category.id] === candidate.id;

                    return (
                      <motion.div
                        key={candidate.id}
                        whileHover={{ y: -4 }}
                        onClick={() => castVote(category.id, candidate.id)}
                        className={`group relative cursor-pointer rounded-xl overflow-hidden bg-white border transition-all duration-200 ${
                          isSelected
                            ? 'border-emerald-500 ring-4 ring-emerald-500/10 shadow-md'
                            : 'border-slate-200 shadow-sm hover:border-slate-300'
                        }`}
                      >
                        <div className="aspect-square bg-slate-100 relative overflow-hidden">
                          <img 
                            src={candidate.image} 
                            alt={candidate.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[1px] flex items-center justify-center"
                              >
                                <div className="bg-emerald-500 text-white rounded-full p-2.5 shadow-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="p-3 bg-white border-t border-slate-50 text-center">
                          <p className="font-semibold text-slate-800 text-xs md:text-sm truncate">{candidate.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Nominee #{candidate.id * 12}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Sticky Submission Tray */}
        <AnimatePresence>
          {votes && Object.keys(votes).length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 70 }}
              className="fixed bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-xl bg-slate-900/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between border border-slate-800 z-50"
            >
              <div className="text-left">
                <p className="text-white text-sm font-semibold">Ready to Submit</p>
                <p className="text-slate-400 text-xs mt-0.5">{Object.keys(votes).length} choice(s) recorded</p>
              </div>
              <button 
                onClick={submitVotes}
                disabled={loading}
                className={`text-white font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-lg select-none ${
                  loading 
                    ? 'bg-slate-700 cursor-not-allowed opacity-50' 
                    : 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 active:scale-95'
                }`}
              >
                {loading ? "Saving choices..." : "Submit My Votes"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}