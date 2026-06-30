// src/routes/index.jsx
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../routes/ProtectedRoute';
import PublicLeaderboard from '../pages/PublicLeaderboard';
// Public Pages
import Home from '../pages/Home';
import AuthPage from '../pages/AuthPage';
import About from '../pages/About';
// ... other public imports

// Protected Pages
import Reward from '../pages/Reward';
import BallotListing from '../pages/BallotListing';
import ElectionCycleDashboard from '../pages/admin/ElectionCycleDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
// ... etc

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* ... */}
      </Route>

      {/* PROTECTED DASHBOARD ROUTES */}
      <Route element={<DashboardLayout />}>
        {/* <Route path="/dashboard" element={<DashboardHome />} /> */}
        <Route path="/vote" element={<BallotListing />} />
        <Route path="/leaderboard" element={<PublicLeaderboard />} />
        <Route path="/reward" element={<Reward />} />

        {/* Admin-only sub-routes */}
        <Route
          path="/admin/shortlist-queue"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ShortlistQueue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/standings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/electioncycle"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ElectionCycleDashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}