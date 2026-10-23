import React, { useEffect, useRef } from 'react';

export default function CountryGlyph({ code, name, flag, latency, _reach, isActive }) {
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
    ctx.strokeStyle = isActive ? '#c8ff3d' : 'rgba(200, 255, 61, 0.4)';
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
  }, [code, isActive]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: isActive ? 'rgba(200, 255, 61, 0.08)' : 'rgba(12, 11, 11, 0.75)',
        border: `1px solid ${isActive ? '#c8ff3d' : 'var(--border-subtle)'}`,
        boxShadow: isActive ? '0 0 16px rgba(200, 255, 61, 0.18)' : 'none',
        borderRadius: '8px',
        transition: 'all 0.2s',
        minWidth: 0,
        overflow: 'hidden',
      }}
      className="has-brackets country-glyph-card"
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
        className="country-glyph-canvas"
        style={{
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0, flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px', minWidth: 0 }}>
          <span style={{ fontSize: '14px', flexShrink: 0 }}>{flag}</span>
          <span className="country-glyph-name" style={{ fontWeight: 600, color: '#fff' }}>{name}</span>
        </div>
        <div className="mono country-glyph-sub" style={{ color: 'var(--accent-neon)' }}>
          {code} &bull; {latency}
        </div>
      </div>

      <style>{`
        .country-glyph-card {
          padding: 16px 18px;
          gap: 14px;
        }
        .country-glyph-canvas {
          width: 44px;
          height: 44px;
        }
        .country-glyph-name {
          font-size: 14px;
        }
        .country-glyph-sub {
          font-size: 11px;
        }
        @media (max-width: 600px) {
          .country-glyph-card {
            padding: 10px 8px !important;
            gap: 7px !important;
          }
          .country-glyph-canvas {
            width: 28px !important;
            height: 28px !important;
          }
          .country-glyph-name {
            font-size: 11px !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .country-glyph-sub {
            font-size: 9px !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      `}</style>
    </div>
  );
}
