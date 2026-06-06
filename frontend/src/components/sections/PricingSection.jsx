

/**
 * Premium SaaS Pricing models in INR with Most Popular badge and check systems.
 */
export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '₹499',
      period: 'month',
      desc: 'Ideal for independent developers hosting personal projects.',
      features: [
        '5 active pipelines',
        'Standard Docker configs',
        'GitHub Actions continuous checks',
        'Standard community support',
        'Shared routing gateway'
      ],
      highlight: false,
      badge: '',
      cta: 'Start Starter Plan'
    },
    {
      name: 'Professional',
      price: '₹1,499',
      period: 'month',
      desc: 'Perfect for production services requiring automated builds.',
      features: [
        'Includes all Starter features',
        'Unlimited active pipelines',
        'Custom production Docker files',
        'AWS ECS & Fargate templates',
        'Priority Slack developer support',
        'Dedicated secure routing proxy'
      ],
      highlight: true,
      badge: 'Most Popular',
      cta: 'Go Professional'
    },
    {
      name: 'Business',
      price: '₹4,999',
      period: 'month',
      desc: 'Best for engineering teams seeking container isolation.',
      features: [
        'Includes all Professional features',
        'Multi-region cluster setups',
        'Custom CI/CD runner pools',
        'Dedicated Solutions Architect',
        'BI-weekly security configuration checks',
        'SLA guaranteed 99.99% uptime'
      ],
      highlight: false,
      badge: '',
      cta: 'Go Business'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored',
      desc: 'For organizations demanding custom AWS integrations.',
      features: [
        'Includes all Business features',
        'Dedicated VPC container isolation',
        'Single Sign-On (SSO) integration',
        '24/7 dedicated paging support',
        'Custom contract & payment terms',
        'Custom legal & security reviews'
      ],
      highlight: false,
      badge: '',
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing" className="py-6 section-slate position-relative" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
            PRICING OPTIONS
          </h6>
          <h2 className="display-6 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>
            Scale at your own pace
          </h2>
          <p className="text-gray" style={{ maxWidth: '580px', margin: '0 auto' }}>
            Simple, predictable pricing plans designed for devs and scale-ups. No hidden platform fees.
          </p>
        </div>

        <div className="row g-4 mt-2 justify-content-center">
          {plans.map((plan, idx) => (
            <div key={idx} className="col-xl-3 col-md-6">
              <div 
                className={`card saas-card h-100 p-4 border-secondary border-opacity-10 bg-opacity-30 position-relative ${
                  plan.highlight ? 'saas-card-glow border-purple' : ''
                }`}
              >
                {plan.badge && (
                  <span 
                    className="position-absolute top-0 start-50 translate-middle badge pricing-popular-badge px-3 py-2"
                  >
                    {plan.badge}
                  </span>
                )}
                
                <div className="card-body p-0 d-flex flex-column justify-content-between text-start h-100">
                  <div>
                    <h4 className="text-white fw-bold mb-2">{plan.name}</h4>
                    <p className="text-gray small mb-4 lh-base" style={{ minHeight: '40px' }}>{plan.desc}</p>
                    
                    <div className="d-flex align-items-baseline mb-4">
                      <span className="display-6 fw-extrabold text-white">{plan.price}</span>
                      {plan.price !== 'Custom' && (
                        <span className="text-gray ms-2">/ {plan.period}</span>
                      )}
                    </div>

                    <hr className="border-secondary border-opacity-10 mb-4" />

                    <ul className="list-unstyled mb-5 d-flex flex-column gap-3 small">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="d-flex align-items-start text-white opacity-85">
                          <i className="bi bi-check2 text-success me-2 fs-5 mt-0.5"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a 
                    href="#contact" 
                    className={`btn w-100 py-3 mt-auto ${
                      plan.highlight 
                        ? 'btn-saas-primary' 
                        : 'btn-saas-secondary'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
