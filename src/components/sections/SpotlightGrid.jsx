import React from 'react';
import { SpotlightCard } from './SpotlightCard';

export const SpotlightGrid = ({ title, tag, items = [], columns = 3 }) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="mb-8 text-left">
        <span className="text-orange-600 text-xs font-bold tracking-widest uppercase">{tag}</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mt-1">{title}</h2>
      </div>

      <div className={`grid ${gridCols[columns] || gridCols[3]}`}>
        {items.map((item) => (
          <SpotlightCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};