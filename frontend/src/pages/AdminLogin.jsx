import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import useToast from '../hooks/useToast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, skip login page
    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      showSuccess('Signed in successfully.');
      navigate('/admin/dashboard');
    } catch (err) {
      showError(err.message || 'Login failed. Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-theme="dark" className="position-relative overflow-hidden py-5 d-flex align-items-center justify-content-center section-black min-h-screen">
      {/* Decorative Glow Orbs */}
      <div className="glow-orb" style={{ width: '300px', height: '300px', background: 'var(--primary-glow)', top: '10%', left: '15%' }}></div>
      <div className="glow-orb" style={{ width: '250px', height: '250px', background: 'var(--secondary-glow)', bottom: '10%', right: '15%' }}></div>

      <div className="container position-relative z-1" style={{ maxWidth: '480px' }}>
        <div className="saas-card saas-card-glow p-4 p-md-5">
          <div className="text-center mb-4">
            <span className="badge bg-secondary mb-2 text-uppercase tracking-wider" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
              Console Access
            </span>
            <h2 className="text-white fw-bold mb-2">Admin Portal</h2>
            <p className="text-gray small">Sign in to manage contact inquiries and system options.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-gray small fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control form-input-saas"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-gray small fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-input-saas"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-saas-primary w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-shield-lock-fill"></i>
                  <span>Sign In as Admin</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 border-top border-muted pt-3">
            <p className="text-dark small mb-0">
              Only authorized staff can log in here. If you need support, contact system administration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
