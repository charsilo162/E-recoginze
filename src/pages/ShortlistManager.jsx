import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { shortlistService } from '../services/shortlistService'; // 👈 Import your new service

export default function ShortlistManager() {
  const [nominations, setNominations] = useState([]);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  
  // Pagination State Parameters
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0
  });

  // 📡 Fetch pending shortlists via centralized service
  const fetchPendingShortlist = async (page = 1) => {
    setLoading(true);
    try {
      const result = await shortlistService.getPendingShortlist(page);
      if (result.status === 'success') {
        setNominations(result.data);
        setPagination(result.meta);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingShortlist(pagination.current_page);
  }, [pagination.current_page]);

  // ⚡ Mutation execution via centralized service
  const handleApproveAndPublish = async (id) => {
    setProcessingId(id);
    try {
      const result = await shortlistService.approveAndPublish(id);
      
      if (result.status === 'success') {
        alert(result.message || "Approved successfully!");
        setSelectedNominee(null); // Close detail window
        fetchPendingShortlist(pagination.current_page); // Refresh list values
      }
    } catch (error) {
      alert(error.message || "Transactional confirmation failed.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* 📋 Left Side: Master Queue List View Panel Column */}
      <div className="lg:col-span-7 space-y-4 bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-zinc-900 tracking-tight">Curation Review Queue</h2>
          <p className="text-xs text-zinc-500 mt-1">Select a candidate row profile card below to audit details and publish to active ballots.</p>
        </div>

        <hr className="border-zinc-100" />

        {loading ? (
          <div className="space-y-3 animate-pulse py-6">
            {[1, 2, 3].map(n => <div key={n} className="h-20 bg-zinc-100 rounded-xl w-full" />)}
          </div>
        ) : nominations.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
            <p className="text-sm font-medium text-zinc-400">Review grid empty. No verified claims pending verification.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {nominations.map((nom) => (
              <motion.div
                key={nom.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedNominee(nom)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                  selectedNominee?.id === nom.id 
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-sm' 
                    : 'border-zinc-100 hover:border-zinc-300 bg-zinc-50/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-100 overflow-hidden border border-zinc-200 shadow-inner">
                    <img 
                      src={nom.avatar_path ? `${nom.avatar_path}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
                      className="w-full h-full object-cover" 
                      alt="" 
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">{nom.nominate_name}</h4>
                    <p className="text-xs font-semibold text-zinc-400 mt-0.5">{nom.category_name || 'Unassigned Category'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-md bg-amber-100 text-amber-800">Claimed</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 📑 Flexible Dynamic Pagination Footers */}
        {pagination.last_page > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-6">
            <button
              disabled={pagination.current_page === 1 || loading}
              onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page - 1 }))}
              className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 disabled:opacity-40 select-none transition-all"
            >
              ← Previous Queue
            </button>
            <span className="text-xs font-semibold text-zinc-400">Page {pagination.current_page} of {pagination.last_page}</span>
            <button
              disabled={pagination.current_page === pagination.last_page || loading}
              onClick={() => setPagination(prev => ({ ...prev, current_page: prev.current_page + 1 }))}
              className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 disabled:opacity-40 select-none transition-all"
            >
              Next Queue →
            </button>
          </div>
        )}
      </div>

      {/* 🔍 Right Side: Dynamic Live Audit & Publishing Action Panel Column */}
      <div className="lg:col-span-5 h-full sticky top-28">
        <AnimatePresence mode="wait">
          {selectedNominee ? (
            <motion.div
              key={selectedNominee.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-zinc-900 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-6 text-left"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-900/60">Audit Workspace</span>
                  <h3 className="text-2xl font-black tracking-tight mt-3 text-white">{selectedNominee.nominate_name}</h3>
                  <p className="text-xs text-zinc-400 font-medium mt-1">Aspiring For: <span className="text-zinc-200 font-bold">{selectedNominee.category_name}</span></p>
                </div>
                <button onClick={() => setSelectedNominee(null)} className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="aspect-[16/10] bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/80 shadow-inner">
                <img 
                  src={selectedNominee.avatar_path ? `${selectedNominee.avatar_path}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500'} 
                  className="w-full h-full object-cover" 
                  alt="" 
                />
              </div>

              <div className="space-y-4 bg-zinc-950/40 p-4 border border-zinc-800/50 rounded-xl">
                <div>
                  <h5 className="text-[11px] uppercase font-black text-zinc-500 tracking-wider">Statement of Accomplishment</h5>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1.5">{selectedNominee.reason || 'No summary overview details specified on file.'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800/60">
                  <div>
                    <h5 className="text-[11px] uppercase font-black text-zinc-500 tracking-wider">Registered Email</h5>
                    <p className="text-xs text-zinc-200 truncate mt-1 font-mono">{selectedNominee.nominate_email}</p>
                  </div>
                  <div>
                    <h5 className="text-[11px] uppercase font-black text-zinc-500 tracking-wider">Cohort Cycle Placement</h5>
                    <p className="text-xs text-zinc-200 mt-1">Batch ID #{selectedNominee.election_cycle_id}</p>
                  </div>
                </div>
              </div>

              {/* 🚀 Critical Workflow Trigger Button Action CTA */}
              <Button
                variant="primary"
                onClick={() => handleApproveAndPublish(selectedNominee.id)}
                disabled={processingId === selectedNominee.id}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {processingId === selectedNominee.id ? (
                  <>Saving to active records...</>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Approve & Publish to Ballot Box
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <div className="h-64 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-zinc-50/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">No Dossier Open</p>
              <p className="text-[11px] text-zinc-400 max-w-[200px] mt-1">Select a candidate on the left to review their verification profile block attributes.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}