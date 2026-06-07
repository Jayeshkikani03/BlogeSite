import { useParams, Link } from 'react-router-dom';
import { articles, tagColors } from '../data/articles';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <section className="page-fade-in d-flex align-items-center justify-content-center section-black" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <h2 className="text-white fw-bold mb-3">Article not found</h2>
          <Link to="/blog" className="btn btn-saas-primary">Back to Blog</Link>
        </div>
      </section>
    );
  }

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <section className="page-fade-in section-black position-relative" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="glow-orb" style={{ top: '5%', right: '5%', width: '400px', height: '400px', background: 'rgba(99,102,241,0.12)' }}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <Link to="/blog" className="d-inline-flex align-items-center gap-2 text-gray text-decoration-none hover-white transition-smooth mb-4 small">
            <i className="bi bi-arrow-left"></i>
            <span>Back to Blog</span>
          </Link>

          {/* Header */}
          <div className="mb-5">
            <span className={`small fw-bold mb-2 d-inline-block ${tagColors[article.tag] || 'text-gray'}`}>{article.tag}</span>
            <h1 className="display-6 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>{article.title}</h1>
            <p className="text-gray lh-relaxed mb-4">{article.desc}</p>
            <div className="d-flex align-items-center gap-3 text-dark small">
              <span><i className="bi bi-calendar3 me-1"></i>{article.date}</span>
              <span><i className="bi bi-clock me-1"></i>{article.readTime}</span>
            </div>
          </div>

          {/* Article icon banner */}
          <div className="saas-card p-5 mb-5 d-flex align-items-center justify-content-center" style={{ minHeight: '160px', background: 'rgba(129,140,248,0.04)' }}>
            <i className={`bi ${article.icon} text-gradient`} style={{ fontSize: '4rem' }}></i>
          </div>

          {/* Content */}
          <div className="saas-card p-4 p-md-5 mb-5">
            {article.content.trim().split('\n\n').map((block, idx) => {
              if (block.startsWith('## ')) {
                return <h4 key={idx} className="text-white fw-bold mt-4 mb-3">{block.replace('## ', '')}</h4>;
              }
              if (block.startsWith('```')) {
                const code = block.replace(/```[a-z]*\n?/, '').replace(/```$/, '');
                return (
                  <pre key={idx} className="p-3 rounded-3 mb-3 small font-monospace text-gray" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-muted)', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                    {code}
                  </pre>
                );
              }
              return <p key={idx} className="text-gray lh-relaxed mb-3">{block}</p>;
            })}
          </div>

          {/* Related articles */}
          <div>
            <h5 className="text-white fw-bold mb-4">Related Articles</h5>
            <div className="row g-3">
              {related.map((rel) => (
                <div key={rel.slug} className="col-md-4">
                  <Link to={`/blog/${rel.slug}`} className="text-decoration-none">
                    <div className="saas-card p-3 h-100">
                      <span className={`small fw-bold d-block mb-1 ${tagColors[rel.tag] || 'text-gray'}`}>{rel.tag}</span>
                      <p className="text-white small fw-semibold mb-0" style={{ lineHeight: '1.4' }}>{rel.title}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
