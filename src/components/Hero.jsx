import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import heroEmblem from '../assets/aitech-hero-emblem.png';

export default function Hero({ onOpenContact }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let animId = null;
    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      if (!animId) {
        animId = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          animId = null;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div
        className="hero-container"
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            gap: '40px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Authentic Framer Copy */}
          <div style={{ maxWidth: '680px' }}>
            {/* Kicker Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '22px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: '#c8ff3d', fontSize: '13px', lineHeight: 1 }}>✜</span>
              <span style={{ fontWeight: 600, color: '#ede9e8' }}>AI TECHNOLOGIES</span>
              <span style={{ color: 'rgba(200, 255, 61, 0.6)' }}>──</span>
              <span style={{ color: 'rgba(237, 233, 232, 0.75)' }}>DIGITAL SOLUTIONS</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(36px, 8.5vw, 84px)',
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: '-0.04em',
                marginBottom: '24px',
                color: '#ffffff',
              }}
            >
              We Build Today.
              <br />
              <span style={{ color: '#c8ff3d' }}>
                We Innovate
                <br />
                Tomorrow.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(16px, 1.4vw, 19px)',
                lineHeight: 1.5,
                color: 'rgba(237, 233, 232, 0.72)',
                maxWidth: '540px',
                marginBottom: '24px',
                fontWeight: 400,
              }}
            >
              We create modern websites, mobile applications, and intelligent software solutions that help businesses grow.
            </p>

            {/* Sub-badge: [AI Technologies] built for your business. */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '28px',
                fontSize: '13px',
              }}
            >
              <span
                style={{
                  padding: '3px 10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '6px',
                  color: '#ede9e8',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                AI Technologies
              </span>
              <span style={{ color: 'rgba(237, 233, 232, 0.55)' }}>
                built for your business.
              </span>
            </div>

            {/* Action Buttons: Side-by-Side in Row */}
            <div
              className="hero-actions-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                width: '100%',
              }}
            >
              <button
                onClick={onOpenContact}
                className="hero-btn-primary"
                style={{
                  background: '#c8ff3d',
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  flex: 1,
                  height: '48px',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 0 16px rgba(200, 255, 61, 0.25)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(200, 255, 61, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(200, 255, 61, 0.25)';
                }}
              >
                Get started <ArrowUpRight size={16} />
              </button>

              <a
                href="#services"
                className="hero-btn-secondary"
                style={{
                  background: 'rgba(18, 17, 17, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#ede9e8',
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                  flex: 1,
                  height: '48px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(18, 17, 17, 0.85)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                }}
              >
                Explore Our Services <span style={{ fontSize: '12px', marginLeft: '2px' }}>▷</span>
              </a>
            </div>

            {/* Note below buttons */}
            <div
              style={{
                color: 'rgba(237, 233, 232, 0.45)',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              Building Digital Solutions for Tomorrow
            </div>
          </div>

          {/* Right Column: Viewport Frame for 3D Emblem & Particle Halo in Three.js */}
          <div
            className="hero-mark-frame"
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* Ambient Neon Lime Radial Glow Aura that gently fades on scroll */}
            <div
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(200, 255, 61, 0.18) 0%, rgba(200, 255, 61, 0.04) 50%, transparent 70%)',
                filter: 'blur(36px)',
                pointerEvents: 'none',
                opacity: Math.max(0, 1 - scrollY / 350),
                transition: 'opacity 0.2s ease',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 60px 0 80px;
        }
        .hero-container {
          padding: 0 36px;
        }
        .hero-mark-frame {
          min-height: 520px;
        }
        .hero-actions-row {
          max-width: 440px;
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-container {
            padding: 0 24px;
          }
          .hero-mark-frame {
            min-height: 380px;
          }
          .hero-actions-row {
            max-width: 100%;
          }
        }
        @media (max-width: 600px) {
          .hero-section {
            padding: 18px 0 24px;
          }
          .hero-container {
            padding: 0 16px;
          }
          .hero-mark-frame {
            min-height: 280px;
          }
          .hero-actions-row {
            max-width: 100%;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
