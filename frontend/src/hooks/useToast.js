import { useContext, useMemo } from 'react';
import { ToastContext } from '../contexts/ToastContext';

/**
 * Custom hook to dispatch global toast alerts.
 */
export default function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be wrapped inside a ToastProvider');
  }

  return useMemo(() => ({
    showToast: context.showToast,
    showSuccess: (msg) => context.showToast(msg, 'success'),
    showError: (msg) => context.showToast(msg, 'error')
  }), [context]);
}
