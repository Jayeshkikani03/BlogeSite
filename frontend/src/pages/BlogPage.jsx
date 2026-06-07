import { Link } from 'react-router-dom';
import { articles, tagColors } from '../data/articles';

export default function BlogPage() {
  return (
    <section className="page-fade-in section-black position-relative" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="glow-orb" style={{ top: '10%', right: '5%', width: '400px', height: '400px', background: 'rgba(99,102,241,0.15)' }}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
            TECHFLOW BLOG
          </h6>
          <h2 className="display-6 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>
            Engineering <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-gray">Deep dives into DevOps, cloud architecture, and modern deployment workflows.</p>
        </div>

        <div className="row g-4">
          {articles.map((article) => (
            <div key={article.slug} className="col-lg-4 col-md-6">
              <Link to={`/blog/${article.slug}`} className="text-decoration-none">
                <div className="saas-card h-100 p-4 d-flex flex-column text-start">
                  <div
                    className="d-flex align-items-center justify-content-center mb-4"
                    style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.15)', fontSize: '1.25rem' }}
                  >
                    <i className={`bi ${article.icon} text-gradient`}></i>
                  </div>
                  <span className={`small fw-bold mb-2 ${tagColors[article.tag] || 'text-gray'}`}>{article.tag}</span>
                  <h5 className="text-white fw-bold mb-2">{article.title}</h5>
                  <p className="text-gray small lh-relaxed flex-grow-1">{article.desc}</p>
                  <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top border-secondary border-opacity-10">
                    <span className="text-dark small">{article.date}</span>
                    <span className="text-dark small"><i className="bi bi-clock me-1"></i>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
