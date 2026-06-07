import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const ActionBanner = ({ title, description, inputPlaceholder, buttonText, imageSrc, reverse = false }) => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <Card className="bg-gradient-to-br from-white to-zinc-50 border-zinc-200/60 p-8 md:p-12">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
              {title}
            </h3>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-xl">
              {description}
            </p>
            
            {inputPlaceholder && (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md pt-2">
                <input 
                  type="text" 
                  placeholder={inputPlaceholder} 
                  className="bg-white border border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 outline-none focus:border-orange-500 transition-colors w-full shadow-sm"
                />
                <Button variant="secondary" className="whitespace-nowrap bg-zinc-900 text-white hover:bg-zinc-800">{buttonText || 'Submit'}</Button>
              </div>
            )}
          </div>

          <div className="flex-1 w-full max-w-md md:max-w-none">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="aspect-[16/10] rounded-xl overflow-hidden shadow-xl relative border border-zinc-200"
            >
              <img src={imageSrc || "/api/placeholder/600/400"} alt={title} className="w-full h-full object-cover" />
            </motion.div>
          </div>

        </div>
      </Card>
    </section>
  );
};