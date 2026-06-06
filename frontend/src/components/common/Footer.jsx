
import { Link } from 'react-router-dom';

/**
 * Enterprise SaaS Footer component.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-top section-black" style={{ borderTopColor: 'var(--border-muted) !important' }}>
      <div className="container py-5">
        <div className="row g-5 justify-content-between text-start">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <div 
                className="d-flex align-items-center justify-content-center me-2 text-black fw-extrabold"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'var(--primary-glow)',
                  fontSize: '0.95rem'
                }}
              >
                TF
              </div>
              <span className="fw-bold text-white fs-5" style={{ letterSpacing: '-0.5px' }}>
                Tech<span className="text-gradient">Flow</span>
              </span>
            </div>
            <p className="text-gray small lh-relaxed mb-4" style={{ color: '#94a3b8' }}>
              Scale microservices serverlessly on AWS ECS clusters. Optimize delivery speed using automated continuous container integration pipelines.
            </p>
            
            <div className="d-flex gap-3">
              <a href="https://github.com" className="text-gray hover-white transition-smooth fs-5" aria-label="GitHub Repository">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://twitter.com" className="text-gray hover-white transition-smooth fs-5" aria-label="Twitter Account">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://linkedin.com" className="text-gray hover-white transition-smooth fs-5" aria-label="LinkedIn Profile">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3 small tracking-wider uppercase">Product</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="/#features" className="text-gray text-decoration-none hover-white">Features</a></li>
              <li><a href="/#benefits" className="text-gray text-decoration-none hover-white">Benefits</a></li>
              <li><a href="/#pricing" className="text-gray text-decoration-none hover-white">Pricing</a></li>
              <li><Link to="/system-status" className="text-gray text-decoration-none hover-white">System Status</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3 small tracking-wider uppercase">Resources</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#home" className="text-gray text-decoration-none hover-white">Guides</a></li>
              <li><a href="#features" className="text-gray text-decoration-none hover-white">Templates</a></li>
              <li><a href="#home" className="text-gray text-decoration-none hover-white">API Docs</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3 small tracking-wider uppercase">Stay Connected</h6>
            <p className="text-gray small lh-relaxed mb-3">Sign up for developer notifications and patch updates.</p>
            <form onSubmit={(e) => e.preventDefault()} aria-label="Newsletter Subscription Form" className="d-flex gap-2">
              <label htmlFor="newsletter-email" className="visually-hidden">Email Address</label>
              <input 
                type="email" 
                id="newsletter-email"
                className="form-control form-input-saas py-2 text-xs" 
                placeholder="developer@techflow.io" 
                required 
              />
              <button className="btn btn-saas-primary px-3 py-2" type="submit" aria-label="Subscribe to newsletter">
                <i className="bi bi-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>

        <hr className="my-5 border-secondary border-opacity-10" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-gray small mb-0">
            &copy; {currentYear} TechFlow Landing Platform. Constructed to SOC2 and accessibility design guidelines.
          </p>
          <div className="d-flex gap-4 small">
            <a href="#home" className="text-gray text-decoration-none hover-white">Privacy Policy</a>
            <a href="#home" className="text-gray text-decoration-none hover-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
