import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ballotService } from '../services/ballotService'; // 👈 Centralized Axios Service Layer Hook

export default function HonoreeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await ballotService.getHonoreeProfile(id);
        if (result.status === 'success') {
          setProfile(result.data);
        } else {
          navigate('/vote');
        }
      } catch (err) {
        console.error("Failed to hydrate profile details:", err.message);
        //navigate('/vote');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, navigate]);

  const handleVoteDirectly = async () => {
    if (profile?.status !== 'shortlisted') return; // Fail-safe check
    
    setVoting(true);
    try {
      const result = await ballotService.castVote(id);
      if (result.status === 'success') {
        alert("Vote securely added!");
        setProfile(prev => ({ ...prev, votes_count: prev.votes_count + 1 }));
      } else {
        alert(result.message || "Could not complete vote.");
      }
    } catch (err) {
      alert(err.message || "Transactional communication issue.");
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 space-y-6 animate-pulse">
        <div className="h-64 bg-zinc-100 rounded-3xl" />
        <div className="h-8 bg-zinc-200 rounded w-1/3" />
        <div className="h-24 bg-zinc-100 rounded" />
      </div>
    );
  }

  // Determine configuration details based on active payload parameters
  const isShortlisted = profile.status === 'shortlisted';

  return (
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Return to Ballot View Registry
        </button>

        {/* Profile Card Workspace Frame */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
          
          {/* Media / Asset Avatar Block */}
          <div className="md:col-span-5 bg-zinc-950 aspect-[4/5] md:aspect-auto relative min-h-[380px]">
            <img 
              src={profile.avatar_path ? `${profile.avatar_path}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'} 
              className="w-full h-full object-cover opacity-90"
              alt={profile.nominate_name}
            />
            
            {/* Dynamic Operational Workflow Tag Layout badges */}
            <div className="absolute top-4 left-4">
              {isShortlisted ? (
                <span className="text-[10px] tracking-wider uppercase font-black px-2.5 py-1 bg-emerald-500 text-zinc-950 rounded-md shadow-sm">
                  Shortlisted Contender
                </span>
              ) : (
                <span className="text-[10px] tracking-wider uppercase font-black px-2.5 py-1 bg-amber-500 text-zinc-950 rounded-md shadow-sm">
                  Pending Verification Approval
                </span>
              )}
            </div>
          </div>

          {/* Dossier Text Field Attributes */}
          <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{profile.category_name}</span>
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight mt-1">{profile.nominate_name}</h1>
                <p className="text-xs text-zinc-400 font-mono mt-1">Global ID: #{profile.id}-CYCLE{profile.election_cycle_id}</p>
              </div>

              <hr className="border-zinc-100" />

              <div className="space-y-2">
                <h4 className="text-[11px] uppercase font-black tracking-wider text-zinc-400">Statement of Meritorious Impact</h4>
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  {profile.reason || "No written statement on file for this candidate cycle."}
                </p>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">Current Standing</span>
                  <span className="text-xl font-black text-zinc-900 mt-0.5 block">{profile.votes_count} Votes</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">Verification Check</span>
                  {isShortlisted ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-md inline-block mt-1">
                      ✓ Vetted Core Pass
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-md inline-block mt-1">
                      ⟳ Staging Queue Audit
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Interactive Call To Action Section Block */}
            <div className="pt-8 mt-8 border-t border-zinc-100">
              {isShortlisted ? (
                <Button
                  variant="primary"
                  disabled={voting}
                  onClick={handleVoteDirectly}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2"
                >
                  {voting ? 'Submitting Ballot Stamp...' : 'Cast Official Vote For This Profile'}
                </Button>
              ) : (
                <div className="p-4 text-center rounded-xl bg-zinc-50 border border-zinc-200/60">
                  <p className="text-xs font-semibold text-zinc-500">
                    🔒 Voting functionality is disabled until administrative curation verification reviews conclude.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}