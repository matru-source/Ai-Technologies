import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function ScopeExplorer({ onApplyScope }) {
  const features = [
    {
      id: 'frontend',
      symbol: '✦',
      name: 'Frontend & Mobile UX',
      subtitle: 'Responsive web apps, mobile UI/UX, animations & design systems',
      units: 24,
    },
    {
      id: 'backend',
      symbol: '◈',
      name: 'Backend & API Engine',
      subtitle: 'Scalable microservices, databases, GraphQL/REST endpoints & auth',
      units: 20,
    },
    {
      id: 'ai_engine',
      symbol: '✳',
      name: 'AI & Automation Layer',
      subtitle: 'Intelligent agents, automated pipelines & custom LLM integration',
      units: 20,
    },
    {
      id: 'devops',
      symbol: '⎈',
      name: 'Cloud & DevOps Infra',
      subtitle: 'CI/CD deployment, monitoring, containerization & security',
      units: 16,
    },
  ];

  const [selectedIds, setSelectedIds] = useState(['frontend', 'backend']);

  const toggleFeature = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalSelectedUnits = features
    .filter((f) => selectedIds.includes(f.id))
    .reduce((sum, f) => sum + f.units, 0);

  const totalUnits = 80;

  return (
    <section
      id="scope-explorer"
      className="scope-section"
      style={{
        position: 'relative',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div
        className="scope-container"
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
            <span>04 / CUSTOM SOFTWARE DEVELOPMENT</span>
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
            Your requirements.
            <br />
            <span style={{ color: 'rgba(237, 233, 232, 0.5)' }}>
              Your custom solution.
            </span>
          </h2>

          <p
            style={{
              fontSize: '17px',
              color: 'rgba(237, 233, 232, 0.72)',
              maxWidth: '620px',
              lineHeight: 1.5,
            }}
          >
            Explore modular architectural layers for your application. Select the components you need to view your tailored project scope estimation.
          </p>
        </div>

        {/* Feature Toggles + Unit Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.15fr)',
            gap: '24px',
            marginBottom: '20px',
          }}
          className="scope-grid"
        >
          {/* Left: 4 Building Block Buttons */}
          <div className="scope-buttons-grid">
            {features.map((feat) => {
              const isSelected = selectedIds.includes(feat.id);
              return (
                <button
                  key={feat.id}
                  onClick={() => toggleFeature(feat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '18px 18px',
                    borderRadius: '8px',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(200, 255, 61, 0.16) 0%, rgba(0, 0, 0, 0.6) 100%)'
                      : 'rgba(0, 0, 0, 0.55)',
                    border: `1px solid ${
                      isSelected ? '#c8ff3d' : 'rgba(237, 233, 232, 0.12)'
                    }`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.25s',
                  }}
                >
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      display: 'grid',
                      placeItems: 'center',
                      background: isSelected ? '#c8ff3d' : 'rgba(237, 233, 232, 0.08)',
                      color: isSelected ? '#000' : '#ede9e8',
                      fontSize: '16px',
                      flexShrink: 0,
                      transition: 'background 0.25s',
                    }}
                  >
                    {feat.symbol}
                  </span>

                  <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                      }}
                    >
                      {feat.name}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'rgba(237, 233, 232, 0.65)',
                        lineHeight: 1.3,
                      }}
                    >
                      {feat.subtitle}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isSelected ? '#c8ff3d' : 'rgba(237, 233, 232, 0.45)',
                        marginTop: '2px',
                      }}
                    >
                      {feat.units} SCOPE UNITS
                    </span>
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: isSelected ? '#c8ff3d' : 'rgba(237, 233, 232, 0.4)',
                    }}
                  >
                    {isSelected ? '✓' : '+'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: 80 Units Visualization Grid */}
          <div
            className="scope-units-panel"
            style={{
              borderRadius: '10px',
              background: 'rgba(19, 18, 18, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Scope Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(237, 233, 232, 0.6)',
                }}
              >
                ILLUSTRATIVE APPLICATION SCOPE
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(237, 233, 232, 0.18)',
                  color: '#ede9e8',
                }}
              >
                {totalUnits} UNITS
              </span>
            </div>

            {/* 16-Column Grid of 80 Tiles */}
            <div
              className="scope-tiles-grid"
              style={{
                padding: '14px 0',
              }}
            >
              {Array.from({ length: totalUnits }).map((_, idx) => {
                const isLit = idx < totalSelectedUnits;
                return (
                  <span
                    key={idx}
                    style={{
                      display: 'block',
                      aspectRatio: '1',
                      borderRadius: '3px',
                      background: isLit ? '#c8ff3d' : 'rgba(237, 233, 232, 0.08)',
                      boxShadow: isLit ? '0 0 6px rgba(200, 255, 61, 0.4)' : 'none',
                      transition: 'background 0.25s, box-shadow 0.25s',
                    }}
                  />
                );
              })}
            </div>

            {/* Total Counter */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '38px',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                }}
              >
                {totalSelectedUnits}
                <span style={{ color: 'rgba(237, 233, 232, 0.45)', fontSize: '0.5em', marginLeft: '6px' }}>
                  / {totalUnits} units selected
                </span>
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(237, 233, 232, 0.6)',
                }}
              >
                {selectedIds.length} {selectedIds.length === 1 ? 'feature' : 'features'}
              </span>
            </div>

            {/* Feature Pills */}
            <div
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                paddingTop: '12px',
                borderTop: '1px solid rgba(237, 233, 232, 0.08)',
              }}
            >
              {features.map((feat) => {
                const isSelected = selectedIds.includes(feat.id);
                return (
                  <span
                    key={feat.id}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: isSelected ? '#ede9e8' : 'rgba(237, 233, 232, 0.35)',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: isSelected ? '#c8ff3d' : 'rgba(237, 233, 232, 0.2)',
                      }}
                    />
                    {feat.name}
                  </span>
                );
              })}
            </div>

            {/* Apply Scope Button */}
            {onApplyScope && (
              <div style={{ paddingTop: '10px' }}>
                <button
                  onClick={() => onApplyScope({ selectedIds, totalSelectedUnits })}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(200, 255, 61, 0.1)',
                    border: '1px solid #c8ff3d',
                    color: '#c8ff3d',
                    fontWeight: 600,
                    fontSize: '12px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c8ff3d';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(200, 255, 61, 0.1)';
                    e.currentTarget.style.color = '#c8ff3d';
                  }}
                >
                  Apply scope to project <ArrowUpRight size={13} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Caption */}
        <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.45)' }}>
          Illustrative scope explorer. Units are examples, not pricing or delivery estimates.
        </p>
      </div>

      <style>{`
        .scope-section {
          padding: 90px 0;
        }
        .scope-container {
          padding: 0 36px;
        }
        .scope-buttons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
          align-content: start;
        }
        .scope-units-panel {
          padding: 28px;
        }
        .scope-tiles-grid {
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          gap: 5px;
        }
        @media (max-width: 900px) {
          .scope-section {
            padding: 60px 0;
          }
          .scope-container {
            padding: 0 24px;
          }
          .scope-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .scope-section {
            padding: 44px 0;
          }
          .scope-container {
            padding: 0 16px;
          }
          .scope-buttons-grid {
            grid-template-columns: 1fr;
          }
          .scope-units-panel {
            padding: 20px 14px;
          }
          .scope-tiles-grid {
            grid-template-columns: repeat(10, 1fr);
            gap: 4px;
          }
        }
      `}</style>
    </section>
  );
}
