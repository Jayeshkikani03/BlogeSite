
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import SystemStatus from '../pages/SystemStatus';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import authService from '../services/authService';

/**
 * Global Routing definitions linking endpoints to client views.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/system-status" element={<SystemStatus />} />
      <Route 
        path="/admin" 
        element={
          authService.isAuthenticated() ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        } 
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect fallback */}
    </Routes>
  );
}
