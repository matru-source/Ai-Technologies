import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';
import processDiscoverImg from '../assets/process-discover.jpg';
import processDesignImg from '../assets/process-design.jpg';
import processDevelopImg from '../assets/process-develop.jpg';

export default function Process() {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    {
      num: '01',
      kicker: 'Understand your goals',
      title: 'Discover',
      desc: 'Discuss your users, requirements and the problem you want to solve.',
      img: processDiscoverImg,
      imgAlt: 'Software project discovery and requirements planning',
      footerTag: 'Scope before estimates',
    },
    {
      num: '02',
      kicker: 'Shape the experience',
      title: 'Design',
      desc: 'Map the user journey and plan the application before development.',
      img: processDesignImg,
      imgAlt: 'Custom UI/UX design systems and wireframing',
      footerTag: 'Built around your needs',
    },
    {
      num: '03',
      kicker: 'Bring it to life',
      title: 'Develop',
      desc: 'Build, test and refine your website, mobile app or custom software.',
      img: processDevelopImg,
      imgAlt: 'Full-stack software engineering and cloud deployment',
      footerTag: 'Launch and scale your project',
    },
  ];

  return (
    <section
      id="how-we-work"
      className="process-section"
      style={{
        position: 'relative',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div
        className="process-container"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow & Title */}
        <div style={{ marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.12em',
              color: '#c8ff3d',
              textTransform: 'uppercase',
            }}
          >
            <img
              src={aitechEmblem}
              alt="AI Technologies"
              style={{ width: 14, height: 14, objectFit: 'contain', flexShrink: 0 }}
            />
            <span>06 / HOW WE WORK</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(36px, 4.8vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: '18px',
            }}
          >
            Start with clarity.
            <br />
            <span style={{ color: 'rgba(237, 233, 232, 0.5)' }}>
              Build with purpose.
            </span>
          </h2>

          <p
            style={{
              fontSize: '17px',
              color: 'rgba(237, 233, 232, 0.72)',
              maxWidth: '560px',
              lineHeight: 1.5,
            }}
          >
            Define the scope together. Shape a solution around your business.
          </p>
        </div>

        {/* 3 Sequential Staircase Steps Grid */}
        <div
          className="process-steps-grid"
          style={{
            display: 'grid',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {steps.map((step, idx) => {
            const isHovered = hoveredStep === idx;
            return (
              <div
                key={step.num}
                className="process-card"
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  background: 'rgba(18, 17, 17, 0.78)',
                  border: `1px solid ${
                    isHovered ? '#c8ff3d' : 'rgba(237, 233, 232, 0.12)'
                  }`,
                  borderRadius: '12px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  boxShadow: isHovered
                    ? '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(200, 255, 61, 0.12)'
                    : 'none',
                }}
              >
                {/* Top-right corner tick */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '10px',
                    height: '10px',
                    borderTop: `1.5px solid ${isHovered ? '#c8ff3d' : 'rgba(237, 233, 232, 0.25)'}`,
                    borderRight: `1.5px solid ${isHovered ? '#c8ff3d' : 'rgba(237, 233, 232, 0.25)'}`,
                    transition: 'border-color 0.25s',
                  }}
                />

                <div>
                  {/* Step Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '24px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        color: 'rgba(237, 233, 232, 0.45)',
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#c8ff3d',
                      }}
                    >
                      {step.kicker}
                    </span>
                  </div>

                  {/* Title */}
                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '30px',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.03em',
                      marginBottom: '12px',
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: 'rgba(237, 233, 232, 0.7)',
                      marginBottom: '20px',
                    }}
                  >
                    {step.desc}
                  </p>

                  {/* Relatable Card Visual Preview */}
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: `1px solid ${isHovered ? 'rgba(200, 255, 61, 0.3)' : 'rgba(237, 233, 232, 0.08)'}`,
                      background: '#0a0a0a',
                      aspectRatio: '16 / 9',
                      transition: 'all 0.3s ease',
                      boxShadow: isHovered
                        ? '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(200, 255, 61, 0.1)'
                        : '0 4px 14px rgba(0, 0, 0, 0.35)',
                    }}
                  >
                    <img
                      src={step.img}
                      alt={step.imgAlt}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease, filter 0.3s ease',
                        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                        filter: isHovered ? 'contrast(1.05) brightness(1.02)' : 'contrast(1) brightness(0.95)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(10,10,10,0.45) 100%)',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Footer Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(237, 233, 232, 0.08)',
                    marginTop: '20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: '#ede9e8',
                    }}
                  >
                    {step.footerTag}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      color: isHovered ? '#c8ff3d' : 'rgba(237, 233, 232, 0.4)',
                    }}
                  >
                    ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Bar */}
        <div
          className="process-status-bar"
          style={{
            background: 'rgba(18, 17, 17, 0.75)',
            border: '1px solid rgba(237, 233, 232, 0.12)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
              }}
            >
              A CLEAR STARTING POINT
            </span>
            <span style={{ fontSize: '14px', color: '#ede9e8' }}>
              Share your goals so we can discuss the right scope and next steps.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#c8ff3d',
                boxShadow: '0 0 8px #c8ff3d',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#ede9e8',
              }}
            >
              Let’s plan together
            </span>
          </div>
        </div>

        {/* Footer Link & Disclaimer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.45)' }}>
            Project scope, pricing and timelines are discussed individually.
          </p>

          <a
            href="#contact"
            style={{
              background: '#c8ff3d',
              color: '#000000',
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px 22px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 16px rgba(200, 255, 61, 0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            Start a Project <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <style>{`
        .process-section {
          padding: 90px 0;
        }
        .process-container {
          padding: 0 36px;
        }
        .process-steps-grid {
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }
        .process-card {
          padding: 30px 24px;
        }
        .process-status-bar {
          padding: 20px 28px;
        }
        @media (max-width: 900px) {
          .process-section {
            padding: 60px 0;
          }
          .process-container {
            padding: 0 24px;
          }
          .process-steps-grid {
            grid-template-columns: 1fr;
          }
          .process-card {
            padding: 24px 20px;
          }
        }
        @media (max-width: 600px) {
          .process-section {
            padding: 44px 0;
          }
          .process-container {
            padding: 0 16px;
          }
          .process-card {
            padding: 22px 16px;
          }
          .process-status-bar {
            padding: 16px 14px;
          }
        }
      `}</style>
    </section>
  );
}
