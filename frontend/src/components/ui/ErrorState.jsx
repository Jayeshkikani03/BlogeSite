

/**
 * Reusable Error State component with dynamic retry triggers.
 */
export default function ErrorState({ title = 'Failed to load details', desc = 'We encountered an error querying api details.', onRetry }) {
  return (
    <div className="card saas-card p-5 text-center border-danger border-opacity-10 bg-opacity-10 my-4">
      <div className="card-body p-0">
        <i className="bi bi-exclamation-triangle text-danger display-5 mb-3 d-block"></i>
        <h5 className="text-white fw-bold mb-2">{title}</h5>
        <p className="text-gray small mb-4 lh-relaxed" style={{ maxWidth: '400px', margin: '0 auto' }}>{desc}</p>
        
        {onRetry && (
          <button onClick={onRetry} className="btn btn-saas-secondary btn-sm px-3 py-2">
            <i className="bi bi-arrow-clockwise me-1"></i>
            <span>Retry Connection</span>
          </button>
        )}
      </div>
    </div>
  );
}
