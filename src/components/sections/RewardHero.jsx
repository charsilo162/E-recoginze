import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import heroBg from '../../assets/image/img1.jpg';
import heroBg1 from '../../assets/image/img2.jpg';
import heroBg2 from '../../assets/image/img3.jpg';


export const RewardHero = ({ title, subtitle }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
      
      {/* Left Column: Intersecting Three-Image Showcase Frame */}
      <div className="md:col-span-5 flex items-center justify-center gap-3 h-64 md:h-80">
        <div className="w-1/3 h-[85%] rounded-2xl overflow-hidden shadow-md transform -translate-y-4 border border-white">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/3 h-full rounded-2xl overflow-hidden shadow-xl border border-white z-10 scale-105">
          <img src={heroBg1} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/3 h-[85%] rounded-2xl overflow-hidden shadow-md transform translate-y-4 border border-white">
          <img src={heroBg2} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Right Column: Search Core Context Block */}
      <div className="md:col-span-7 space-y-6 text-left">
        <h1 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>

        {/* <div className="w-full max-w-xl p-1.5 bg-white border border-zinc-200 shadow-md rounded-xl flex gap-2">
          <input 
            type="text" 
            placeholder="Enter Name..." 
            className="w-full bg-transparent px-4 py-2 text-zinc-800 placeholder-zinc-400 outline-none text-sm"
          />
          <Button variant="primary" className="py-2.5 px-6 text-xs font-bold">Search</Button>
        </div> */}
      </div>

    </section>
  );
};