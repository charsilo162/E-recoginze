import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // 👈 Added useNavigate
import axiosClient from '../api/axiosClient';

export default function ClaimRewardFlow() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // 👈 Initialized routing router redirect tool
  const token = searchParams.get('token');

  const [step, setStep] = useState('verifying'); // verifying | auth | complete_profile | success
  const [nominationData, setNominationData] = useState(null);

  // Form states matching image_321a35.png
  const [formData, setFormData] = useState({
    age: '', 
    gender: 'Male', 
    nationality: 'Nigerian',
    state_of_origin: '', 
    address: '',
    achievement_year: '2026', 
    headline_achievement: ''
  });

  useEffect(() => {
    if (token) {
      axiosClient.get(`/nominations/verify/${token}`)
        .then(res => {
          setNominationData(res.data.data);
          
          // 🛡️ SMART CHECK: If they already have an active auth token in localStorage,
          // skip the login redirect and send them straight to Step 2 (complete_profile)!
          const hasToken = localStorage.getItem('auth_token');
          if (hasToken) {
            setStep('complete_profile');
          } else {
            setStep('auth'); 
          }
        })
        .catch(() => setStep('invalid_token'));
    }
  }, [token]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post(`/nominations/claim/${token}`, formData);
      setStep('success');
    } catch (err) {
      console.error(err);
    }
  };

  if (step === 'verifying') return <div className="p-8 text-center text-zinc-500 font-medium">Verifying secure token connection...</div>;
  if (step === 'invalid_token') return <div className="p-8 text-center text-red-500 font-bold">This token link is invalid or has expired.</div>;

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white shadow rounded-xl text-zinc-800">
      
      {/* 👑 STEP 1: Redirect to your brand new standalone Auth Page */}
      {step === 'auth' && (
        <div className="text-center space-y-5 py-6">
          <div className="text-4xl">🔒</div>
          <h3 className="font-black text-zinc-900 uppercase text-sm tracking-wide">Authentication Required</h3>
          <p className="text-zinc-600 text-xs max-w-md mx-auto leading-relaxed">
            Congratulations! You have been nominated for the <strong className="text-zinc-900">{nominationData?.category}</strong> category. 
            To protect your record identity, please sign in or register an account.
          </p>
          
          <button 
            onClick={() => navigate(`/auth?token=${token}`)} // 👈 Redirects safely with token attached!
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            Sign In / Create Account
          </button>
        </div>
      )}

      {/* 📝 STEP 2: Complete Extended Information (Matches image_321a35.png layout specs) */}
      {step === 'complete_profile' && (
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="bg-red-600 text-white font-bold uppercase tracking-wider text-center p-2 text-xs rounded">
            Confirm Your Onboarding Profile Details
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 font-bold">Age</label>
              <input type="number" required className="w-full border p-2 rounded text-sm outline-none focus:border-zinc-400" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 font-bold">Gender</label>
              <select className="w-full border p-2 rounded text-sm outline-none cursor-pointer" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 font-bold">Address</label>
            <input type="text" required className="w-full border p-2 rounded text-sm outline-none focus:border-zinc-400" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 font-bold">State</label>
              <input type="text" required className="w-full border p-2 rounded text-sm outline-none focus:border-zinc-400" value={formData.state_of_origin} onChange={e => setFormData({...formData, state_of_origin: e.target.value})} />
            </div>
            <div>
              <label className="text-xs text-zinc-500 font-bold">Nationality</label>
              <input type="text" required className="w-full border p-2 rounded text-sm outline-none focus:border-zinc-400" value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 font-bold">Headline Title (What did you create/invent?)</label>
            <input type="text" required placeholder="e.g., Created a drone that runs on air" className="w-full border p-2 rounded text-sm outline-none font-semibold focus:border-zinc-400" value={formData.headline_achievement} onChange={e => setFormData({...formData, headline_achievement: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 uppercase tracking-widest text-xs rounded shadow transition-colors">
            Save & Finalize Profile Launch
          </button>
        </form>
      )}

      {/* 🎉 STEP 3: Complete Success State Feedback UI */}
      {step === 'success' && (
        <div className="text-center space-y-4 py-8">
          <div className="text-4xl">🎉</div>
          <h2 className="text-xl font-black text-emerald-700 uppercase tracking-wide">Recognition Record Verified!</h2>
          <p className="text-zinc-600 text-xs">Your custom profile dashboard layout is ready and live.</p>
        </div>
      )}

    </div>
  );
}