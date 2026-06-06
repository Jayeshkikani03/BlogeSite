

/**
 * Reusable Empty State placeholder.
 */
export default function EmptyState({ title = 'No data available', desc = 'There are no items to list at this moment.' }) {
  return (
    <div className="card saas-card p-5 text-center border-secondary border-opacity-10 bg-opacity-10 my-4">
      <div className="card-body p-0">
        <i className="bi bi-box-arrow-in-down text-muted display-5 mb-3 d-block"></i>
        <h5 className="text-white fw-bold mb-2">{title}</h5>
        <p className="text-gray small mb-0 lh-relaxed" style={{ maxWidth: '400px', margin: '0 auto' }}>{desc}</p>
      </div>
    </div>
  );
}
