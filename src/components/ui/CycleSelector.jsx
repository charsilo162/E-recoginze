import React, { useEffect } from 'react';
import { useCycleStore } from '../../store/useCycleStore';

export const CycleSelector = () => {
  const { cycles, selectedCycleId, setSelectedCycle, fetchCycles } = useCycleStore();

  useEffect(() => {
    fetchCycles();
  }, [fetchCycles]);

  if (cycles.length <= 1) return null; // No need to filter if there's only one batch in the database

  return (
    <div className="flex items-center gap-2 bg-white border border-zinc-200 shadow-sm px-3 py-1.5 rounded-xl max-w-max">
      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-wider">
        Election Term:
      </label>
      <select
        value={selectedCycleId || ''}
        onChange={(e) => setSelectedCycle(Number(e.target.value))}
        className="bg-transparent text-xs font-bold text-zinc-800 outline-none cursor-pointer pr-2"
      >
        {cycles.map((cycle) => (
          <option key={cycle.id} value={cycle.id}>
            {cycle.name} {cycle.status === 'active' ? '• Live' : '• Archived'}
          </option>
        ))}
      </select>
    </div>
  );
};