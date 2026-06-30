import React, { useEffect, useState } from 'react';
import { useVoteStore } from '../../store/useVoteStore';

export default function DashboardFilters({ onFilterChange }) {
  // 🔌 Extract values. Defaulting categoriesList below prevents runtime breaks
  const { categoriesList = [], fetchFilterCategories } = useVoteStore();
  const [search, setSearch] = useState('');
  const [catId, setCatId] = useState('');

  useEffect(() => {
    fetchFilterCategories();
  }, [fetchFilterCategories]);

  // Push changes upward to trigger the API calls whenever filters update
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({ search, category_id: catId, page: 1 });
    }, 400); // ⏱️ Debounce search type inputs to prevent API spamming

    return () => clearTimeout(delayDebounceFn);
  }, [search, catId, onFilterChange]); // 🔑 Added onFilterChange to dependency array safely

  // Safe reference variable ensures a mapping fallback is always available
  const safeCategories = Array.isArray(categoriesList) ? categoriesList : [];

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center mb-6">
      <div className="w-full md:flex-grow relative">
        <input 
          type="text"
          placeholder="🔎 Search candidates by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 p-2.5 pl-9 rounded-xl outline-none text-sm text-slate-800 focus:border-slate-400 transition-colors"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
          {/* Optional visual icon container alignment */}
        </span>
      </div>
      
      <div className="w-full md:w-64">
        <select
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl outline-none text-sm text-slate-700 cursor-pointer focus:border-slate-400"
        >
          <option value="">All Categories</option>
          
          {/* 🛡️ Optional Chaining + Safe Array fallback guarantees zero runtime crashes */}
          {safeCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title || c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}