

/**
 * Developer Benefits Section.
 */
export default function BenefitsSection() {
  const benefits = [
    {
      title: 'Zero Configuration Deployments',
      desc: 'Just push to your main branch. Our system handles container audits, environment validation, static bundlings, and boots your Express microservices without custom shell configurations.',
      bullet: '🚀 Git push to live in 20s'
    },
    {
      title: 'Pre-Audited Environment Files',
      desc: 'We validation check environment properties before spinning up active container instances. Stops syntax faults or missing secrets from breaking runtime operations.',
      bullet: '🔒 SOC2 standard variables isolation'
    },
    {
      title: 'Global High-Availability Parity',
      desc: 'Local developer stacks use the identical Docker orchestration models as AWS staging clusters, eliminating the "works on my machine" bug.',
      bullet: '🌐 Fully identical ECS Fargate networks'
    }
  ];

  return (
    <section id="benefits" className="py-6 section-slate position-relative" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="card saas-card p-4 border-secondary border-opacity-10 shadow-lg text-start">
              <div className="d-flex align-items-center gap-2 mb-4">
                <span className="d-inline-block rounded-circle bg-danger" style={{ width: '8px', height: '8px' }}></span>
                <span className="d-inline-block rounded-circle bg-warning" style={{ width: '8px', height: '8px' }}></span>
                <span className="d-inline-block rounded-circle bg-success" style={{ width: '8px', height: '8px' }}></span>
                <span className="text-gray small font-monospace ms-2">git-workflow.log</span>
              </div>
              
              <div className="font-monospace small text-white opacity-85 d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-3">
                  <span className="text-indigo-400">[12:00:01]</span>
                  <span>Commit <code className="bg-dark text-gradient-cyan px-2 py-0.5">feat/auth</code> pushed to origin/main</span>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <span className="text-indigo-400">[12:00:03]</span>
                  <span>GitHub workflow triggered: <span className="text-warning">lint & test</span></span>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <span className="text-indigo-400">[12:00:15]</span>
                  <span className="text-success">✔ All tests passed. Compilation verified.</span>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <span className="text-indigo-400">[12:00:16]</span>
                  <span>Initiating ECR Docker image build...</span>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <span className="text-indigo-400">[12:00:26]</span>
                  <span className="text-success">✔ ECS Fargate update rolling: 4 healthy nodes live.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-1 order-lg-2 text-start">
            <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
              DEVELOPER ADVANTAGE
            </h6>
            
            <h2 className="display-6 fw-extrabold text-white mb-4" style={{ letterSpacing: '-1px' }}>
              Designed to optimize <br /> engineering performance
            </h2>
            
            <p className="text-gray mb-5 fs-6 lh-relaxed">
              We remove the complexity of handcrafting Dockerfiles, setup scripts, and load balancer configurations, allowing you to focus on application code.
            </p>

            <div className="d-flex flex-column gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="d-flex align-items-start gap-3">
                  <div 
                    className="d-flex align-items-center justify-content-center text-success mt-1"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(52, 211, 153, 0.05)',
                      border: '1px solid rgba(52, 211, 153, 0.2)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <i className="bi bi-check2"></i>
                  </div>
                  <div>
                    <h6 className="text-white fw-bold mb-1">{benefit.title}</h6>
                    <p className="text-gray small mb-2">{benefit.desc}</p>
                    <span className="text-gradient-cyan fw-semibold small font-monospace">{benefit.bullet}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
