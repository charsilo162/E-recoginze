import { motion } from 'framer-motion';

export const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-shadow overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};