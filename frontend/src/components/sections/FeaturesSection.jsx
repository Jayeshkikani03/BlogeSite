

/**
 * Enterprise Features grid section.
 */
export default function FeaturesSection() {
  const features = [
    {
      icon: 'bi-box-seam',
      title: 'Docker Isolation',
      description: 'Run your frontend client and Express services inside isolated container tasks, ensuring environment parity from commit to deploy.'
    },
    {
      icon: 'bi-git',
      title: 'Git-Ops Continuous Integration',
      description: 'Connect repository hooks to validate commits automatically. Triggers tests, linters, and checks on every push request.'
    },
    {
      icon: 'bi-clouds',
      title: 'Multi-Region Routing',
      description: 'Host Docker containers serverlessly on AWS ECR & Fargate. Route traffic globally using load balancers.'
    },
    {
      icon: 'bi-cpu',
      title: 'Fast Vite Dev Engine',
      description: 'Boost developer output with instant hot module replacement. Compiled assets build into highly optimized static index bundles.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Secure Environment Maps',
      description: 'Validate environmental secrets out-of-the-box before compiling, avoiding production system token leaks.'
    },
    {
      icon: 'bi-diagram-3',
      title: 'Decoupled MVC Layout',
      description: 'Clean Node/Express backend folder structure separating router files, validators, controllers, and error catchers.'
    }
  ];

  return (
    <section id="features" className="py-6 section-black position-relative" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
            ENGINEERED FOR SCALING
          </h6>
          <h2 className="display-6 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>
            Everything you need for cloud deploys
          </h2>
          <p className="text-gray" style={{ maxWidth: '580px', margin: '0 auto' }}>
            Stop wasting time configuring complex cloud orchestrations manually. TechFlow pre-builds production-grade Docker pipelines.
          </p>
        </div>

        <div className="row g-4 mt-2">
          {features.map((feature, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="card saas-card h-100 p-4 border-secondary border-opacity-10 bg-opacity-30">
                <div className="card-body p-0 d-flex flex-column text-start">
                  <div 
                    className="d-flex align-items-center justify-content-center mb-4 text-indigo-300"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: 'rgba(129, 140, 248, 0.05)',
                      border: '1px solid rgba(129, 140, 248, 0.15)',
                      fontSize: '1.25rem'
                    }}
                  >
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  
                  <h5 className="card-title text-white fw-bold mb-2">{feature.title}</h5>
                  <p className="card-text text-gray small lh-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
