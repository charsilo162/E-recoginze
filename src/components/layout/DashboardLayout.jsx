import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { sidebarNavigation, ROUTES } from '../../config/navigation';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter links dynamically based on role verification rules
  const visibleLinks = sidebarNavigation.filter(link => {
    if (!isAuthenticated) return false;
    return link.roles.includes(userRole);
  });

  const handleLogout = () => {
    authService.logout();
    navigate(ROUTES.AUTH);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex overflow-hidden">
      <aside className={`bg-zinc-900 border-r border-zinc-800/80 h-screen flex flex-col justify-between transition-all duration-300 relative z-20 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800/60">
            {isSidebarOpen && <span className="font-black tracking-wider text-sm text-emerald-500 uppercase px-2">E-Reward Panel</span>}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors ${!isSidebarOpen && 'mx-auto'}`}>
              {isSidebarOpen ? '❮' : '❯'}
            </button>
          </div>

          {isSidebarOpen && (
            <div className="m-4 p-3 bg-zinc-950/60 border border-zinc-800/40 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-xs uppercase text-white">{userRole?.substring(0, 2) || 'US'}</div>
              <div className="truncate">
                <p className="text-xs font-semibold text-zinc-200 capitalize truncate">{userRole} Account</p>
                <span className="text-[10px] text-zinc-500 tracking-wide uppercase font-medium">Secured Node</span>
              </div>
            </div>
          )}

          <nav className="mt-4 px-3 space-y-1">
            {visibleLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} className={`flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-medium transition-all group ${isActive ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'}`}>
                  <span className={`text-base transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-70'}`}>{link.icon}</span>
                  {isSidebarOpen && <span className="truncate">{link.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-zinc-800/60 bg-zinc-900/40">
          <button onClick={handleLogout} className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all group">
            <span className="text-base group-hover:translate-x-0.5 transition-transform">🚪</span>
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-zinc-800/60 bg-zinc-900/20 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
          <div className="text-xs text-zinc-500 font-medium">Path: <span className="text-zinc-400 font-mono">{location.pathname}</span></div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-zinc-400 font-medium tracking-wide">Sync Complete</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-zinc-950/40 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}