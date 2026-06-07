import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rewards & Exploits', path: '/reward' },
    { name: 'About Us', path: '#about' },
    { name: 'Heritage Registry', path: '#heritage' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo Wrapper */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-black shadow-md shadow-orange-500/20">
            E
          </div>
          <span className="font-black text-lg tracking-tight text-zinc-900 group-hover:text-orange-600 transition-colors">
            E-RECOGNIZE
          </span>
        </Link>

        {/* Dynamic Interactive Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1 rounded-xl border border-zinc-200/40">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path.startsWith('#') ? '#' : link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-orange-600' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBubble"
                    className="absolute inset-0 bg-white shadow-sm border border-zinc-200/50 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Premium Action CTA */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex border-zinc-200 hover:bg-zinc-50 text-zinc-700">
            Verify Portal
          </Button>
          <Button variant="primary" className="bg-gradient-to-r from-amber-500 to-orange-600 shadow-sm">
            Nominate Someone
          </Button>
        </div>

      </div>
    </nav>
  );
}