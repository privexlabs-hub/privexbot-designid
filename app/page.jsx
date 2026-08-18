'use client';

import dynamic from 'next/dynamic';

// The canvas reads location.pathname, localStorage and window.parent during
// render, so it must never run on the server. Rendering it through
// next/dynamic with ssr:false keeps the component client-only; the
// `typeof document` guard on the module-scope style injection inside
// lib/design-canvas.jsx is still required and must not be removed.
const CanvasView = dynamic(() => import('./canvas-view'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0eee9',
        color: 'rgba(60,50,40,.6)',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 14,
      }}
    >
      Loading brand kit…
    </div>
  ),
});

export default function Page() {
  return <CanvasView />;
}
