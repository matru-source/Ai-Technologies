import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Caught in ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center',
            color: '#ede9e8',
          }}
        >
          <div
            style={{
              padding: '24px 32px',
              borderRadius: '16px',
              background: 'rgba(18, 17, 17, 0.95)',
              border: '1px solid rgba(200, 255, 61, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
              maxWidth: '500px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: '#c8ff3d',
                marginBottom: '12px',
                textTransform: 'uppercase',
              }}
            >
              Notice
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '12px',
              }}
            >
              Component Temporarily Unavailable
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(237, 233, 232, 0.7)',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              A visual element encountered an issue or WebGL restriction on your device. The rest of the site remains fully operational.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                background: '#c8ff3d',
                color: '#000000',
                fontWeight: 600,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
