import { useState } from 'react';

/**
 * Custom interactive FAQ Section.
 */
export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: 'Does TechFlow support database containerization out of the box?',
      a: 'Yes. Our local setup and Docker compose blueprints contain optional configurations to hook up database instances, matching environment variables between local services and AWS staging servers.'
    },
    {
      q: 'Can I change the default frontend and API server ports?',
      a: 'Absolutely. All ports are centralized in environment variables. You can easily adjust the backend server port in backend/.env and update the VITE_API_URL parameter in frontend/.env.'
    },
    {
      q: 'How does TechFlow prevent configuration parameters from leaking?',
      a: 'We implement standard client variable screening. Vite only loads environment configurations starting with the VITE_ prefix. All other system keys (e.g. system credentials) remain strictly invisible to frontends.'
    },
    {
      q: 'Is this blueprint prepared for automated CI/CD checks?',
      a: 'Yes. The root workspace contains instructions and workflows templates for GitHub Actions to compile static assets, run linters, audit Docker files, and deploy to ECR repositories automatically.'
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-6 section-slate position-relative" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
            QUESTIONS & ANSWERS
          </h6>
          <h2 className="display-6 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray" style={{ maxWidth: '580px', margin: '0 auto' }}>
            Everything you need to know about the TechFlow platform infrastructure and workflows.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`faq-accordion-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleToggle(index)}
                    role="button"
                    tabIndex="0"
                    aria-expanded={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggle(index);
                      }
                    }}
                  >
                    <div className="faq-accordion-header d-flex justify-content-between align-items-center text-white text-start">
                      <span>{faq.q}</span>
                      <i className={`bi ${isActive ? 'bi-dash-lg' : 'bi-plus-lg'} text-indigo-400 ms-3`}></i>
                    </div>
                    <div 
                      className="faq-accordion-content text-start"
                      style={{
                        maxHeight: isActive ? '200px' : '0',
                        transition: 'max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <div className="p-4 pt-0 text-gray small lh-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
