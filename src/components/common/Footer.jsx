import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-8 text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Core Description Module */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              E
            </div>
            <span className="font-extrabold text-base tracking-tight text-zinc-900">
              E-RECOGNIZE
            </span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            The premier verification framework for exceptional human exploits, societal contributions, and ancestral heritage mapping. Fully secure, compliant, and decentralized.
          </p>
        </div>

        {/* Dynamic Column Matrices */}
        <div>
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">Platform Utilities</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-orange-600 transition-colors">Registry Directory</Link></li>
            <li><Link to="/reward" className="hover:text-orange-600 transition-colors">Reward Allocation Hub</Link></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition-colors">Voting Node Status</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">Documentation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><span className="cursor-pointer hover:text-orange-600 transition-colors">Verification APIs</span></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition-colors">Governance Rules</span></li>
            <li><span className="cursor-pointer hover:text-orange-600 transition-colors">Terms of Compliance</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">Support & Contact</h4>
          <p className="text-sm text-zinc-500 mb-2">Need verification lookup assistance?</p>
          <span className="text-sm font-bold text-zinc-900 hover:underline cursor-pointer">
            support@e-recognize.org
          </span>
        </div>

      </div>

      {/* Underline Copyright Metadata Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
        <p>&copy; {currentYear} E-RECOGNIZE Systems Inc. All rights reserved globally.</p>
        <div className="flex gap-6">
          <span className="hover:underline cursor-pointer">Privacy Protocol</span>
          <span className="hover:underline cursor-pointer">Security Ledger</span>
        </div>
      </div>
    </footer>
  );
}