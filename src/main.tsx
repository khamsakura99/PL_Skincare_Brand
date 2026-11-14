import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : String(error),
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: '#FAF6F0',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#2E1A0F',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '100%',
              background: '#FFFFFF',
              border: '2px solid #C89D54',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(46,26,15,0.1)',
            }}
          >
            <h1 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px' }}>
              PL Skincare Brand — Recovery Mode
            </h1>
            <p style={{ fontSize: '13px', color: '#57534E', margin: '0 0 12px' }}>
              A cached state error prevented the page from rendering cleanly:
            </p>
            <pre
              style={{
                fontSize: '12px',
                background: '#FEF2F2',
                color: '#991B1B',
                padding: '10px',
                borderRadius: '8px',
                overflowX: 'auto',
                margin: '0 0 16px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {this.state.errorMessage || 'Unknown render error'}
            </pre>
            <button
              type="button"
              onClick={() => {
                try {
                  window.localStorage.clear();
                } catch {
                  // ignore storage errors
                }
                window.location.reload();
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#2E1A0F',
                color: '#F5DF98',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Clear Cached Data & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
