'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ fontFamily: 'monospace', padding: '20px', whiteSpace: 'pre-wrap' }}>
          <h1 style={{ color: '#d32f2f', marginBottom: '20px' }}>Error Details</h1>
          
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#f57c00', marginBottom: '10px' }}>Error Message:</h2>
            <div style={{ 
              backgroundColor: '#fff3e0', 
              padding: '10px', 
              borderRadius: '4px',
              color: '#e65100'
            }}>
              {error.message}
            </div>
          </section>

          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#f57c00', marginBottom: '10px' }}>Stack Trace:</h2>
            <div style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px',
              overflowX: 'auto',
              fontSize: '12px',
              color: '#333'
            }}>
              {error.stack}
            </div>
          </section>

          {error.digest && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ color: '#f57c00', marginBottom: '10px' }}>Digest:</h2>
              <div style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '4px',
                fontSize: '12px',
                color: '#333'
              }}>
                {error.digest}
              </div>
            </section>
          )}

          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
