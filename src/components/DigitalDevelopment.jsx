import React from 'react';
import DeployCanvas from './DeployCanvas';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function DigitalDevelopment() {
  return (
    <section
      id="platform"
      data-framer-name="Platform"
      className="digital-dev-section"
      style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '44px',
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      {/* Section Header: Two Column Split */}
      <div
        className="digital-dev-header"
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '48px',
          width: '100%',
        }}
      >
        {/* Left Column: Eyebrow + Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            flex: '1 0 0',
            minWidth: 0,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: '"Geist Mono", monospace',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#c8ff3d',
            }}
          >
            <img
              src={aitechEmblem}
              alt="AI Technologies"
              style={{ width: 14, height: 14, objectFit: 'contain', flexShrink: 0 }}
            />
            <span>01 / Digital development</span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 'clamp(40px, 5.2vw, 64px)',
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: '-0.045em',
              color: '#ede9e8',
              margin: 0,
            }}
          >
            Your vision.
            <br />
            <span style={{ color: 'rgba(237, 233, 232, 0.5)' }}>
              Built for business.
            </span>
          </h2>
        </div>

        {/* Right Subtitle */}
        <p
          style={{
            fontFamily: '"Geist", sans-serif',
            fontSize: '19px',
            fontWeight: 400,
            lineHeight: 1.45,
            letterSpacing: '-0.01em',
            color: 'rgba(237, 233, 232, 0.85)',
            maxWidth: '380px',
            margin: 0,
            paddingBottom: '6px',
          }}
        >
          Websites, mobile apps and custom software, shaped around your goals.
        </p>
      </div>

      {/* 3D Perspective Architecture Canvas */}
      <DeployCanvas />

      {/* Outside Sub-caption matching Framer exactly */}
      <div
        style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(237, 233, 232, 0.45)',
          marginTop: '-20px',
        }}
      >
        Illustrative development workflow
      </div>

      <style>{`
        .digital-dev-section {
          padding: 72px 48px;
        }
        @media (max-width: 900px) {
          .digital-dev-section {
            padding: 48px 24px;
            gap: 32px;
          }
          .digital-dev-header {
            gap: 28px !important;
          }
        }
        @media (max-width: 600px) {
          .digital-dev-section {
            padding: 36px 16px;
            gap: 24px;
          }
          .digital-dev-header {
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
