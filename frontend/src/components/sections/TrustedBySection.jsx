import React from 'react';

/**
 * Trusted By Section displaying corporate partner logos.
 */
export default function TrustedBySection() {
  return (
    <section className="py-5 border-top border-bottom border-secondary border-opacity-10 section-black">
      <div className="container">
        <p className="text-center text-uppercase text-gray small fw-bold tracking-wider mb-4" style={{ letterSpacing: '1.5px', fontSize: '0.75rem' }}>
          TRUSTED BY MODERN ENGINEERING TEAMS WORLDWIDE
        </p>
        
        <div className="row g-4 align-items-center justify-content-center text-center">
          <div className="col-4 col-md-2 d-flex justify-content-center">
            <div className="partner-logo d-flex align-items-center gap-1 text-white fw-bold fs-5">
              <svg width="24" height="24" viewBox="0 0 76 65" fill="currentColor">
                <path d="M37.5273 0L75.0546 65H0L37.5273 0Z" />
              </svg>
              <span>Vercel</span>
            </div>
          </div>
          
          <div className="col-4 col-md-2 d-flex justify-content-center">
            <div className="partner-logo d-flex align-items-center gap-1 text-white fw-bold fs-4 font-monospace">
              <span>stripe</span>
            </div>
          </div>
          
          <div className="col-4 col-md-2 d-flex justify-content-center">
            <div className="partner-logo d-flex align-items-center gap-2 text-white fw-bold fs-5">
              <div 
                className="rounded-circle"
                style={{
                  width: '18px',
                  height: '18px',
                  background: 'linear-gradient(135deg, #c084fc 0%, #818cf8 100%)'
                }}
              ></div>
              <span>Linear</span>
            </div>
          </div>
          
          <div className="col-4 col-md-2 d-flex justify-content-center">
            <div className="partner-logo d-flex align-items-center gap-1 text-white fw-semibold fs-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span>Render</span>
            </div>
          </div>
          
          <div className="col-4 col-md-2 d-flex justify-content-center">
            <div className="partner-logo d-flex align-items-center gap-1 text-white fw-bold fs-5">
              <i className="bi bi-github fs-4"></i>
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
