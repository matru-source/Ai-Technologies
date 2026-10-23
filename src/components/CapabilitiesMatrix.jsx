import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function CapabilitiesMatrix({ onOpenContact }) {
  const headers = [
    { label: 'YOUR PRIORITIES', sub: '', isMain: false },
    { label: 'OUR CAPABILITIES', sub: 'AI Technologies', isMain: true },
    { label: '01 / WEB', sub: 'Websites', isMain: false },
    { label: '02 / MOBILE', sub: 'Mobile apps', isMain: false },
    { label: '03 / SOFTWARE', sub: 'Business software', isMain: false },
  ];

  const rows = [
    {
      priority: 'User experience',
      aiTec: 'Designed around your users.',
      web: 'Responsive website experiences.',
      mobile: 'Android and iOS applications.',
      software: 'Custom business interfaces.',
    },
    {
      priority: 'Connected systems',
      aiTec: 'Integrations shaped to your needs.',
      web: 'Connect websites to business tools.',
      mobile: 'Connect mobile apps to APIs.',
      software: 'Connect workflows and data.',
    },
    {
      priority: 'Custom functionality',
      aiTec: 'Features built for your audience.',
      web: 'Modular features for your business.',
      mobile: 'Mobile features for your users.',
      software: 'Software for your operations.',
    },
    {
      priority: 'Project planning',
      aiTec: 'Scope agreed before development.',
      web: 'Plan your website requirements.',
      mobile: 'Define your mobile app scope.',
      software: 'Map software and integrations.',
    },
  ];

  return (
    <section
      id="capabilities-matrix"
      data-framer-name="Capabilities Matrix"
      className="capabilities-section"
      style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      {/* Header: Two Columns */}
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '40px',
          marginBottom: '20px',
        }}
      >
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#c8ff3d',
              marginBottom: '20px',
            }}
          >
            <img
              src={aitechEmblem}
              alt="AI Technologies"
              style={{ width: 14, height: 14, objectFit: 'contain', flexShrink: 0 }}
            />
            <span>CAPABILITIES MATRIX &mdash; WHAT WE DO</span>
          </div>

          <h2
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 'clamp(40px, 5.2vw, 64px)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#ede9e8',
              margin: 0,
            }}
          >
            Start with your goals.
            <br />
            <span>Build what matters.</span>
          </h2>
        </div>

        <p
          style={{
            fontFamily: '"Geist", sans-serif',
            fontSize: '18px',
            lineHeight: 1.5,
            color: 'rgba(237, 233, 232, 0.72)',
            maxWidth: '440px',
            margin: 0,
            paddingBottom: '8px',
          }}
        >
          We turn business requirements into purposeful digital experiences, connecting the web, mobile devices and the systems you use.
        </p>
      </div>

      <p
        style={{
          fontFamily: '"Geist", sans-serif',
          fontSize: '14px',
          color: 'rgba(237, 233, 232, 0.5)',
          marginBottom: '32px',
        }}
      >
        Our service capabilities across websites, mobile applications and business software.
      </p>

      {/* Comparison Matrix Table Card */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          borderRadius: '16px',
          border: '1px solid rgba(237, 233, 232, 0.12)',
          backgroundColor: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ minWidth: '940px' }}>
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.4fr 1.3fr 1.3fr 1.3fr',
              borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
            }}
          >
            {headers.map((h, idx) => (
              <div
                key={idx}
                style={{
                  padding: '20px 24px',
                  backgroundColor: h.isMain ? 'rgba(200, 255, 61, 0.04)' : 'transparent',
                  borderRight: idx < headers.length - 1 ? '1px solid rgba(237, 233, 232, 0.08)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: h.isMain ? '#c8ff3d' : 'rgba(237, 233, 232, 0.5)',
                    marginBottom: '4px',
                  }}
                >
                  {h.label}
                </div>
                {h.sub && (
                  <div
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: h.isMain ? '#c8ff3d' : '#ede9e8',
                    }}
                  >
                    {h.sub}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {rows.map((row, rIdx) => (
            <div
              key={rIdx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1.4fr 1.3fr 1.3fr 1.3fr',
                borderBottom: rIdx < rows.length - 1 ? '1px solid rgba(237, 233, 232, 0.08)' : 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {/* Priority Label */}
              <div
                style={{
                  padding: '24px',
                  fontFamily: '"Geist", sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#ede9e8',
                  borderRight: '1px solid rgba(237, 233, 232, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {row.priority}
              </div>

              {/* AI Tecnologies (Main) */}
              <div
                style={{
                  padding: '24px',
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.45,
                  color: '#ede9e8',
                  backgroundColor: 'rgba(200, 255, 61, 0.04)',
                  borderRight: '1px solid rgba(237, 233, 232, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 500,
                }}
              >
                {row.aiTec}
              </div>

              {/* Web */}
              <div
                style={{
                  padding: '24px',
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.45,
                  color: 'rgba(237, 233, 232, 0.65)',
                  borderRight: '1px solid rgba(237, 233, 232, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {row.web}
              </div>

              {/* Mobile */}
              <div
                style={{
                  padding: '24px',
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.45,
                  color: 'rgba(237, 233, 232, 0.65)',
                  borderRight: '1px solid rgba(237, 233, 232, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {row.mobile}
              </div>

              {/* Software */}
              <div
                style={{
                  padding: '24px',
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.45,
                  color: 'rgba(237, 233, 232, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {row.software}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Next Step CTA Card */}
      <div
        style={{
          marginTop: '20px',
          padding: '20px 28px',
          borderRadius: '12px',
          backgroundColor: 'rgba(10, 10, 10, 0.85)',
          border: '1px solid rgba(237, 233, 232, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#ede9e8',
              marginBottom: '3px',
            }}
          >
            Your next step
          </div>
          <div
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: '14px',
              color: 'rgba(237, 233, 232, 0.6)',
            }}
          >
            Let's discuss the solution your business needs.
          </div>
        </div>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onOpenContact();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#c8ff3d',
            color: '#000000',
            fontWeight: 600,
            fontSize: '13px',
            padding: '10px 18px',
            borderRadius: '8px',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
        >
          Start a Project <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Bottom Small Caption */}
      <div
        style={{
          marginTop: '16px',
          fontFamily: '"Geist", sans-serif',
          fontSize: '12px',
          color: 'rgba(237, 233, 232, 0.45)',
        }}
      >
        Capabilities shown are service areas, not competitor comparisons or promised results.
      </div>

      <style>{`
        .capabilities-section {
          padding: 90px 48px;
        }
        @media (max-width: 900px) {
          .capabilities-section {
            padding: 60px 24px;
          }
        }
        @media (max-width: 600px) {
          .capabilities-section {
            padding: 48px 16px;
          }
        }
      `}</style>
    </section>
  );
}
