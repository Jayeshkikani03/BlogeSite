import React, { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext(null);

/**
 * Global Toast provider supplying slide-in notification cards.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
    
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    
    // Auto remove after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Global Portal-like Toast Container */}
      <div className="saas-toast-container" aria-live="polite" style={{ zIndex: 1100 }}>
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`saas-toast d-flex align-items-start justify-content-between text-start ${
              toast.type === 'success' ? 'toast-success' : 'toast-error'
            }`}
          >
            <div className="d-flex align-items-start gap-2">
              <i className={`bi ${toast.icon} ${toast.type === 'success' ? 'text-success' : 'text-danger'} fs-5 mt-0.5`}></i>
              <div className="ms-2">
                <h6 className="text-white fw-bold mb-1" style={{ fontSize: '0.9rem' }}>
                  {toast.type === 'success' ? 'Success' : 'System Alert'}
                </h6>
                <p className="text-gray small mb-0 lh-relaxed">{toast.message}</p>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white ms-2 mt-0.5" 
              aria-label="Close notification"
              onClick={() => removeToast(toast.id)}
              style={{ fontSize: '0.75rem' }}
            ></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
