import React from 'react';
import { motion } from 'framer-motion';

// 🔌 Added onNomineeClick prop to the component signature
export default function LeaderboardView({ data = [], isAdmin = false, onNomineeClick }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200/60 text-center text-slate-400 font-medium">
        No active ballot data available to display.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {data.map((category) => (
        <div key={category.id} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/60 shadow-sm">
          
          {/* Header Metadata block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-slate-100 pb-4 gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
                {category.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Live aggregated consensus stream</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs font-bold bg-slate-900 text-slate-100 px-3 py-1.5 rounded-xl">
                {(category.total_votes || 0).toLocaleString()} Total Votes Cast
              </span>
            </div>
          </div>

          {/* Candidates Listing Rows */}
          <div className="space-y-6">
            {category.candidates?.map((candidate, index) => {
              const isWinning = index === 0 && category.total_votes > 0;

              return (
                <div 
                  key={candidate.id} 
                  // 👑 ACTION HOOK: If admin view is active, make row clickable and pass data up
                  onClick={() => isAdmin && onNomineeClick?.(candidate.id, candidate.name)}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    isAdmin 
                      ? 'cursor-pointer hover:bg-slate-100/80 hover:border-slate-300 border-slate-100 bg-slate-50/50' 
                      : 'border-slate-100 bg-slate-50/50'
                  }`}
                >
                  
                  {/* Candidate Avatar block */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 relative flex-shrink-0 border border-slate-200">
                    <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover" />
                    {isWinning && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-white p-0.5 rounded-bl text-[9px] font-black">
                        👑
                      </div>
                    )}
                  </div>

                  {/* Progress Data bars content section */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <div>
                        <span className="font-bold text-slate-800 text-sm md:text-base mr-2">{candidate.name}</span>
                        {isWinning && <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">Frontrunner</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-xs md:text-sm font-black text-slate-900">{candidate.percentage}%</span>
                        {isAdmin && (
                          <span className="text-[11px] text-amber-600 font-bold block underline hover:text-amber-700">
                            🔍 Audit ({candidate.votes} votes)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Outer Progress Tracker Track */}
                    <div className="w-full bg-slate-200/70 h-3 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${candidate.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          isWinning 
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
                            : 'bg-gradient-to-r from-slate-700 to-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  );
}