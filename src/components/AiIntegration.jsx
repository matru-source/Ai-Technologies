import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function AiIntegration() {
  const models = [
    {
      id: 'atlas',
      letter: 'A',
      name: 'Atlas',
      badge: 'Chat & copilots',
      prompt: 'Connect an AI assistant to a business workflow.',
      outputTitle: 'Explore possible AI integration workflows.',
      outputDesc:
        'This animation illustrates a workflow; it does not call a live service.',
      endpoint: 'POST /v1/chat/completions',
    },
    {
      id: 'nova',
      letter: 'N',
      name: 'Nova',
      badge: 'Multilingual apps',
      prompt: 'Translate and localize content in real-time.',
      outputTitle: 'High-fidelity multilingual translation models.',
      outputDesc:
        'Fine-tuned for enterprise terminology and regional compliance across 40+ locales.',
      endpoint: 'POST /v1/translations',
    },
    {
      id: 'sage',
      letter: 'S',
      name: 'Sage',
      badge: 'Reasoning',
      prompt: 'Synthesize data and automate multi-step logic.',
      outputTitle: 'Chain-of-thought verification for complex logic.',
      outputDesc:
        'Automated multi-step reasoning for financial auditing, policy checks, and structured pipelines.',
      endpoint: 'POST /v1/reasoning/chain',
    },
    {
      id: 'swift',
      letter: 'F',
      name: 'Swift',
      badge: 'Fast assistants',
      prompt: 'Low-latency search and interactive Q&A.',
      outputTitle: 'Ultra-low 12ms first-token latency assistants.',
      outputDesc:
        'Streamlined responses designed for real-time conversational user interfaces and autocomplete.',
      endpoint: 'POST /v1/completions/fast',
    },
    {
      id: 'echo',
      letter: 'E',
      name: 'Echo',
      badge: 'Speech to text',
      prompt: 'Real-time transcription and voice commands.',
      outputTitle: 'High-accuracy audio transcription & diarization.',
      outputDesc:
        'Studio-grade speech-to-text processing, background noise isolation, and multilingual recognition.',
      endpoint: 'POST /v1/audio/transcriptions',
    },
    {
      id: 'pico',
      letter: 'P',
      name: 'Pico',
      badge: 'Lightweight AI',
      prompt: 'Embed small models directly in edge apps.',
      outputTitle: 'Compact quantized model weights for edge runtime.',
      outputDesc:
        'Optimized for mobile devices, browser WASM, and offline edge gateways without cloud latency.',
      endpoint: 'POST /v1/edge/inference',
    },
  ];

  const [activeModelId, setActiveModelId] = useState('atlas');
  const current = models.find((m) => m.id === activeModelId) || models[0];

  return (
    <section
      id="ai-integration"
      className="ai-integration-section"
      style={{
        position: 'relative',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div
        className="ai-integration-container"
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
            <span>03 / AI INTEGRATION AND AUTOMATION</span>
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
            Intelligent workflows.
            <br />
            <span style={{ color: 'rgba(237, 233, 232, 0.5)' }}>
              Less repetitive work.
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
            Connect AI to your business. Automate tasks across your existing tools.
          </p>
        </div>

        {/* Model Picker Console Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)',
            gap: '20px',
            marginBottom: '32px',
          }}
          className="model-picker-grid"
        >
          {/* Models Grid: 2 columns on mobile, matching Reference Image */}
          <div className="models-picker-list">
            {models.map((m) => {
              const isSelected = activeModelId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModelId(m.id)}
                  className={`model-card-btn ${isSelected ? 'model-card-active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: isSelected
                      ? 'rgba(200, 255, 61, 0.06)'
                      : 'rgba(14, 13, 13, 0.75)',
                    border: `1px solid ${
                      isSelected ? '#c8ff3d' : 'rgba(237, 233, 232, 0.09)'
                    }`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isSelected ? '0 0 16px rgba(200, 255, 61, 0.15)' : 'none',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                      background: isSelected ? '#c8ff3d' : 'rgba(237, 233, 232, 0.08)',
                      color: isSelected ? '#000000' : '#ede9e8',
                      flexShrink: 0,
                    }}
                  >
                    {m.letter}
                  </span>

                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, overflow: 'hidden' }}>
                    <span
                      className="model-card-title"
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {m.name}
                    </span>
                    <span
                      className="model-card-badge"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'rgba(237, 233, 232, 0.55)',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {m.badge}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Output Console */}
          <div
            className="ai-output-console"
            style={{
              background: 'rgba(14, 13, 13, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
            }}
          >
            <div>
              {/* Top Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
                  marginBottom: '20px',
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
                  EXAMPLE REQUEST
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#c8ff3d',
                      backgroundColor: 'rgba(200, 255, 61, 0.1)',
                      border: '1px solid rgba(200, 255, 61, 0.3)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    INTERACTIVE UI PREVIEW
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ede9e8',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#c8ff3d',
                        boxShadow: '0 0 6px #c8ff3d',
                      }}
                    />
                    {current.name} &bull; preview
                  </span>
                </div>
              </div>

              {/* Prompt Quote with bottom divider */}
              <div
                style={{
                  fontSize: 'clamp(18px, 2.2vw, 24px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.3,
                  color: '#ffffff',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
                  marginBottom: '20px',
                }}
              >
                &ldquo;{current.prompt}&rdquo;
              </div>

              {/* Output Label */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(237, 233, 232, 0.55)',
                  marginBottom: '12px',
                }}
              >
                OUTPUT CAPABILITY SPECIFICATION
              </div>

              {/* Output Content: Clean typography matching Image 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#ffffff',
                    lineHeight: 1.4,
                  }}
                >
                  {current.outputTitle || current.output}
                </div>
                {current.outputDesc && (
                  <div
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.55,
                      color: 'rgba(237, 233, 232, 0.65)',
                    }}
                  >
                    {current.outputDesc}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions & API Specification */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                marginTop: '24px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(237, 233, 232, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(200, 255, 61, 0.08)',
                  border: '1px solid rgba(200, 255, 61, 0.25)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#c8ff3d',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#c8ff3d',
                  }}
                >
                  {current.endpoint}
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(237, 233, 232, 0.55)',
                }}
              >
                PRODUCTION API ARCHITECTURE
              </span>

              <div
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(237, 233, 232, 0.5)',
                  marginTop: '6px',
                  lineHeight: 1.4,
                }}
              >
                * AI Technologies engineers secure API integration layers connecting these model architectures directly to your databases, mobile apps, and business software.
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            paddingTop: '16px',
            borderTop: '1px solid rgba(237, 233, 232, 0.08)',
          }}
        >
          <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.5)' }}>
            Illustrative AI workflows, not a live service or customer result.
          </p>

          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: '8px',
              border: '1px solid rgba(237, 233, 232, 0.25)',
              background: 'rgba(0, 0, 0, 0.25)',
              color: '#ede9e8',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c8ff3d';
              e.currentTarget.style.color = '#c8ff3d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.25)';
              e.currentTarget.style.color = '#ede9e8';
            }}
          >
            Discuss AI Integration <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        .ai-integration-section {
          padding: 90px 0;
        }
        .ai-integration-container {
          padding: 0 36px;
        }
        .ai-output-console {
          padding: 28px;
          min-height: 440px;
        }
        .models-picker-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        @media (max-width: 900px) {
          .ai-integration-section {
            padding: 60px 0;
          }
          .ai-integration-container {
            padding: 0 24px;
          }
          .model-picker-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .models-picker-list {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 600px) {
          .ai-integration-section {
            padding: 44px 0;
          }
          .ai-integration-container {
            padding: 0 16px;
          }
          .ai-output-console {
            padding: 20px 14px;
            min-height: auto;
          }
          .models-picker-list {
            gap: 8px !important;
          }
          .model-card-btn {
            padding: 10px 10px !important;
            gap: 8px !important;
          }
          .model-card-title {
            font-size: 13.5px !important;
          }
          .model-card-badge {
            font-size: 8.5px !important;
          }
        }
      `}</style>
    </section>
  );
}
