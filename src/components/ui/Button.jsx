import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-200 text-sm flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40",
    secondary:
      "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800",
    outline:
      "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};