import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export const LocationGrid = ({ title, items = [] }) => {
  return (
    <section className="py-20 bg-zinc-950/40 border-y border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-500 text-xs font-bold tracking-widest uppercase">Verified Regions</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2">{title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((location, i) => (
            <Card key={i} className="bg-zinc-950/60 border-zinc-900 group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={location.image || "/api/placeholder/400/300"} 
                  alt={location.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
                
                {/* Absolute Floating Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-xl font-bold text-white tracking-wide drop-shadow-md">
                    {location.name}
                  </h4>
                </div>
              </div>
              <div className="p-5">
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                  {location.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};