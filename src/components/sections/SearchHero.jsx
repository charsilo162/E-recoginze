import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const SearchHero = ({ title, subtitle, stats = [] }) => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pt-24">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-orange-600 font-bold tracking-widest text-xs uppercase bg-orange-500/10 px-4 py-1.5 rounded-full">
          E-Recognize Platform
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 mt-4 mb-6 leading-[1.15]">
          {title}
        </h1>
        <p className="text-zinc-600 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Premium White Glass Search Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="w-full max-w-2xl p-2 bg-white border border-zinc-200/80 backdrop-blur-xl rounded-2xl flex flex-col sm:flex-row gap-2 shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
      >
        <input 
          type="text" 
          placeholder="Enter name, award tier, or state..." 
          className="w-full bg-transparent px-4 py-3 text-zinc-800 placeholder-zinc-400 outline-none focus:ring-0 text-sm"
        />
        <Button variant="primary" className="sm:w-auto w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/10">
          Search Registry
        </Button>
      </motion.div>

      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-12 mt-16 border-t border-zinc-200 pt-10 w-full max-w-lg">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">{stat.value}</h3>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};