import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function SolutionGuides() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    if (selectedGuide) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedGuide(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedGuide]);

  const guides = [
    {
      id: 'website',
      tag: 'goals → website',
      category: 'Web Architecture',
      title: 'Planning an Enterprise Business Website',
      summary: 'A structured methodology for translating commercial objectives into responsive, SEO-ready web applications with sub-second page performance.',
      readTime: '6 min read',
      content: {
        intro: 'Modern web platforms must balance visual elegance, rapid rendering, and search authority. This guide outlines how we structure high-impact web deployments.',
        sections: [
          {
            heading: '1. Establish Clear Conversion Objectives',
            body: 'Define primary conversion funnels upfront. Whether booking demo calls or driving self-serve SaaS subscriptions, the information hierarchy should guide user attention seamlessly.',
          },
          {
            heading: '2. Edge Rendering & Performance Budgets',
            body: 'Adopt Next.js Static Site Generation (SSG) with Incremental Static Regeneration (ISR). Keep initial JavaScript bundles under 60KB to guarantee 95+ Google Lighthouse scores.',
          },
          {
            heading: '3. Responsive Design & Accessibility (a11y)',
            body: 'Build with fluid CSS clamps, accessible semantic landmark tags, and high-contrast dark/light mode standards for universal device support.',
          },
        ],
        checklist: [
          'Sub-second First Contentful Paint (FCP)',
          'Automated OpenGraph metadata generator',
          'Integrated cookie-less privacy analytics',
          'Dynamic sitemap & schema.org structured data',
        ],
      },
    },
    {
      id: 'mobile_ai',
      tag: 'app → AI',
      category: 'Mobile & Agents',
      title: 'Connecting Mobile Apps with AI Workflows',
      summary: 'Explore architectural patterns for integrating iOS and Android native applications with cloud LLMs and on-device CoreML / ONNX models.',
      readTime: '8 min read',
      content: {
        intro: 'Mobile AI experiences require low-latency streaming and graceful offline fallbacks. Here is how we bridge mobile clients to intelligent agent engines.',
        sections: [
          {
            heading: '1. Hybrid Cloud & On-Device Routing',
            body: 'Run lightweight intent detection and tokenization locally using quantized models, reserving cloud LLM endpoints for heavy reasoning and retrieval.',
          },
          {
            heading: '2. Streaming Server-Sent Events (SSE)',
            body: 'Stream tokens chunk-by-chunk over HTTP/2 SSE connections so users receive instant visual feedback without waiting for full response generation.',
          },
          {
            heading: '3. Battery & Memory Preservation',
            body: 'Leverage native background workers and neural processing units (Apple Neural Engine / Qualcomm NPU) to minimize battery drain.',
          },
        ],
        checklist: [
          'SSE token streaming with cancellation support',
          'Biometric authentication on sensitive AI actions',
          'Offline cached embeddings database',
          'Telemetry for model response accuracy and latency',
        ],
      },
    },
    {
      id: 'software',
      tag: 'tools → workflow',
      category: 'Systems & APIs',
      title: 'Designing Connected Business Software',
      summary: 'A blueprint for engineering custom business portals, microservices, and unified API meshes that eradicate disconnected data silos.',
      readTime: '7 min read',
      content: {
        intro: 'Custom internal software must align strictly with day-to-day operations. Learn how we engineer scalable architectures that teams actually love using.',
        sections: [
          {
            heading: '1. Single Source of Truth Architecture',
            body: 'Avoid dual-write synchronization bugs by standardizing on event-driven architectures with transactional outbox patterns and idempotent consumers.',
          },
          {
            heading: '2. Modular RBAC & Audit Compliance',
            body: 'Implement role-based permissions at the database level with Row-Level Security (RLS) to enforce strict compliance with SOC2, GDPR, and HIPAA.',
          },
          {
            heading: '3. High-Throughput API Gateway',
            body: 'Expose versioned REST and GraphQL endpoints backed by distributed Redis caches and rate-limit safeguards.',
          },
        ],
        checklist: [
          'Automated OpenAPI / Swagger interactive documentation',
          'Centralized OpenTelemetry logging & tracing',
          'Instant database point-in-time recovery (PITR)',
          'Role-based permission matrix with audit trail',
        ],
      },
    },
  ];

  return (
    <section
      id="solution-guides"
      className="solution-guides-section"
      style={{
        position: 'relative',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div className="container">
        {/* Header */}
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
            <span>08 / SOLUTION GUIDES</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(36px, 4.8vw, 64px)',
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                }}
              >
                Practical ideas.
                <br />
                <span style={{ color: 'rgba(237, 233, 232, 0.5)' }}>
                  Digital possibilities.
                </span>
              </h2>
            </div>

            <a
              href="#contact"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(237, 233, 232, 0.25)',
                color: '#ede9e8',
                fontSize: '13px',
                fontWeight: 600,
                padding: '9px 18px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
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
              Explore the Guides ↗
            </a>
          </div>
        </div>

        {/* 3 Guide Cards */}
        <div
          className="solution-guides-grid"
          style={{
            gap: '24px',
          }}
        >
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="glass-panel has-brackets solution-guide-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(16, 15, 15, 0.75) 0%, rgba(9, 8, 8, 0.95) 100%)',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedGuide(guide)}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: 'rgba(200, 255, 61, 0.12)',
                      border: '1px solid rgba(200, 255, 61, 0.3)',
                      color: 'var(--accent-neon)',
                    }}
                  >
                    {guide.tag}
                  </span>

                  <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {guide.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '14px',
                    lineHeight: '1.3',
                  }}
                >
                  {guide.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '28px',
                  }}
                >
                  {guide.summary}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent-neon)',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                <span>Read technical blueprint</span>
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Guide Reader Modal Portal */}
        {selectedGuide && typeof document !== 'undefined' && createPortal(
          <div
            className="solution-modal-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(4, 4, 4, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflowY: 'auto',
            }}
            onClick={() => setSelectedGuide(null)}
          >
            <div
              className="glass-panel has-brackets solution-modal-content"
              style={{
                width: '100%',
                maxWidth: '780px',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'rgba(12, 11, 11, 0.98)',
                border: '1px solid rgba(200, 255, 61, 0.45)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 35px rgba(200, 255, 61, 0.15)',
                position: 'relative',
                borderRadius: '16px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedGuide(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '8px',
                  borderRadius: '50%',
                  background: 'rgba(237, 233, 232, 0.08)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(237, 233, 232, 0.15)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c8ff3d';
                  e.currentTarget.style.color = '#c8ff3d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.15)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <X size={20} />
              </button>

              <div className="mono" style={{ fontSize: '12px', color: 'var(--accent-neon)', marginBottom: '8px' }}>
                // SOLUTION BLUEPRINT &bull; {selectedGuide.category}
              </div>

              <h2 className="h-title" style={{ fontSize: '28px', marginBottom: '16px' }}>
                {selectedGuide.title}
              </h2>

              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '28px', fontStyle: 'italic' }}>
                {selectedGuide.content.intro}
              </p>

              {/* Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                {selectedGuide.content.sections.map((sec, idx) => (
                  <div key={idx} style={{ padding: '16px', background: 'rgba(237, 233, 232, 0.03)', borderRadius: '6px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {sec.heading}
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div style={{ padding: '20px', background: 'rgba(200, 255, 61, 0.06)', borderRadius: '8px', border: '1px solid rgba(200, 255, 61, 0.2)' }}>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--accent-neon)', marginBottom: '10px' }}>
                  ENGINEERING CHECKLIST:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                  {selectedGuide.content.checklist.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={14} style={{ color: 'var(--accent-neon)', flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>

      <style>{`
        .solution-guides-section {
          padding: 90px 0;
        }
        .solution-guides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }
        .solution-guide-card {
          padding: 36px 30px;
        }
        .solution-modal-overlay {
          padding: 24px;
        }
        .solution-modal-content {
          padding: 40px;
        }
        @media (max-width: 900px) {
          .solution-guides-section {
            padding: 60px 0;
          }
          .solution-guides-grid {
            grid-template-columns: 1fr;
          }
          .solution-guide-card {
            padding: 28px 22px;
          }
        }
        @media (max-width: 600px) {
          .solution-guides-section {
            padding: 44px 0;
          }
          .solution-guide-card {
            padding: 22px 16px;
          }
          .solution-modal-overlay {
            padding: 12px;
          }
          .solution-modal-content {
            padding: 24px 16px;
          }
        }
      `}</style>
    </section>
  );
}
