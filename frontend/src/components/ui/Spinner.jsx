

/**
 * Local spinner component for buttons or cards.
 */
export default function Spinner({ size = 'sm', color = 'text-white' }) {
  const spinnerSize = size === 'sm' ? 'spinner-border-sm' : '';
  
  return (
    <div className={`spinner-border ${spinnerSize} ${color}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
