import React, { useEffect } from 'react';
import { useContactForm } from '../../hooks/useContactForm';
import useToast from '../../hooks/useToast';

/**
 * Enterprise Contact Form Section linked to global Toast context alerts.
 */
export default function ContactSection() {
  const {
    values,
    errors,
    isLoading,
    successMessage,
    errorMessage,
    handleChange,
    handleBlur,
    handleSubmit
  } = useContactForm();

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (successMessage) {
      showSuccess(successMessage);
    }
  }, [successMessage, showSuccess]);

  useEffect(() => {
    if (errorMessage) {
      showError(errorMessage);
    }
  }, [errorMessage, showError]);

  return (
    <section id="contact" className="py-6 section-black position-relative" style={{ padding: '100px 0' }}>
      <div className="container">
        <div className="text-center mb-5 max-w-2xl mx-auto">
          <h6 className="text-uppercase text-gradient fw-bold tracking-wider mb-2" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>
            CONNECT WITH US
          </h6>
          <h2 className="display-6 fw-extrabold text-white mb-3" style={{ letterSpacing: '-1px' }}>
            Speak with an architect
          </h2>
          <p className="text-gray" style={{ maxWidth: '580px', margin: '0 auto' }}>
            Have questions about Docker builds, workflows configuration, or hosting clusters? Fill out the details below.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card saas-card p-4 p-md-5 border-secondary border-opacity-10 bg-opacity-30">
              <div className="card-body p-0 text-start">
                
                <form onSubmit={handleSubmit} noValidate aria-label="Contact Architect Form">
                  <div className="row g-4">
                    {/* Name */}
                    <div className="col-md-6">
                      <label htmlFor="contact-name" className="form-label text-white">Full Name</label>
                      <input 
                        type="text" 
                        id="contact-name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control form-input-saas ${
                          errors.name ? 'is-invalid border-danger' : ''
                        }`}
                        placeholder="Sarah Jenkins"
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <div id="name-error" className="invalid-feedback d-block mt-1 text-danger small">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="contact-email" className="form-label text-white">Email Address</label>
                      <input 
                        type="email" 
                        id="contact-email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control form-input-saas ${
                          errors.email ? 'is-invalid border-danger' : ''
                        }`}
                        placeholder="sarah@cloudscale.io"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <div id="email-error" className="invalid-feedback d-block mt-1 text-danger small">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="col-12">
                      <label htmlFor="contact-subject" className="form-label text-white">Subject</label>
                      <input 
                        type="text" 
                        id="contact-subject"
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control form-input-saas ${
                          errors.subject ? 'is-invalid border-danger' : ''
                        }`}
                        placeholder="Docker Fargate deployment architecture"
                        required
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                      />
                      {errors.subject && (
                        <div id="subject-error" className="invalid-feedback d-block mt-1 text-danger small">
                          {errors.subject}
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label htmlFor="contact-message" className="form-label text-white">Your Message</label>
                      <textarea 
                        id="contact-message"
                        name="message"
                        rows="5"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control form-input-saas ${
                          errors.message ? 'is-invalid border-danger' : ''
                        }`}
                        placeholder="Hello, I want to learn more about setting up custom VPC environments..."
                        required
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      ></textarea>
                      {errors.message && (
                        <div id="message-error" className="invalid-feedback d-block mt-1 text-danger small">
                          {errors.message}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 text-end">
                      <button 
                        type="submit" 
                        className="btn btn-saas-primary px-5 py-3 d-inline-flex align-items-center gap-2"
                        disabled={isLoading}
                        aria-busy={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span>Sending Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Request</span>
                            <i className="bi bi-send-fill"></i>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
