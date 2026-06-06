import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import inquiryService from '../services/inquiryService';
import useToast from '../hooks/useToast';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await inquiryService.getInquiries();
      if (data?.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      showError(err.message || 'Failed to fetch inquiries.');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    // Defer the call asynchronously to prevent synchronous setState inside the effect
    Promise.resolve().then(() => {
      fetchInquiries();
    });
  }, [navigate, fetchInquiries]);

  const handleLogout = () => {
    authService.logout();
    showSuccess('Logged out successfully.');
    navigate('/admin/login');
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Avoid selecting the inquiry row
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await inquiryService.deleteInquiry(id);
      showSuccess('Inquiry deleted successfully.');
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      if (selectedInquiry?._id === id) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      showError(err.message || 'Failed to delete inquiry.');
    }
  };

  const handleSelectInquiry = async (inquiry) => {
    setSelectedInquiry(inquiry);
    if (inquiry.status === 'unread') {
      try {
        await inquiryService.updateStatus(inquiry._id, 'read');
        // Update local state status to 'read'
        setInquiries((prev) =>
          prev.map((item) =>
            item._id === inquiry._id ? { ...item, status: 'read' } : item
          )
        );
        // Also update local selected inquiry
        setSelectedInquiry({ ...inquiry, status: 'read' });
      } catch (err) {
        console.error('Failed to mark inquiry as read:', err);
      }
    }
  };

  // Filtered inquiries based on search term
  const filteredInquiries = inquiries.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.subject.toLowerCase().includes(term) ||
      item.message.toLowerCase().includes(term)
    );
  });

  const totalCount = inquiries.length;
  const unreadCount = inquiries.filter((item) => item.status === 'unread').length;

  return (
    <div className="position-relative overflow-hidden py-5" style={{ minHeight: '90vh' }}>
      {/* Decorative background glow */}
      <div className="glow-orb" style={{ width: '400px', height: '400px', background: 'var(--primary-glow)', top: '-5%', right: '5%' }}></div>

      <div className="container position-relative z-1">
        {/* Top Header Row */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <h1 className="text-white fw-bold mb-1">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-gray mb-0">Review incoming inquiries and submissions from TechFlow Enterprise portal.</p>
          </div>
          <div>
            <button className="btn btn-saas-secondary d-flex align-items-center gap-2" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Info Metric Cards */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="saas-card p-4">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-primary bg-opacity-10 p-3 text-primary" style={{ border: '1px solid rgba(129, 140, 248, 0.2)' }}>
                  <i className="bi bi-chat-left-dots-fill fs-4 text-gradient"></i>
                </div>
                <div>
                  <h6 className="text-gray mb-1 small fw-semibold">Total Inquiries</h6>
                  <h3 className="text-white fw-bold mb-0">{totalCount}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <div className="saas-card p-4">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-warning bg-opacity-10 p-3 text-warning" style={{ border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <i className="bi bi-envelope-exclamation-fill fs-4 text-gradient-cyan"></i>
                </div>
                <div>
                  <h6 className="text-gray mb-1 small fw-semibold">Unread Messages</h6>
                  <h3 className="text-white fw-bold mb-0">{unreadCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div className="row g-4">
          {/* Left Panel: Inquiries list */}
          <div className={`${selectedInquiry ? 'col-lg-7' : 'col-12'}`}>
            <div className="saas-card p-4 h-100">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
                <h5 className="text-white fw-bold mb-0">Inquiries Inbox</h5>
                <div className="position-relative" style={{ maxWidth: '280px' }}>
                  <i className="bi bi-search position-absolute text-gray" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}></i>
                  <input
                    type="text"
                    className="form-control form-input-saas ps-5 py-2"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="d-flex flex-column align-items-center justify-content-center py-5">
                  <div className="spinner-border text-primary mb-3" role="status"></div>
                  <p className="text-gray mb-0">Loading inquiries from database...</p>
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="text-center py-5 border border-dashed border-muted rounded-3">
                  <i className="bi bi-envelope-open text-dark fs-1 mb-2 d-block"></i>
                  <p className="text-gray mb-0">No inquiries found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle mb-0" style={{ '--bs-table-bg': 'transparent', '--bs-table-border-color': 'var(--border-muted)' }}>
                    <thead>
                      <tr>
                        <th className="text-gray fw-semibold border-bottom-0 pb-3" style={{ fontSize: '0.85rem' }}>Sender</th>
                        <th className="text-gray fw-semibold border-bottom-0 pb-3" style={{ fontSize: '0.85rem' }}>Subject</th>
                        <th className="text-gray fw-semibold border-bottom-0 pb-3" style={{ fontSize: '0.85rem' }}>Date</th>
                        <th className="text-gray fw-semibold border-bottom-0 pb-3 text-end" style={{ fontSize: '0.85rem' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.map((item) => (
                        <tr
                          key={item._id}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleSelectInquiry(item)}
                          className={selectedInquiry?._id === item._id ? 'table-active' : ''}
                        >
                          <td className="py-3">
                            <div className="d-flex align-items-center gap-2">
                              {item.status === 'unread' && (
                                <span className="p-1.5 bg-primary rounded-circle" title="Unread" style={{ width: '8px', height: '8px', display: 'inline-block' }}></span>
                              )}
                              <div>
                                <span className={`text-white d-block ${item.status === 'unread' ? 'fw-bold' : ''}`}>
                                  {item.name}
                                </span>
                                <span className="text-gray small">{item.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`text-gray text-truncate d-inline-block ${item.status === 'unread' ? 'text-white fw-semibold' : ''}`} style={{ maxWidth: '180px' }}>
                              {item.subject}
                            </span>
                          </td>
                          <td className="py-3 text-gray small">
                            {new Date(item.createdAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="py-3 text-end" onClick={(e) => e.stopPropagation()}>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-3 py-1.5 px-2"
                              onClick={(e) => handleDelete(item._id, e)}
                              title="Delete inquiry"
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Selected Inquiry Detail View */}
          {selectedInquiry && (
            <div className="col-lg-5">
              <div className="saas-card p-4 position-sticky" style={{ top: '24px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-muted">
                  <h5 className="text-white fw-bold mb-0">Message Detail</h5>
                  <button className="btn-close btn-close-white" onClick={() => setSelectedInquiry(null)} aria-label="Close message"></button>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="text-dark small uppercase fw-bold d-block mb-1">Sender</label>
                    <div className="text-white fw-semibold">{selectedInquiry.name}</div>
                    <a href={`mailto:${selectedInquiry.email}`} className="text-primary small text-decoration-none">
                      {selectedInquiry.email}
                    </a>
                  </div>

                  <div className="mb-4">
                    <label className="text-dark small uppercase fw-bold d-block mb-1">Subject</label>
                    <div className="text-white">{selectedInquiry.subject}</div>
                  </div>

                  <div className="mb-4">
                    <label className="text-dark small uppercase fw-bold d-block mb-1">Received At</label>
                    <div className="text-gray small">
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-dark small uppercase fw-bold d-block mb-1">Message Body</label>
                    <div className="p-3 bg-black bg-opacity-30 rounded-3 text-gray border border-muted" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                      {selectedInquiry.message}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                      className="btn btn-saas-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                    >
                      <i className="bi bi-reply-fill"></i>
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
