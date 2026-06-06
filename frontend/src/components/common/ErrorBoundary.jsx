import React, { Component } from 'react';

/**
 * Standard Error Boundary block preventing frontend browser crashes.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Error Boundary Triggered]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="d-flex align-items-center justify-content-center text-center section-black"
          style={{ minHeight: '100vh', padding: '24px' }}
        >
          <div className="card saas-card p-5 border-secondary border-opacity-10 bg-opacity-20 max-w-lg">
            <div className="card-body p-0">
              <i className="bi bi-bug text-danger display-4 mb-4 d-block"></i>
              <h2 className="text-white fw-bold mb-3">Something went wrong</h2>
              <p className="text-gray mb-4 small lh-relaxed">
                TechFlow encountered an unexpected client-side crash. Please try reloading the page.
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-saas-primary px-4 py-2"
              >
                Reload Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
