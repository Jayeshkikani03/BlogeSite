import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="page-fade-in d-flex align-items-center justify-content-center section-black" style={{ minHeight: '100vh' }}>
      <div className="text-center px-4">
        <div className="glow-orb" style={{ top: '30%', left: '40%', width: '400px', height: '300px', background: 'rgba(99,102,241,0.15)' }}></div>
        <h1 className="fw-extrabold text-white mb-2" style={{ fontSize: '8rem', letterSpacing: '-4px', lineHeight: 1 }}>
          4<span className="text-gradient">0</span>4
        </h1>
        <p className="text-gray fs-5 mb-4">This page doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-saas-primary px-4 py-3">
          <i className="bi bi-house-fill me-2"></i>Back to Home
        </Link>
      </div>
    </section>
  );
}
