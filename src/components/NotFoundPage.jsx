import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';

export default function NotFoundPage({ onNavigateHome, onNavigateServices, onOpenContact }) {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: '680px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          background: 'rgba(12, 12, 12, 0.85)',
          border: '1px solid rgba(237, 233, 232, 0.12)',
          borderRadius: '20px',
          padding: '48px 36px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(200, 255, 61, 0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Corner Ticks */}
        <svg
          viewBox="0 0 30 30"
          width="12"
          height="12"
          style={{ position: 'absolute', top: 16, left: 16 }}
        >
          <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" />
        </svg>
        <svg
          viewBox="0 0 30 30"
          width="12"
          height="12"
          style={{ position: 'absolute', top: 16, right: 16 }}
        >
          <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(90 15 15)" />
        </svg>
        <svg
          viewBox="0 0 30 30"
          width="12"
          height="12"
          style={{ position: 'absolute', bottom: 16, left: 16 }}
        >
          <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(270 15 15)" />
        </svg>
        <svg
          viewBox="0 0 30 30"
          width="12"
          height="12"
          style={{ position: 'absolute', bottom: 16, right: 16 }}
        >
          <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(180 15 15)" />
        </svg>

        {/* Brand Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#c8ff3d',
            marginBottom: '20px',
          }}
        >
          <img
            src={aitechEmblem}
            alt="AI Technologies"
            style={{ width: 14, height: 14, objectFit: 'contain' }}
          />
          <span>404 &mdash; PAGE NOT FOUND</span>
        </div>

        {/* Big 404 Glyphs */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(72px, 14vw, 130px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
            color: '#ffffff',
            textShadow: '0 0 30px rgba(200, 255, 61, 0.35)',
            marginBottom: '16px',
          }}
        >
          4<span style={{ color: '#c8ff3d' }}>0</span>4
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '14px',
            lineHeight: 1.2,
          }}
        >
          Digital Coordinate Not Found
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'rgba(237, 233, 232, 0.72)',
            maxWidth: '460px',
            margin: '0 auto 32px auto',
          }}
        >
          The page or digital solution you are looking for does not exist, has been relocated, or is currently in development.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => onNavigateHome ? onNavigateHome() : (window.location.href = '/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 22px',
              borderRadius: '8px',
              background: '#c8ff3d',
              color: '#000000',
              fontWeight: 700,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 20px rgba(200, 255, 61, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 28px rgba(200, 255, 61, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(200, 255, 61, 0.3)';
            }}
          >
            Back to Home <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => onNavigateServices ? onNavigateServices() : (window.location.hash = '#services-page')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 20px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#ede9e8',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(200, 255, 61, 0.5)';
              e.currentTarget.style.color = '#c8ff3d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
              e.currentTarget.style.color = '#ede9e8';
            }}
          >
            Explore Services ▷
          </button>
        </div>
      </div>
    </div>
  );
}
