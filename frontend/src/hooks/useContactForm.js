import { useState, useRef } from 'react';
import contactService from '../services/contactService';

const COOLDOWN_SECONDS = 30;
const initialValues = { name: '', email: '', subject: '', message: '' };

export const useContactForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  // Local client-side validator helper
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        } else if (value.trim().length < 3) {
          error = 'Subject must be at least 3 characters';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

    // Validate in real time
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      setErrorMessage('Please fix the errors in the form before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await contactService.submitContact(values);
      if (response.success) {
        setSuccessMessage(response.message || 'Contact submitted successfully!');
        setValues(initialValues);
        setErrors({});
        // Start cooldown
        setCooldown(COOLDOWN_SECONDS);
        cooldownRef.current = setInterval(() => {
          setCooldown((c) => {
            if (c <= 1) { clearInterval(cooldownRef.current); return 0; }
            return c - 1;
          });
        }, 1000);
      } else {
        setErrorMessage(response.message || 'Failed to submit contact.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      
      // Parse validation errors from Axios client interceptor
      if (err.errors && err.errors.length > 0) {
        const backendErrors = {};
        err.errors.forEach((errObj) => {
          const key = Object.keys(errObj)[0];
          backendErrors[key] = errObj[key];
        });
        setErrors(backendErrors);
        setErrorMessage(err.message || 'Server validation failed. Please check inputs.');
      } else {
        setErrorMessage(err.message || 'Server communication failure. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    values,
    errors,
    isLoading,
    cooldown,
    successMessage,
    errorMessage,
    handleChange,
    handleBlur,
    handleSubmit
  };
};
