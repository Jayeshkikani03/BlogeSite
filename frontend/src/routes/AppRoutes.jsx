
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import SystemStatus from '../pages/SystemStatus';

/**
 * Global Routing definitions linking endpoints to client views.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/system-status" element={<SystemStatus />} />
      <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect fallback */}
    </Routes>
  );
}
