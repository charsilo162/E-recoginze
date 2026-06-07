import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/authService';

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check if there's a redirection parameter (e.g., claiming a nomination link)
  const tokenRedirect = searchParams.get('token');

  // Page view configuration state ('login' | 'register')
  const [mode, setMode] = useState('login');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Unified Form Data State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (mode === 'register') {
        // Simple client-side match protection check
        if (formData.password !== formData.password_confirmation) {
          setErrors({ password_confirmation: ['The passwords do not match.'] });
          setLoading(false);
          return;
        }
        
        await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      } else {
        await authService.login({
          email: formData.email,
          password: formData.password
        });
      }

      // Route management after successful authentication
      if (tokenRedirect) {
        navigate(`/claim-reward?token=${tokenRedirect}`);
      } else {
        navigate('/dashboard'); // Fallback standard system dashboard
      }
    } catch (err) {
      // Catch validation messages returned from Laravel Form Request classes
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ general: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-zinc-950 text-zinc-100">
      
      {/* Left Column: Visual Brand Content Branding (Hidden on Small Screens) */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-slate-950 border-r border-zinc-800">
        <div className="absolute inset-0 bg-[url('/images/crowd-texture.jpg')] opacity-5 mix-blend-overlay" />
        
        <div className="relative z-10 flex items-center gap-2 font-black tracking-wider text-amber-500 text-lg">
          👑 E-RECOGNIZE
        </div>

        <div className="relative z-10 max-w-md space-y-4">
          <h1 className="text-4xl font-black text-white leading-tight">
            Validating Global Excellence and Historic Exploits.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Join the elite network tracking verified achievements, community impact, and historic industrial milestones transparently.
          </p>
        </div>

        <div className="relative z-10 text-xs text-zinc-500">
          © 2026 E-Recognize Platform. All Rights Reserved.
        </div>
      </div>

      {/* Right Column: Dynamic Form Container UI */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 bg-zinc-900/40">
        <div className="mx-auto w-full max-w-sm space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-black tracking-tight text-white">
              {mode === 'login' ? 'Sign in to account' : 'Create your account'}
            </h2>
            <p className="mt-2 text-xs text-zinc-400 font-medium">
              {mode === 'login' ? "Don't have an account? " : "Already registered? "}
              <button 
                type="button"
                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrors({}); }}
                className="text-amber-500 hover:text-amber-400 font-bold transition-colors underline underline-offset-4"
              >
                {mode === 'login' ? 'Register here' : 'Sign in here'}
              </button>
            </p>
          </div>

          {errors.general && (
            <div className="p-3.5 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs font-semibold">
              ⚠️ {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 block">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 p-3 rounded-xl outline-none text-sm text-white transition-colors"
                />
                {errors.name && <p className="text-red-500 text-[11px] font-medium">{errors.name[0]}</p>}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 block">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 p-3 rounded-xl outline-none text-sm text-white transition-colors"
              />
              {errors.email && <p className="text-red-500 text-[11px] font-medium">{errors.email[0]}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 block">Password</label>
              <input 
                type="password" 
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 p-3 rounded-xl outline-none text-sm text-white transition-colors"
              />
              {errors.password && <p className="text-red-500 text-[11px] font-medium">{errors.password[0]}</p>}
            </div>

            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 block">Confirm Password</label>
                <input 
                  type="password" 
                  name="password_confirmation"
                  required
                  placeholder="••••••••"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 p-3 rounded-xl outline-none text-sm text-white transition-colors"
                />
                {errors.password_confirmation && <p className="text-red-500 text-[11px] font-medium">{errors.password_confirmation[0]}</p>}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold uppercase tracking-widest py-3.5 rounded-xl text-xs shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              {loading ? 'Processing Context...' : mode === 'login' ? 'Sign In Securely' : 'Complete Registration'}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}