import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCycleStore } from '../../store/useCycleStore';
import  {Card } from '../../components/ui/Card';

export default function ElectionCycleDashboard() {
  const { cycles, activeCycle, fetchCycles, createNextBatch, terminateActiveBatch, loadingCycles } = useCycleStore();
  
  const [formData, setFormData] = useState({ name: '', starts_at: '', ends_at: '' });
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCycles();
  }, [fetchCycles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert({ type: '', message: '' });

    const result = await createNextBatch(formData);
    setSubmitting(false);

    if (result.success) {
      setAlert({ type: 'success', message: result.message });
      setFormData({ name: '', starts_at: '', ends_at: '' });
    } else {
      setAlert({ type: 'error', message: result.message });
    }
  };

  const handleForceStop = async (id) => {
    if (window.confirm("Are you absolutely sure you want to stop this batch prematurely? This will seal the ballot box immediately.")) {
      await terminateActiveBatch(id);
      setAlert({ type: 'success', message: 'The active election batch was successfully closed out and archived.' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-32 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Title Heading Context Row */}
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">Election Control Panel</h1>
          <p className="text-sm text-zinc-500 mt-1 font-medium">Initialize new award cycles, establish countdown configurations, or force seal active pools.</p>
        </div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {alert.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`p-4 rounded-xl text-xs font-bold border ${
                alert.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              {alert.type === 'success' ? '✓ ' : '✕ '} {alert.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1 & 2: Form Creator & Status Blocks */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Monitoring Card Block */}
            <Card className="p-6 border-zinc-200 bg-white">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Live Running State Target</h2>
              {activeCycle ? (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900 text-white rounded-2xl p-6 border border-zinc-800 shadow-xl">
                  <div>
                    <span className="text-[9px] bg-amber-500 text-zinc-950 font-black tracking-widest uppercase px-2 py-0.5 rounded">Active Phase</span>
                    <h3 className="text-xl font-black mt-2 tracking-tight">{activeCycle.name}</h3>
                    <p className="text-zinc-400 text-xs mt-1 font-medium">
                      Window expires: <span className="text-zinc-200 font-bold">{new Date(activeCycle.ends_at).toLocaleString()}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleForceStop(activeCycle.id)}
                    className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] uppercase tracking-wider px-5 py-3 rounded-xl transition-colors shadow-lg shadow-rose-950/20 flex-shrink-0"
                  >
                    Force Seal Ballot Box
                  </button>
                </div>
              ) : (
                <div className="border border-dashed border-zinc-200 rounded-2xl p-8 text-center bg-zinc-50/50">
                  <p className="text-zinc-400 font-bold text-sm">No active voting sessions running right now.</p>
                  <p className="text-zinc-400 text-xs mt-1">Fill out the creation sequence below to spin up the next cohort phase.</p>
                </div>
              )}
            </Card>

            {/* Launch New Batch Cycle Form */}
            <Card className="p-6 md:p-8 border-zinc-200 bg-white shadow-sm">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6">Deploy Next Election Sequence</h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Cycle Batch Title Identifier</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Q3 Peer Validation Session, Cohort 2026 Phase"
                    className="w-full bg-white border border-zinc-200 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:border-zinc-400 text-zinc-800 transition-colors shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Execution Starts At</label>
                    <input
                      type="datetime-local"
                      name="starts_at"
                      required
                      value={formData.starts_at}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-zinc-200 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:border-zinc-400 text-zinc-800 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Automated Expiration Lock Time</label>
                    <input
                      type="datetime-local"
                      name="ends_at"
                      required
                      value={formData.ends_at}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-zinc-200 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:border-zinc-400 text-zinc-800 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-colors shadow-md disabled:opacity-50"
                  >
                    {submitting ? 'Deploying Node Systems...' : 'Initialize & Deploy Cycle'}
                  </button>
                </div>
              </form>
            </Card>

          </div>

          {/* Column 3: Historical Audit Timeline Track logs */}
          <div className="space-y-4">
            <Card className="p-6 border-zinc-200 bg-white shadow-sm max-h-[660px] overflow-y-auto">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Historical Audit Tree Logs</h2>
              
              {loadingCycles ? (
                <div className="text-center text-xs font-bold py-6 text-zinc-400 animate-pulse">Syncing chronological lists...</div>
              ) : (
                <div className="space-y-3">
                  {cycles.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-extrabold text-zinc-800 truncate max-w-[150px]">{item.name}</span>
                        <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[10px] font-medium text-zinc-400">
                        {new Date(item.starts_at).toLocaleDateString()} — {new Date(item.ends_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}