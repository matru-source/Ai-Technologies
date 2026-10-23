import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight, Plus, Minus } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function AboutAgency({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState('ai');

  const tabs = [
    {
      id: 'web',
      name: 'Websites',
      desc: 'Modern, high-performance websites engineered for conversion, search visibility, and seamless user experience across all devices.',
    },
    {
      id: 'mobile',
      name: 'Mobile apps',
      desc: 'Native iOS and Android mobile applications crafted with Swift and Kotlin, focused on intuitive gestures and reliable offline workflows.',
    },
    {
      id: 'software',
      name: 'Custom software',
      desc: 'Purpose-built internal tools, client portals, and cloud backends designed directly around your company’s unique business logic.',
    },
    {
      id: 'ai',
      name: 'AI integration',
      desc: 'Embedding modern language models, automated agent pipelines, and intelligent search into existing business databases and operational tools.',
    },
  ];

  return (
    <section
      id="about-agency"
      data-framer-name="About Agency"
      className="about-section"
      style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
          gap: '64px',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* Left Column: Heading, Description, and CTAs */}
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
              style={{ width: 16, height: 16, objectFit: 'contain', flexShrink: 0 }}
            />
            <span>ABOUT AI TECHNOLOGIES</span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 'clamp(40px, 5.2vw, 64px)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#ede9e8',
              margin: '0 0 24px 0',
            }}
          >
            Building solutions.
            <br />
            <span>Creating possibilities.</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: '18px',
              lineHeight: 1.5,
              color: 'rgba(237, 233, 232, 0.72)',
              maxWidth: '480px',
              margin: '0 0 36px 0',
            }}
          >
            AI Technologies develops websites, Android and iOS applications, custom software and AI-powered business solutions.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
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
                fontSize: '14px',
                padding: '12px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
            >
              Start a Project <ArrowUpRight size={15} />
            </a>

            <a
              href="#how-we-work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(10, 10, 10, 0.6)',
                border: '1px solid rgba(237, 233, 232, 0.18)',
                color: '#ede9e8',
                fontWeight: 500,
                fontSize: '14px',
                padding: '12px 18px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c8ff3d';
                e.currentTarget.style.color = '#c8ff3d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.18)';
                e.currentTarget.style.color = '#ede9e8';
              }}
            >
              Explore Our Approach <ChevronRight size={15} />
            </a>
          </div>
        </div>

        {/* Right Column: Stacked Interactive Service Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  borderRadius: '12px',
                  backgroundColor: isActive ? '#c8ff3d' : 'rgba(10, 10, 10, 0.85)',
                  border: `1px solid ${isActive ? '#c8ff3d' : 'rgba(237, 233, 232, 0.12)'}`,
                  color: isActive ? '#000000' : '#ede9e8',
                  padding: isActive ? '20px 24px' : '18px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive
                    ? '0 0 32px rgba(200, 255, 61, 0.25), 0 12px 24px rgba(0, 0, 0, 0.5)'
                    : '0 4px 16px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '1px',
                        backgroundColor: isActive ? '#000000' : '#c8ff3d',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '18px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {tab.name}
                    </span>
                  </div>
                  <div>
                    {isActive ? <Minus size={18} color="#000000" /> : <Plus size={18} color="rgba(237, 233, 232, 0.5)" />}
                  </div>
                </div>

                {isActive && (
                  <p
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      lineHeight: 1.5,
                      color: 'rgba(0, 0, 0, 0.85)',
                      margin: '14px 0 0 20px',
                    }}
                  >
                    {tab.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 90px 48px;
        }
        @media (max-width: 900px) {
          .about-section {
            padding: 60px 24px;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .about-section {
            padding: 48px 16px;
          }
          .about-grid {
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
