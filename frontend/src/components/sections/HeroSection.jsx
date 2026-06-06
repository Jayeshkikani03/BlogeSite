

/**
 * Modern SaaS Hero Section with statistics integration.
 */
export default function HeroSection() {
  const stats = [
    { value: '99.99%', label: 'SLA Uptime', icon: 'bi-shield-check' },
    { value: '14ms', label: 'Edge Latency', icon: 'bi-lightning' },
    { value: '12s', label: 'Average Build Time', icon: 'bi-stopwatch' },
    { value: '2.4M', label: 'Active Clusters', icon: 'bi-hdd-network' }
  ];

  return (
    <section 
      id="home" 
      className="position-relative overflow-hidden section-black d-flex align-items-center" 
      style={{ minHeight: '100vh', paddingTop: '130px', paddingBottom: '80px' }}
    >
      {/* Background Glow Orbs */}
      <div className="glow-orb" style={{ top: '-15%', left: '10%', width: '400px', height: '400px', background: 'rgba(99, 102, 241, 0.25)' }}></div>
      <div className="glow-orb" style={{ bottom: '10%', right: '5%', width: '500px', height: '500px', background: 'rgba(192, 132, 252, 0.2)' }}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center text-lg-start">
            <div className="d-inline-flex align-items-center gap-2 border border-secondary border-opacity-25 bg-secondary bg-opacity-10 text-white px-3 py-2 rounded-pill mb-4 small">
              <span className="badge bg-primary px-2 py-1" style={{ fontSize: '0.7rem' }}>NEW</span>
              <span className="opacity-75" style={{ fontSize: '0.85rem' }}>Global serverless orchestration is now in public beta</span>
            </div>

            <h1 className="display-4 fw-extrabold text-white mb-4 lh-sm" style={{ letterSpacing: '-1.5px' }}>
              The deployment engine <br />
              built for <span className="text-gradient">cloud scale</span>
            </h1>

            <p className="lead text-gray mb-5 fs-5 lh-relaxed" style={{ maxWidth: '540px' }}>
              Connect your Git repository, configure environment files, and spin up dockerized workspaces globally under AWS config structures in seconds.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
              <a href="#contact" className="btn btn-saas-primary btn-lg px-4 py-3 d-inline-flex align-items-center justify-content-center gap-2">
                <span>Deploy Free Stack</span>
                <i className="bi bi-chevron-right"></i>
              </a>
              <a href="#features" className="btn btn-saas-secondary btn-lg px-4 py-3">
                Explore Features
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="col-6">
                  <div className="card saas-card p-4 text-start border-secondary border-opacity-10 h-100">
                    <div className="card-body p-0">
                      <div 
                        className="d-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-muted)',
                          color: '#818cf8'
                        }}
                      >
                        <i className={`bi ${stat.icon} fs-5`}></i>
                      </div>
                      
                      <h2 className="display-6 fw-extrabold text-white mb-1" style={{ letterSpacing: '-1px' }}>
                        {stat.value}
                      </h2>
                      <p className="text-gray small fw-medium mb-0">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12 mt-4">
                <div className="card saas-card p-3 border-secondary border-opacity-10 font-monospace text-start bg-black bg-opacity-40" style={{ fontSize: '0.8rem' }}>
                  <div className="d-flex justify-content-between text-gray small border-bottom border-secondary border-opacity-10 pb-2 mb-2">
                    <span>⚡ deploy-status</span>
                    <span className="text-success">Connected</span>
                  </div>
                  <div className="text-gray">
                    <span className="text-success">$</span> npx techflow-cli init --app=techflow-landing <br />
                    <span className="text-indigo-400">» Building client-dist... verified (12s)</span> <br />
                    <span className="text-indigo-400">» Initializing Docker daemon... success</span> <br />
                    <span className="text-success">🎉 Active deployment: http://localhost:5173</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
