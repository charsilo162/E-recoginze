import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useNominationStore } from '../../store/useNominationStore';
import { NominationModal } from '../../components/modals/NominationModal';
import heroBg from '../../assets/image/img1.jpg';
export const HomeHero = ({ title, subtitle, stats = [] }) => { 
  const openModal = useNominationStore((state) => state.openModal);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-zinc-900 border-b border-zinc-200/50">
      {/* Background graphic layer to emulate dark-textured crowd backdrop in light-theme mode safely */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      ></div>      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950/20 via-white/40 to-slate-50" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 leading-[1.1]">
          {title}
        </h1>
        <p className="text-zinc-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Aligned Search Input & Dual Action Buttons Component Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl mx-auto p-2 bg-white/90 backdrop-blur-md border border-zinc-200 shadow-xl rounded-2xl flex flex-col md:flex-row items-center gap-2"
        >
          {/* <input 
            type="text" 
            placeholder="Enter Name..." 
            className="w-full bg-transparent px-4 py-3 text-zinc-800 placeholder-zinc-400 outline-none text-sm font-medium"
          /> */}
<div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
  {/* <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black px-8 py-4 rounded-xl text-base tracking-wide shadow-lg hover:scale-105 transition-all">
    SEARCH
  </button> */}

  <button
    type="button"
    onClick={openModal}
    className="bg-zinc-900 text-white hover:bg-zinc-800 font-black px-8 py-4 rounded-xl text-base tracking-wide shadow-lg hover:scale-105 transition-all"
  >
    RECOGNIZE SOMEONE
  </button>
</div>
        </motion.div>

        {/* Counter Stats Alignment */}
        {stats.length > 0 && (
          <div className="flex justify-center gap-16 pt-8 max-w-md mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <h3 className="text-3xl font-black text-zinc-900">{stat.value}</h3>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};