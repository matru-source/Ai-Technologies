import React from 'react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function StackStrip() {
  const items = [
    { label: 'Git', icon: '⌘' },
    { label: 'Websites', icon: '🌐' },
    { label: 'Android', icon: '🤖' },
    { label: 'iOS', icon: '' },
    { label: 'APIs', icon: '⚡' },
    { label: 'GitHub', icon: '⎇' },
    { label: 'Docker', icon: '🐳' },
    { label: 'Hugging Face', icon: '🤗' },
    { label: 'Open models', icon: '🧠' },
    { label: 'Kubernetes', icon: '☸' },
  ];

  // Duplicate for seamless infinite marquee loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div
      style={{
        width: '100%',
        borderTop: '1px solid rgba(237, 233, 232, 0.08)',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        padding: '16px 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Left Label */}
        <div
          className="stack-strip-label"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingRight: '28px',
            borderRight: '1px solid rgba(237, 233, 232, 0.12)',
            flexShrink: 0,
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            color: 'rgba(237, 233, 232, 0.65)',
            textTransform: 'uppercase',
          }}
        >
          <img
            src={aitechEmblem}
            alt="AI Technologies"
            style={{ width: 14, height: 14, objectFit: 'contain', flexShrink: 0 }}
          />
          <span>Connected digital solutions</span>
        </div>

        {/* Marquee Track */}
        <div
          className="stack-strip-track"
          style={{
            display: 'flex',
            overflow: 'hidden',
            maskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            flex: 1,
            marginLeft: '20px',
          }}
        >
          <div
            className="stack-marquee"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              whiteSpace: 'nowrap',
            }}
          >
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(237, 233, 232, 0.8)',
                  transition: 'color 0.2s',
                }}
              >
                <span
                  style={{
                    fontSize: '15px',
                    opacity: 0.8,
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                <span
                  style={{
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: '#c8ff3d',
                    marginLeft: '12px',
                    opacity: 0.7,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .stack-marquee {
          animation: marqueeScroll 24s linear infinite;
        }
        .stack-marquee:hover {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          .stack-strip-label span {
            display: none !important;
          }
          .stack-strip-label {
            padding-right: 12px !important;
          }
          .stack-strip-track {
            margin-left: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
