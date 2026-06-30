import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/navigation';

// Layout Frames
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Access Gateway Route Guard
import ProtectedRoute from './routes/ProtectedRoute';

// Application Feature Workspace Interfaces
import Home from './pages/Home';
import About from './pages/About';
import HonoreeDetail from './pages/HonoreeDetail';
import AuthPage from './pages/AuthPage';
import ClaimRewardFlow from './pages/ClaimRewardFlow';
import Reward from './pages/Reward';
import BallotListing from './pages/BallotListing';
import PublicLeaderboard from './pages/PublicLeaderboard';
import ElectionCycleDashboard from './pages/admin/ElectionCycleDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ShortlistManager from './pages/ShortlistManager';
export default function App() {
  return (
    <Routes>
      
      {/* ==========================================
          CHANNEL 1: PUBLIC VIEWPORT LAYER
         ========================================== */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.HONOREE} element={<HonoreeDetail />} />
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route path={ROUTES.CLAIM_REWARD} element={<ClaimRewardFlow />} />
      </Route>

      {/* ==========================================
          CHANNEL 2: SECURED CORE APPLICATION ENVIRONMENT
         ========================================== */}
      <Route 
        element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Shared Base Interactive Panels */}
        <Route path={ROUTES.DASHBOARD} element={<Reward />} />
        <Route path={ROUTES.VOTE} element={<BallotListing />} />
        <Route path={ROUTES.LEADERBOARD} element={<PublicLeaderboard />} />

        {/* Locked Administrative Action Panels */}
        <Route 
          path={ROUTES.ADMIN_QUEUE} 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Reward />
            </ProtectedRoute>
          } 
        />
        <Route path={ROUTES.ADMIN_SHORTLIST} element={<ShortlistManager />} />
        <Route 
          path={ROUTES.ADMIN_STANDINGS} 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={ROUTES.ELECTION_CYCLE} 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ElectionCycleDashboard />
            </ProtectedRoute>
          } 
        />
      </Route>

    </Routes>
  );
}