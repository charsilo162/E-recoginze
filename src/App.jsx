import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HonoreeDetail from './pages/HonoreeDetail';
import Home from './pages/Home';
import Reward from './pages/Reward'; 
import AuthPage from './pages/AuthPage';
import ClaimRewardFlow from './pages/ClaimRewardFlow';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-zinc-900 selection:bg-orange-500/20 flex flex-col">
      {/* 1. Sticky Navigation mounted globally */}
      <Navbar />
      
      {/* 2. Primary Layout Render Block */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reward" element={<Reward />} /> 
          <Route path="/honoree/:id" element={<HonoreeDetail />} />
          {/* Authentication Gateway Page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Claim Verification Dynamic Page */}
        <Route path="/claim-reward" element={<ClaimRewardFlow />} />
        </Routes>
      </main>
      
      {/* 3. Global Structural Footer */}
      <Footer />
    </div>
  );
}

export default App;