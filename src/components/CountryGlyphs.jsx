import React, { useEffect, useRef } from 'react';

export default function CountryGlyph({ code, name, flag, latency, _reach }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const w = 60;
    const h = 60;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, w, h);

    // Draw stylized geometric country grid outline
    ctx.strokeStyle = 'rgba(200, 255, 61, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // Diagonal tick
    ctx.strokeStyle = '#c8ff3d';
    ctx.beginPath();
    ctx.moveTo(8, 8);
    ctx.lineTo(16, 8);
    ctx.moveTo(8, 8);
    ctx.lineTo(8, 16);
    ctx.stroke();

    // Center dot matrix
    ctx.fillStyle = '#c8ff3d';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(20 + c * 8, 20 + r * 8, 3, 3);
        } else {
          ctx.fillStyle = 'rgba(237, 233, 232, 0.25)';
          ctx.fillRect(20 + c * 8, 20 + r * 8, 2.5, 2.5);
          ctx.fillStyle = '#c8ff3d';
        }
      }
    }
  }, [code]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px 18px',
        background: 'rgba(12, 11, 11, 0.75)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
        transition: 'all 0.2s',
      }}
      className="has-brackets"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-neon)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '44px',
          height: '44px',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <span style={{ fontSize: '15px' }}>{flag}</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{name}</span>
        </div>
        <div className="mono" style={{ fontSize: '11px', color: 'var(--accent-neon)' }}>
          {code} &bull; {latency}
        </div>
      </div>
    </div>
  );
}
