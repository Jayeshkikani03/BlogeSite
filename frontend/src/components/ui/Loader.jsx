

/**
 * Full-page SaaS loading overlay.
 */
export default function Loader() {
  return (
    <div 
      className="d-flex align-items-center justify-content-center section-black"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1080,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div className="text-center">
        <div 
          className="spinner-border text-primary mb-3" 
          role="status" 
          style={{ width: '3rem', height: '3rem', color: '#818cf8 !important' }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-gray small font-monospace">Synchronizing TechFlow systems...</p>
      </div>
    </div>
  );
}
