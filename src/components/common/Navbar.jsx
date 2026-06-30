import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Kept your original animation support
import { useNominationStore } from '../../store/useNominationStore'; // Adjust store path if needed
import { authService } from '../../services/authService'; // Adjust this import path
import { Button } from '../ui/Button';
import { NominationModal } from '../../components/modals/NominationModal';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const openModal = useNominationStore((state) => state.openModal);

  // 1. Set up local state to track auth status and user role
  const [authState, setAuthState] = useState({
    isAuthenticated: authService.isAuthenticated(),
    userRole: authService.getRole(),
  });

  // 2. Sync state whenever the URL changes
  useEffect(() => {
    setAuthState({
      isAuthenticated: authService.isAuthenticated(),
      userRole: authService.getRole(),
    });
  }, [location.pathname]);

  // 3. Core structural base navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rewards & Exploits', path: '/reward' },
    { name: 'About Us', path: '/about' },
  ];

  // 4. Inject Dynamic Links based on Auth Status
  if (authState.isAuthenticated) {
    // Inject Dashboard right after 'Home'
    navLinks.splice(1, 0, { name: 'Dashboard', path: '/reward' });

    // Inject Admin specific options if the role matches
    if (authState.userRole === 'admin') {
      navLinks.push({ name: 'Admin Standings', path: '/admin/standings' });
      navLinks.push({ name: 'Election Cycle', path: '/electioncycle' });
    }
  }

  // Handle User Logging out cleanly
  const handleLogout = () => {
    authService.logout();
    setAuthState({ isAuthenticated: false, userRole: null });
    navigate('/auth');
  };

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
                to={link.path}
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

        {/* Premium Action CTA Area */}
        <div className="flex items-center gap-3">
          {/* Dynamic Login/Logout Button based on system state */}
          {authState.isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 px-4 h-10 flex items-center justify-center rounded-xl transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/70 px-4 h-10 flex items-center justify-center rounded-xl transition-colors border border-zinc-200/50"
            >
              Login
            </Link>
          )}
          
          <Button 
            type="button"
            onClick={openModal}
            variant="primary" 
            className="bg-gradient-to-r from-amber-500 to-orange-600 shadow-sm h-10 rounded-xl"
          >
            Nominate Someone
          </Button>
        </div>

      </div>
    </nav>
  );
}