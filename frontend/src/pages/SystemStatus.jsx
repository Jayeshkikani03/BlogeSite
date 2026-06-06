import { useEffect } from 'react';
import healthService from '../services/healthService';
import useApi from '../hooks/useApi';
import ErrorState from '../components/ui/ErrorState';
import Spinner from '../components/ui/Spinner';
import { formatUptime, formatDateTime } from '../utils/formatters';

/**
 * System status telemetry dashboard page.
 */
export default function SystemStatus() {
  const { data: statusInfo, error, loading, request: fetchStatus } = useApi(
    healthService.getHealthStatus
  );

  useEffect(() => {
    fetchStatus();
    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      fetchStatus();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <section 
      className="position-relative overflow-hidden section-black d-flex align-items-center justify-content-center" 
      style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '60px' }}
    >
      {/* Glow orb */}
      <div className="glow-orb" style={{ top: '30%', left: '40%', width: '500px', height: '350px', background: 'rgba(99, 102, 241, 0.15)' }}></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="max-w-2xl mx-auto">
          
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="display-6 fw-extrabold text-white mb-0" style={{ letterSpacing: '-1px' }}>
              System <span className="text-gradient">Status</span>
            </h2>
            
            <button 
              onClick={() => fetchStatus()} 
              className="btn btn-saas-secondary d-flex align-items-center gap-2"
              disabled={loading}
              aria-label="Refresh status details"
            >
              {loading ? <Spinner size="sm" /> : <i className="bi bi-arrow-clockwise"></i>}
              <span>Refresh</span>
            </button>
          </div>

          {error ? (
            <ErrorState 
              title="System Offline" 
              desc={error} 
              onRetry={fetchStatus} 
            />
          ) : loading && !statusInfo ? (
            <div className="card saas-card p-5 text-center border-secondary border-opacity-10 py-6">
              <div className="card-body">
                <Spinner size="lg" color="text-primary" />
                <p className="text-gray small mt-3 font-monospace">Loading system metrics...</p>
              </div>
            </div>
          ) : statusInfo ? (
            <div className="card saas-card p-4 border-secondary border-opacity-10 text-start shadow-lg">
              <div className="card-header bg-transparent border-bottom border-secondary border-opacity-10 pb-3 d-flex align-items-center justify-content-between">
                <span className="font-monospace text-gray small">API TARGET: {healthService.getHealthStatus.name ? 'healthService' : 'TechFlow REST'}</span>
                
                <div className="d-flex align-items-center gap-2">
                  <span 
                    className="d-inline-block rounded-circle bg-success"
                    style={{
                      width: '10px',
                      height: '10px',
                      boxShadow: '0 0 10px #34d399',
                      animation: 'pulse 2s infinite'
                    }}
                  ></span>
                  <span className="text-success small fw-bold">Operational</span>
                </div>
              </div>

              <div className="card-body p-0 pt-4">
                <div className="row g-4">
                  {/* Service Name */}
                  <div className="col-sm-6 border-bottom border-secondary border-opacity-10 pb-3">
                    <span className="text-gray small d-block mb-1">Service</span>
                    <span className="text-white fw-bold">{statusInfo.service || 'TechFlow API'}</span>
                  </div>

                  {/* Environment */}
                  <div className="col-sm-6 border-bottom border-secondary border-opacity-10 pb-3">
                    <span className="text-gray small d-block mb-1">Environment</span>
                    <span className="badge bg-secondary bg-opacity-25 text-white text-uppercase py-2 px-3">
                      {statusInfo.environment || 'development'}
                    </span>
                  </div>

                  {/* Version */}
                  <div className="col-sm-6 border-bottom border-secondary border-opacity-10 pb-3">
                    <span className="text-gray small d-block mb-1">Version</span>
                    <span className="text-white fw-bold font-monospace">{statusInfo.version || '1.0.0'}</span>
                  </div>

                  {/* Uptime */}
                  <div className="col-sm-6 border-bottom border-secondary border-opacity-10 pb-3">
                    <span className="text-gray small d-block mb-1">Uptime</span>
                    <span className="text-white fw-bold font-monospace">{formatUptime(statusInfo.uptime)}</span>
                  </div>

                  {/* Timestamp */}
                  <div className="col-12 pt-2">
                    <span className="text-gray small d-block mb-1">Last Updated Timestamp</span>
                    <span className="text-white small font-monospace">{formatDateTime(statusInfo.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card saas-card p-5 text-center border-secondary border-opacity-10">
              <div className="card-body">
                <i className="bi bi-info-circle display-6 mb-3 d-block text-muted"></i>
                <h5 className="text-white">No metrics fetched</h5>
              </div>
            </div>
          )}

          {/* Inline keyframe for glowing operational state */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes pulse {
              0% { opacity: 0.6; box-shadow: 0 0 6px #34d399; }
              50% { opacity: 1; box-shadow: 0 0 14px #34d399; }
              100% { opacity: 0.6; box-shadow: 0 0 6px #34d399; }
            }
          `}} />

        </div>
      </div>
    </section>
  );
}
