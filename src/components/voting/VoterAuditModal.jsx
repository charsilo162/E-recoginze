import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient'; // 🔑 FIXED: Added the missing axios import statement

export default function VoterAuditModal({ nominationId, nomineeName, onClose }) {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nominationId) {
      setLoading(true); // Reset loading state when target changes
      axiosClient.get(`/admin/nominees/${nominationId}/voters`)
        .then(res => setVoters(res.data.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [nominationId]);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl flex flex-col max-h-[80vh]">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="font-black text-slate-900 text-lg">Voter Audit List</h3>
            <p className="text-xs text-slate-400 font-medium">Verified votes cast for <span className="text-amber-600 font-semibold">{nomineeName}</span></p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors font-bold text-sm bg-slate-100 w-7 h-7 rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Modal Body / Voters Feed List */}
        <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-thin">
          {loading ? (
            <div className="text-center text-sm text-slate-400 p-8 font-medium animate-pulse">
              Analyzing ballot records...
            </div>
          ) : voters.length === 0 ? (
            <div className="text-center text-sm text-slate-400 p-8 border border-dashed border-slate-200 rounded-xl">
              No verified votes recorded yet for this nominee.
            </div>
          ) : (
            voters.map((v, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs hover:border-slate-200 transition-colors">
                <div>
                  <p className="font-bold text-slate-800">{v.voter_name}</p>
                  <p className="text-slate-400 mt-0.5">{v.voter_email}</p>
                </div>
                <span className="text-slate-400 font-medium bg-white px-2 py-1 rounded-md border border-slate-100">
                  {v.voted_at}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}