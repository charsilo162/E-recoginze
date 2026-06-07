import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import heroBg from '../../assets/image/img1.jpg';

export const SpotlightGrid = ({ title, tag, items = [], columns = 3 }) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4" // Tighter grids as seen in image_d7976b.jpg
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="mb-8 text-left">
        <span className="text-orange-600 text-xs font-bold tracking-widest uppercase">{tag}</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mt-1">{title}</h2>
      </div>

      <div className={`grid ${gridCols[columns] || gridCols[3]}`}>
        {items.map((item, index) => {
          // Wrap in a conditional Link structure if an ID is present
          const CardContent = (
            <Card className="bg-white border-zinc-200/60 text-zinc-800 flex flex-col h-full cursor-pointer group">
              <div className="aspect-[4/5] w-full relative overflow-hidden bg-zinc-100">
                <img 
                  src={item.image || heroBg} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between bg-zinc-50/50">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 leading-tight group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            </Card>
          );

          return item.id ? (
            <Link to={`/honoree/${item.id}`} key={index}>
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