import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { NominationModal } from '../modals/NominationModal';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 selection:bg-orange-500/20 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
        <NominationModal />
      </main>
      <Footer />
    </div>
  );
}