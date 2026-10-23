import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function BusinessApps({ onSelectTopic }) {
  return (
    <section
      id="business-apps"
      className="business-section"
      style={{
        position: 'relative',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div
        className="business-container"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)',
            gap: '48px',
            alignItems: 'center',
          }}
          className="business-grid"
        >
          {/* Left Column: Stat & Heading */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
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
              <span>05 / BUSINESS APPLICATIONS AND APIS</span>
            </div>

            {/* Large API Monogram */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(48px, 6vw, 76px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: '#c8ff3d',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              API
            </div>

            <h3
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.035em',
                color: '#ffffff',
                marginBottom: '20px',
              }}
            >
              Connect the tools your business uses.
            </h3>

            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'rgba(237, 233, 232, 0.75)',
                maxWidth: '460px',
              }}
            >
              Business web applications and API integrations bring your data, systems and daily workflows together.
            </p>
          </div>

          {/* Right Column: Pitch Card matching Frame 06 */}
          <div
            className="business-card"
            style={{
              background: 'rgba(18, 17, 17, 0.78)',
              border: '1px solid rgba(237, 233, 232, 0.14)',
              borderRadius: '12px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Top-right corner tick */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '12px',
                height: '12px',
                borderTop: '1.5px solid #c8ff3d',
                borderRight: '1.5px solid #c8ff3d',
              }}
            />

            <h3
              style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              Built around you.
              <br />
              <span style={{ color: 'rgba(237, 233, 232, 0.5)' }}>
                Connected by design.
              </span>
            </h3>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'rgba(237, 233, 232, 0.72)',
                marginBottom: '32px',
              }}
            >
              Custom software should fit your workflow. We build business applications and connect the services you rely on.
            </p>

            {/* Points List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '36px',
              }}
            >
              {/* Point 01 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  padding: '18px 20px',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(237, 233, 232, 0.08)',
                  borderRadius: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#c8ff3d',
                    paddingTop: '2px',
                  }}
                >
                  01
                </span>
                <div>
                  <h4
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '4px',
                    }}
                  >
                    Business web applications.
                  </h4>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'rgba(237, 233, 232, 0.65)',
                    }}
                  >
                    Tools built around your operations.
                  </p>
                </div>
              </div>

              {/* Point 02 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  padding: '18px 20px',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(237, 233, 232, 0.08)',
                  borderRadius: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#c8ff3d',
                    paddingTop: '2px',
                  }}
                >
                  02
                </span>
                <div>
                  <h4
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '4px',
                    }}
                  >
                    API integrations.
                  </h4>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'rgba(237, 233, 232, 0.65)',
                    }}
                  >
                    Connect systems and share data.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <a
              href="#contact"
              onClick={() => {
                if (onSelectTopic) onSelectTopic('Custom software & API integrations');
              }}
              style={{
                background: '#c8ff3d',
                color: '#000000',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 16px rgba(200, 255, 61, 0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              Discuss Your Application <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .business-section {
          padding: 90px 0;
        }
        .business-container {
          padding: 0 36px;
        }
        .business-card {
          padding: 40px 36px;
        }
        @media (max-width: 900px) {
          .business-section {
            padding: 60px 0;
          }
          .business-container {
            padding: 0 24px;
          }
          .business-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .business-card {
            padding: 32px 24px;
          }
        }
        @media (max-width: 600px) {
          .business-section {
            padding: 44px 0;
          }
          .business-container {
            padding: 0 16px;
          }
          .business-card {
            padding: 24px 16px;
          }
        }
      `}</style>
    </section>
  );
}
