import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { useWinnerStore } from '../../store/useWinnerStore';
import heroBg from '../../assets/image/img1.jpg';

export const ActionBanner = ({ title, reverse = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { verifyHonoreeRecord, verificationResult, verificationStatus, clearVerificationState } = useWinnerStore();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      verifyHonoreeRecord(searchQuery);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <Card className="bg-gradient-to-br from-white to-zinc-50/50 border-zinc-200/80 p-8 md:p-12 shadow-sm overflow-hidden relative">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          
          {/* Left Text and Form Column Input Section */}
          <div className="flex-1 space-y-6 z-10 w-full">
            <h3 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-900">
              {title}
            </h3>
            
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              Verify standard validation credentials instantly. Query our active database nodes to inspect certified peer-elected champions.
            </p>

            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type honoree full name..."
                className="bg-white border border-zinc-200 px-4 py-3 rounded-xl text-sm w-full outline-none focus:border-zinc-400 transition-colors shadow-inner text-zinc-800 font-medium"
              />
              <button 
                type="submit" 
                disabled={verificationStatus === 'loading'}
                className="bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                {verificationStatus === 'loading' ? 'Searching...' : 'Verify'}
              </button>
            </form>

            {/* Verification Status Alerts */}
            <AnimatePresence mode="wait">
              {verificationStatus === 'verified' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex justify-between items-center max-w-md">
                  <div>
                    <span className="font-bold block text-sm text-emerald-900">✓ Record Authenticated</span>
                    Confirmed winner of the <span className="underline font-bold">{verificationResult?.category_title}</span>
                  </div>
                  <button onClick={clearVerificationState} className="text-emerald-500 hover:text-emerald-700 ml-4">✕</button>
                </motion.div>
              )}

              {verificationStatus === 'unverified' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-medium flex justify-between items-center max-w-md">
                  <div>
                    <span className="font-bold block text-sm text-rose-900">✕ Unverified Entity</span>
                    This profile entry is not recorded as an active category champion.
                  </div>
                  <button onClick={clearVerificationState} className="text-rose-400 hover:text-rose-600 ml-4">✕</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Image Placeholder Box Column */}
          <div className="flex-1 w-full max-w-md md:max-w-none">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="aspect-[16/10] rounded-2xl overflow-hidden shadow-xl relative border border-zinc-200 bg-zinc-100"
            >
              {/* Dynamic Image swapping based on search state results */}
              <img 
                src={verificationStatus === 'verified' && verificationResult?.image ? verificationResult.image : heroBg} 
                alt={title} 
                className="w-full h-full object-cover transition-all duration-500" 
              />
              
              {verificationStatus === 'verified' && (
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] bg-amber-500 font-black text-zinc-950 uppercase tracking-widest px-2 py-0.5 rounded w-max mb-1">Official Laureate</span>
                  <p className="font-black text-xl tracking-tight">{verificationResult?.name}</p>
                  <p className="text-[11px] text-zinc-300 font-medium">{verificationResult?.category_title} ({verificationResult?.votes} Votes)</p>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </Card>
    </section>
  );
};