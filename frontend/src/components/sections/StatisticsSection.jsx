

/**
 * Statistics dashboard display section.
 */
export default function StatisticsSection() {
  const metrics = [
    {
      value: '18M+',
      label: 'Automated Container Builds',
      desc: 'Dockerized developer stacks built and registered on ECR repositories.'
    },
    {
      value: '99.999%',
      label: 'ALB Uptime Guarantee',
      desc: 'Multi-AZ load balancer routing structures keeping systems live.'
    },
    {
      value: '520K+',
      label: 'Devs Active Globally',
      desc: 'Teams containerizing, testing, and deploying workspace apps.'
    },
    {
      value: '<14ms',
      label: 'API Gateway Latency',
      desc: 'Hyper-fast response times forwarding incoming queries safely.'
    }
  ];

  return (
    <section className="py-6 section-black position-relative" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
            METRICS THAT MATTER
          </h6>
          <h2 className="display-6 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>
            Built for enterprise-grade throughputs
          </h2>
          <p className="text-gray" style={{ maxWidth: '580px', margin: '0 auto' }}>
            We monitor cluster scaling and deployment operations in real-time. Here is how our architecture performs.
          </p>
        </div>

        <div className="row g-4 mt-2">
          {metrics.map((m, idx) => (
            <div key={idx} className="col-lg-3 col-md-6">
              <div className="card saas-card text-center p-4 border-secondary border-opacity-10 h-100 bg-opacity-20">
                <div className="card-body p-0 d-flex flex-column justify-content-between h-100">
                  <div>
                    <h3 
                      className="display-5 fw-extrabold text-white mb-2" 
                      style={{ 
                        background: 'linear-gradient(135deg, #c084fc 0%, #818cf8 100%)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-1.5px'
                      }}
                    >
                      {m.value}
                    </h3>
                    <h6 className="text-white fw-bold small mb-3">{m.label}</h6>
                  </div>
                  <p className="text-gray small mb-0 lh-relaxed">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
