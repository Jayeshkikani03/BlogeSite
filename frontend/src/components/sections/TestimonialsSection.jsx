import React from 'react';

/**
 * Testimonials grid section.
 */
export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'VP of Engineering',
      company: 'CloudScale Inc.',
      avatarColor: '#818cf8',
      avatarText: 'SJ',
      rating: 5,
      quote: "TechFlow's dockerized blueprints transformed our local developer environment. Setting up continuous deployments for our AWS staging accounts now takes us minutes instead of days of custom script writing."
    },
    {
      name: 'Marcus Chen',
      role: 'Technical Co-founder',
      company: 'SaaSFlow Technologies',
      avatarColor: '#c084fc',
      avatarText: 'MC',
      rating: 5,
      quote: 'The clean MVC directory layout, predefined routing layers, and secure environment configuration gave us a massive head start. It is ready for continuous testing and container isolation right out of the box.'
    },
    {
      name: 'Elena Rostova',
      role: 'Principal DevOps Architect',
      company: 'AlphaOps Labs',
      avatarColor: '#fda4af',
      avatarText: 'ER',
      rating: 5,
      quote: 'Building production-grade stacks usually requires endless tweaks in Dockerfiles and GitHub scripts. TechFlow provided absolute consistency. Running the backend and Vite frontend locally felt incredibly smooth.'
    }
  ];

  return (
    <section id="testimonials" className="py-6 section-black position-relative" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
            ENGINEER ENDORSEMENTS
          </h6>
          <h2 className="display-6 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>
            Validated by developers
          </h2>
          <p className="text-gray" style={{ maxWidth: '580px', margin: '0 auto' }}>
            See how solution architects, system builders, and teams are boosting delivery speed.
          </p>
        </div>

        <div className="row g-4 mt-2">
          {testimonials.map((t, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="card saas-card h-100 p-4 border-secondary border-opacity-10 bg-opacity-30">
                <div className="card-body p-0 d-flex flex-column text-start justify-content-between">
                  <div>
                    <div className="d-flex gap-1 mb-3 text-warning">
                      {[...Array(t.rating)].map((_, starIdx) => (
                        <i key={starIdx} className="bi bi-star-fill" style={{ fontSize: '0.85rem' }}></i>
                      ))}
                    </div>

                    <p className="card-text text-white opacity-85 small lh-relaxed fst-italic mb-4">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="d-flex align-items-center mt-3 pt-3 border-top border-secondary border-opacity-10">
                    <div 
                      className="d-flex align-items-center justify-content-center me-3 text-black fw-bold"
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: t.avatarColor,
                        fontSize: '0.9rem'
                      }}
                    >
                      {t.avatarText}
                    </div>
                    <div>
                      <h6 className="text-white fw-bold mb-0" style={{ fontSize: '0.9rem' }}>{t.name}</h6>
                      <span className="text-gray small" style={{ fontSize: '0.75rem' }}>
                        {t.role}, <span className="text-gradient fw-semibold">{t.company}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
