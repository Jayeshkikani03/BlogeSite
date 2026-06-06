import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import './styles/custom.css';

/**
 * Enterprise Client Application Root entry wrapper.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}
