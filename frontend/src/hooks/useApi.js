import { useState, useCallback } from 'react';

/**
 * Standard hook to manage async API operation states.
 * @param {Function} apiFunc - Async function mapping an endpoint call
 */
export default function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response);
      return { success: true, data: response };
    } catch (err) {
      const message = err.message || 'An unexpected error occurred';
      setError(message);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  return {
    data,
    error,
    loading,
    request,
    setData
  };
}
