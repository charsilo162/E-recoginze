import React from 'react';
import { motion } from 'framer-motion';

export default function RaceTracker({ battles = [] }) {
  if (battles.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 md:p-8 border border-zinc-800 shadow-xl my-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
        <h3 className="text-sm font-black tracking-widest uppercase text-red-400">Critical Voting Matchups</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {battles.map((battle) => (
          <div key={battle.category_id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-red-600 text-[10px] font-black px-2.5 py-1 rounded-bl-xl tracking-wider uppercase">
              {battle.gap_percentage}% Gap
            </span>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wide mb-3">{battle.category_name}</p>
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <img src={battle.leader.image} className="w-8 h-8 rounded-full object-cover border border-amber-500" />
                <span className="text-xs font-bold text-white truncate max-w-[100px]">{battle.leader.name}</span>
              </div>
              <span className="text-[10px] text-zinc-600 font-black">VS</span>
              <div className="flex items-center gap-2 flex-row-reverse">
                <img src={battle.challenger.image} className="w-8 h-8 rounded-full object-cover border border-zinc-600" />
                <span className="text-xs font-bold text-zinc-300 truncate max-w-[100px]">{battle.challenger.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}