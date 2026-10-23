import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Do you develop websites and mobile apps?',
      a: 'Yes. We create responsive websites, iOS and Android applications, and custom business software tailored to your specific needs.',
    },
    {
      q: 'How much will my project cost?',
      a: 'Cost depends on scope, features, and technical complexity. We define the project requirements together first so you receive a clear, upfront estimate.',
    },
    {
      q: 'Can you integrate AI into existing software?',
      a: 'Yes. We connect intelligent language models, RAG workflows, and automation APIs directly into your current databases and software tools.',
    },
    {
      q: 'Do you build custom business applications?',
      a: 'Yes. We engineer internal tools, customer portals, dashboards, and automated backend systems designed around your team’s operational workflows.',
    },
    {
      q: 'How long does development take?',
      a: 'A focused website or MVP typically takes 3 to 6 weeks, while larger full-scale enterprise software applications range from 8 to 14 weeks.',
    },
    {
      q: 'How do I start a project?',
      a: 'Reach out through our contact form. We’ll schedule a discovery conversation to discuss your goals, explore the right technical approach, and outline the next steps.',
    },
  ];

  return (
    <section
      id="faq"
      className="faq-section"
      style={{
        position: 'relative',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div
        className="faq-container"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.4fr)',
            gap: '48px',
          }}
          className="faq-grid"
        >
          {/* Left Column: Intro */}
          <div>
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
              <span>09 / BEFORE WE BUILD</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(36px, 4.8vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                marginBottom: '20px',
              }}
            >
              Questions
            </h2>

            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'rgba(237, 233, 232, 0.7)',
                maxWidth: '420px',
              }}
            >
              Common questions about our process, timelines, and how we build custom digital solutions.
            </p>
          </div>

          {/* Right Column: Accordion Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    border: `1px solid ${
                      isOpen ? 'rgba(200, 255, 61, 0.4)' : 'rgba(237, 233, 232, 0.12)'
                    }`,
                    borderRadius: '10px',
                    background: isOpen ? 'rgba(200, 255, 61, 0.04)' : 'rgba(18, 17, 17, 0.65)',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <button
                    className="faq-accordion-btn"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ffffff',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: isOpen ? '#c8ff3d' : '#ffffff',
                        transition: 'color 0.2s',
                      }}
                    >
                      {faq.q}
                    </span>

                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: isOpen ? 'rgba(200, 255, 61, 0.15)' : 'rgba(237, 233, 232, 0.06)',
                        color: isOpen ? '#c8ff3d' : 'rgba(237, 233, 232, 0.6)',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s, color 0.2s',
                      }}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className="faq-accordion-body"
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.65,
                        color: 'rgba(237, 233, 232, 0.8)',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          padding: 90px 0;
        }
        .faq-container {
          padding: 0 36px;
        }
        .faq-accordion-btn {
          padding: 22px 24px;
        }
        .faq-accordion-body {
          padding: 0 24px 24px;
        }
        @media (max-width: 900px) {
          .faq-section {
            padding: 60px 0;
          }
          .faq-container {
            padding: 0 24px;
          }
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 600px) {
          .faq-section {
            padding: 44px 0;
          }
          .faq-container {
            padding: 0 16px;
          }
          .faq-accordion-btn {
            padding: 16px 14px;
          }
          .faq-accordion-body {
            padding: 0 14px 18px;
          }
        }
      `}</style>
    </section>
  );
}
