import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/image/img1.jpg';

export const SpotlightGrid = ({ title, tag, items = [], columns = 3, loading = false }) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2 gap-6",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
  };

  if (loading) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 text-center">
        <div className="h-4 w-24 bg-zinc-200 animate-pulse rounded mx-auto mb-2" />
        <div className="h-8 w-64 bg-zinc-300 animate-pulse rounded mx-auto mb-8" />
        <div className={`grid ${gridCols[columns] || gridCols[3]}`}>
          {Array.from({ length: columns * 1 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-zinc-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="mb-8 text-left border-b border-zinc-100 pb-4">
        {tag && <span className="text-orange-600 text-xs font-black tracking-widest uppercase bg-orange-50 px-2.5 py-1 rounded">{tag}</span>}
        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mt-2 tracking-tight">{title}</h2>
      </div>

      <div className={`grid ${gridCols[columns] || gridCols[3]}`}>
        {items.map((item, index) => {
          const CardContent = (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[4/5] w-full relative overflow-hidden bg-zinc-100 border-b border-zinc-100">
                <img 
                  src={item.image || heroBg} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-zinc-50/30">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 leading-snug group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium mt-1">{item.subtitle}</p>
                </div>
              </div>
            </motion.div>
          );

          return item.id ? (
            <Link to={`/honoree/${item.id}`} key={item.id || index} className="no-underline">
              {CardContent}
            </Link>
          ) : (
            <div key={index}>{CardContent}</div>
          );
        })}
      </div>
    </section>
  );
};