
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SystemStatus from '../pages/SystemStatus';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import BlogPage from '../pages/BlogPage';
import BlogDetailPage from '../pages/BlogDetailPage';
import FeaturesPage from '../pages/FeaturesPage';
import NotFoundPage from '../pages/NotFoundPage';
import authService from '../services/authService';
import { useLocation } from 'react-router-dom';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-fade-in">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={authService.isAuthenticated() ? <AdminDashboard /> : <AdminLogin />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

/**
 * Global Routing definitions linking endpoints to client views.
 */
export default function AppRoutes() {
  return <AnimatedRoutes />;
}

