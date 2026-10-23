import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function FeatureCards({ onOpenContact }) {
  const cards = [
    {
      num: '01',
      title: 'Your goals. Our starting point.',
      body: 'We start by understanding your users, workflows and requirements so the solution fits your business.',
      cta: 'Explore Our Services',
      href: '#services',
    },
    {
      num: '02',
      title: 'Thoughtful design. Purposeful software.',
      body: 'Website, app and software features should support real tasks, not add complexity.',
      cta: 'Discuss Your Workflow',
      href: '#contact',
      isContact: true,
    },
    {
      num: '03',
      title: 'Built for today. Ready for what\'s next.',
      body: 'We shape your project around current needs and discuss how it can evolve as your business changes.',
      cta: 'Explore Integrations',
      href: '#ai-integration',
    },
  ];

  return (
    <section
      data-framer-name="Feature Cards"
      className="feature-cards-section"
      style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      <div className="feature-cards-grid">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="feature-card-item"
            style={{
              position: 'relative',
              borderRadius: '16px',
              backgroundColor: 'rgba(10, 10, 10, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(200, 255, 61, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Top Row: Number & Corner Tick */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: 'rgba(237, 233, 232, 0.45)',
                }}
              >
                {c.num}
              </span>
              <svg viewBox="0 0 30 30" width="10" height="10">
                <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(90 15 15)" />
              </svg>
            </div>

            {/* Middle: Title & Body */}
            <div>
              <h3
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#ede9e8',
                  lineHeight: 1.25,
                  margin: '0 0 12px 0',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: 'rgba(237, 233, 232, 0.65)',
                  margin: 0,
                }}
              >
                {c.body}
              </p>
            </div>

            {/* Bottom Link Button */}
            <div style={{ marginTop: '28px' }}>
              <a
                href={c.href}
                onClick={(e) => {
                  if (c.isContact) {
                    e.preventDefault();
                    onOpenContact();
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(237, 233, 232, 0.14)',
                  color: '#ede9e8',
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '8px 14px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c8ff3d';
                  e.currentTarget.style.color = '#c8ff3d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.14)';
                  e.currentTarget.style.color = '#ede9e8';
                }}
              >
                {c.cta} <ChevronRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .feature-cards-section {
          padding: 0 48px 80px;
        }
        .feature-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }
        .feature-card-item {
          padding: 32px 28px;
        }
        @media (max-width: 900px) {
          .feature-cards-section {
            padding: 0 24px 64px;
          }
          .feature-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .feature-card-item {
            padding: 28px 22px;
          }
        }
        @media (max-width: 600px) {
          .feature-cards-section {
            padding: 0 16px 48px;
          }
          .feature-cards-grid {
            gap: 16px;
          }
          .feature-card-item {
            padding: 24px 18px;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
