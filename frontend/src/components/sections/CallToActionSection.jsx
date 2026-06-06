import React from 'react';

/**
 * Call To Action signup banner section.
 */
export default function CallToActionSection() {
  return (
    <section className="py-6 section-black position-relative overflow-hidden" style={{ padding: '100px 0' }}>
      {/* Background glow orb */}
      <div 
        className="glow-orb" 
        style={{ 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '600px', 
          height: '250px', 
          background: 'rgba(129, 140, 248, 0.15)' 
        }}
      ></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="saas-card saas-card-glow p-5 text-center border-secondary border-opacity-10 bg-opacity-20 max-w-4xl mx-auto">
          <div className="py-4">
            <h2 className="display-5 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>
              Ready to accelerate your <br />
              <span className="text-gradient">deployment workflows?</span>
            </h2>
            
            <p className="text-gray mb-5 fs-5 mx-auto" style={{ maxWidth: '600px' }}>
              Boot up pre-configured Docker containers, continuous integration parameters, and AWS ECS structures in seconds.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <a href="#contact" className="btn btn-saas-primary btn-lg px-4 py-3">
                Deploy Free Cluster
              </a>
              <a href="#features" className="btn btn-saas-secondary btn-lg px-4 py-3">
                Read Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
