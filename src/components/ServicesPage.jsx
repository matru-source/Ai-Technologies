import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';
import DeployCanvas from './DeployCanvas';
import ContactForm from './ContactForm';
import Footer from './Footer';

export default function ServicesPage({ onOpenContact, onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'AI Technologies — Services & Capabilities';
    return () => {
      document.title = 'AI Technologies — Ideas | Innovation | Impact';
    };
  }, []);

  // Model selector state for Section 02
  const models = [
    {
      id: 'atlas',
      letter: 'A',
      name: 'Atlas',
      prompt: 'Connect an AI assistant to a business workflow.',
      output:
        'Explore possible AI integration workflows. This animation illustrates a workflow; it does not call a live service.',
      endpoint: 'POST /v1/chat/completions',
    },
    {
      id: 'nova',
      letter: 'N',
      name: 'Nova',
      prompt: 'Translate and localize business interfaces in real time.',
      output:
        'Multilingual token translation and cultural localization pipeline designed for cross-border enterprise platforms.',
      endpoint: 'POST /v1/translations',
    },
    {
      id: 'sage',
      letter: 'S',
      name: 'Sage',
      prompt: 'Synthesize data and automate multi-step logic.',
      output:
        'Structured chain-of-thought verification for multi-stage financial calculations and regulatory auditing.',
      endpoint: 'POST /v1/reasoning/chain',
    },
    {
      id: 'swift',
      letter: 'F',
      name: 'Swift',
      prompt: 'Low-latency search and interactive user Q&A.',
      output:
        'Ultra-low 12ms first-token latency suitable for conversational mobile apps and responsive autocomplete.',
      endpoint: 'POST /v1/completions/fast',
    },
    {
      id: 'echo',
      letter: 'E',
      name: 'Echo',
      prompt: 'Real-time audio transcription and voice commands.',
      output:
        'High-accuracy audio transcription, noise filtering, and speaker diarization across global languages.',
      endpoint: 'POST /v1/audio/transcriptions',
    },
    {
      id: 'pico',
      letter: 'P',
      name: 'Pico',
      prompt: 'Embed small models directly in edge mobile apps.',
      output:
        'Compact quantized model weights designed for mobile devices, browser WASM, and offline edge gateways.',
      endpoint: 'POST /v1/edge/inference',
    },
  ];
  const [activeModelId, setActiveModelId] = useState('atlas');
  const [isRunningModel, setIsRunningModel] = useState(false);
  const currentModel = models.find((m) => m.id === activeModelId) || models[0];

  const handleRunExample = () => {
    setIsRunningModel(true);
    setTimeout(() => setIsRunningModel(false), 800);
  };

  // Modular Software Architecture & Scope Matrix state for Section 03
  const workloads = [
    { id: 'frontend', symbol: '✦', name: 'Frontend & Mobile UX', units: 24 },
    { id: 'backend', symbol: '◈', name: 'Backend & API Engine', units: 20 },
    { id: 'ai_engine', symbol: '✳', name: 'AI & Automation Layer', units: 20 },
    { id: 'devops', symbol: '⎈', name: 'Cloud & DevOps Infra', units: 16 },
  ];
  const [activeWorkloads, setActiveWorkloads] = useState(['frontend', 'backend']);
  const toggleWorkload = (id) => {
    setActiveWorkloads((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const totalAssignedUnits = workloads
    .filter((w) => activeWorkloads.includes(w.id))
    .reduce((sum, w) => sum + w.units, 0);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* 1. Hero Section */}
      <section
        className="services-page-hero"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
        }}
      >
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
          <span>OUR DEVELOPMENT SERVICES</span>
        </div>

        {/* Title & Quick Jump Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '32px',
            marginBottom: '28px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: 'clamp(44px, 5.8vw, 76px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#ede9e8',
                margin: 0,
              }}
            >
              Digital solutions.
              <br />
              <span>Built for your business.</span>
            </h1>
          </div>

          {/* Quick Jump Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { label: 'WEBSITES', href: '#applications' },
              { label: 'MOBILE APPS', href: '#model-endpoints' },
              { label: 'CUSTOM SOFTWARE', href: '#gpu-capacity' },
              { label: 'AI AND APIS', href: '#kubernetes' },
            ].map((pill, idx) => (
              <a
                key={idx}
                href={pill.href}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '7px 12px',
                  borderRadius: '7px',
                  backgroundColor: 'rgba(10, 10, 10, 0.75)',
                  border: '1px solid rgba(237, 233, 232, 0.12)',
                  color: 'rgba(237, 233, 232, 0.75)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#c8ff3d';
                  e.currentTarget.style.color = '#c8ff3d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.12)';
                  e.currentTarget.style.color = 'rgba(237, 233, 232, 0.75)';
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#c8ff3d',
                  }}
                />
                {pill.label}
              </a>
            ))}
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: '"Geist", sans-serif',
            fontSize: '18px',
            lineHeight: 1.5,
            color: 'rgba(237, 233, 232, 0.7)',
            maxWidth: '640px',
            margin: 0,
          }}
        >
          Website development, Android and iOS applications, custom software, AI automation, business web applications and API integrations.
        </p>
      </section>

      {/* 2. Section 01: Website Development (#applications) */}
      <section
        id="applications"
        className="services-page-section"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          borderTop: '1px solid rgba(237, 233, 232, 0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)',
            gap: '64px',
            alignItems: 'center',
          }}
          className="services-split-grid"
        >
          {/* Left Column */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
                marginBottom: '16px',
              }}
            >
              <img
                src={aitechEmblem}
                alt="AI Technologies"
                style={{ width: 13, height: 13, objectFit: 'contain', flexShrink: 0 }}
              />
              <span>01 / WEBSITE DEVELOPMENT</span>
            </div>

            <h2
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: 'clamp(34px, 4.2vw, 50px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: '#ede9e8',
                margin: '0 0 18px 0',
              }}
            >
              A website that works for you.
            </h2>

            <p
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: '16px',
                lineHeight: 1.55,
                color: 'rgba(237, 233, 232, 0.72)',
                margin: '0 0 28px 0',
              }}
            >
              We create modern websites that reflect your business, connect you with your audience, and give your brand a solid digital foundation.
            </p>

            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                'Responsive layouts for desktop, tablet and phone.',
                'Clean navigation and straightforward structure.',
                'Fast load times for a better user experience.',
                'Integrated workflows for your business.',
              ].map((bullet, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '1px',
                      backgroundColor: '#c8ff3d',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      color: 'rgba(237, 233, 232, 0.85)',
                    }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
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
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(237, 233, 232, 0.16)',
                color: '#ede9e8',
                fontSize: '13px',
                fontWeight: 500,
                padding: '10px 16px',
                borderRadius: '7px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c8ff3d';
                e.currentTarget.style.color = '#c8ff3d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.16)';
                e.currentTarget.style.color = '#ede9e8';
              }}
            >
              Discuss Your Website <ChevronRight size={14} />
            </a>
          </div>

          {/* Right Visual: DeployCanvas Architecture */}
          <div>
            <DeployCanvas />
          </div>
        </div>
      </section>

      {/* 3. Section 02: Mobile App Development (#model-endpoints) */}
      <section
        id="model-endpoints"
        className="services-page-section"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          borderTop: '1px solid rgba(237, 233, 232, 0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)',
            gap: '64px',
            alignItems: 'center',
          }}
          className="services-split-grid"
        >
          {/* Left Column */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
                marginBottom: '16px',
              }}
            >
              <img
                src={aitechEmblem}
                alt="AI Technologies"
                style={{ width: 13, height: 13, objectFit: 'contain', flexShrink: 0 }}
              />
              <span>02 / MOBILE APP DEVELOPMENT</span>
            </div>

            <h2
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: 'clamp(34px, 4.2vw, 50px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: '#ede9e8',
                margin: '0 0 18px 0',
              }}
            >
              Mobile experiences, made for people.
            </h2>

            <p
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: '16px',
                lineHeight: 1.55,
                color: 'rgba(237, 233, 232, 0.72)',
                margin: '0 0 28px 0',
              }}
            >
              We develop Android and iOS applications that bring your products to mobile users with a clear, purposeful experience.
            </p>

            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                'Android app development.',
                'iOS app development.',
                'Interfaces designed for real users.',
                'Connected features and API integrations.',
              ].map((bullet, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '1px',
                      backgroundColor: '#c8ff3d',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      color: 'rgba(237, 233, 232, 0.85)',
                    }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
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
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(237, 233, 232, 0.16)',
                color: '#ede9e8',
                fontSize: '13px',
                fontWeight: 500,
                padding: '10px 16px',
                borderRadius: '7px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c8ff3d';
                e.currentTarget.style.color = '#c8ff3d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.16)';
                e.currentTarget.style.color = '#ede9e8';
              }}
            >
              Discuss Your Mobile App <ChevronRight size={14} />
            </a>
          </div>

          {/* Right Visual: Interactive Model Console */}
          <div
            style={{
              borderRadius: '18px',
              backgroundColor: 'rgba(12, 12, 12, 0.95)',
              border: '1px solid rgba(237, 233, 232, 0.14)',
              padding: '24px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* 6 Model Selector Buttons Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                marginBottom: '20px',
              }}
            >
              {models.map((m) => {
                const isSel = m.id === activeModelId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveModelId(m.id)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '9px',
                      backgroundColor: isSel ? 'rgba(200, 255, 61, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isSel ? '#c8ff3d' : 'rgba(237, 233, 232, 0.1)'}`,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isSel ? '#c8ff3d' : '#ede9e8',
                        width: '18px',
                        textAlign: 'center',
                      }}
                    >
                      {m.letter}
                    </span>
                    <span
                      style={{
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: isSel ? '#c8ff3d' : '#ede9e8',
                      }}
                    >
                      {m.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Model Terminal Box */}
            <div
              style={{
                borderRadius: '12px',
                backgroundColor: 'rgba(5, 5, 5, 0.9)',
                border: '1px solid rgba(237, 233, 232, 0.1)',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(237, 233, 232, 0.5)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <span>MODEL / {currentModel.name.toUpperCase()}</span>
                <span style={{ color: '#c8ff3d', fontSize: '10px' }}>INTERACTIVE UI PREVIEW</span>
              </div>

              <div
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#ede9e8',
                  marginBottom: '12px',
                }}
              >
                "{currentModel.prompt}"
              </div>

              <p
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'rgba(237, 233, 232, 0.65)',
                  marginBottom: '20px',
                }}
              >
                {currentModel.output}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(237, 233, 232, 0.08)',
                }}
              >
                <button
                  onClick={handleRunExample}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#c8ff3d',
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: '12px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
                >
                  {isRunningModel ? 'Simulating Workflow...' : 'Simulate Workflow Preview ▷'}
                </button>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'rgba(237, 233, 232, 0.45)',
                  }}
                >
                  {currentModel.endpoint}
                </span>

                <div
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'rgba(237, 233, 232, 0.4)',
                    marginTop: '4px',
                  }}
                >
                  * Interactive UI preview simulation. Production builds connect directly to your live backend APIs and custom LLMs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 03: Custom Software Development (#gpu-capacity) */}
      <section
        id="gpu-capacity"
        className="services-page-section"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          borderTop: '1px solid rgba(237, 233, 232, 0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)',
            gap: '64px',
            alignItems: 'center',
          }}
          className="services-split-grid"
        >
          {/* Left Column */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
                marginBottom: '16px',
              }}
            >
              <img
                src={aitechEmblem}
                alt="AI Technologies"
                style={{ width: 13, height: 13, objectFit: 'contain', flexShrink: 0 }}
              />
              <span>03 / CUSTOM SOFTWARE DEVELOPMENT</span>
            </div>

            <h2
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: 'clamp(34px, 4.2vw, 50px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: '#ede9e8',
                margin: '0 0 18px 0',
              }}
            >
              Software shaped around your workflow.
            </h2>

            <p
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: '16px',
                lineHeight: 1.55,
                color: 'rgba(237, 233, 232, 0.72)',
                margin: '0 0 28px 0',
              }}
            >
              We build custom software and business applications to address the way your organization works.
            </p>

            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                'Purpose-built applications.',
                'Clear user flows and visual dashboards.',
                'Reduce manual steps across teams.',
                'Predictable timelines and open communication.',
              ].map((bullet, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '1px',
                      backgroundColor: '#c8ff3d',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      color: 'rgba(237, 233, 232, 0.85)',
                    }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
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
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(237, 233, 232, 0.16)',
                color: '#ede9e8',
                fontSize: '13px',
                fontWeight: 500,
                padding: '10px 16px',
                borderRadius: '7px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c8ff3d';
                e.currentTarget.style.color = '#c8ff3d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.16)';
                e.currentTarget.style.color = '#ede9e8';
              }}
            >
              Discuss Custom Software <ChevronRight size={14} />
            </a>
          </div>

          {/* Right Visual: 80-Unit Capacity Grid Matrix */}
          <div
            style={{
              borderRadius: '18px',
              backgroundColor: 'rgba(12, 12, 12, 0.95)',
              border: '1px solid rgba(237, 233, 232, 0.14)',
              padding: '24px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Workload Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                marginBottom: '20px',
              }}
            >
              {workloads.map((w) => {
                const isSel = activeWorkloads.includes(w.id);
                return (
                  <button
                    key={w.id}
                    onClick={() => toggleWorkload(w.id)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: isSel ? 'rgba(200, 255, 61, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isSel ? '#c8ff3d' : 'rgba(237, 233, 232, 0.1)'}`,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ color: '#c8ff3d', fontSize: '13px' }}>{w.symbol}</span>
                    <span
                      style={{
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: isSel ? '#c8ff3d' : '#ede9e8',
                      }}
                    >
                      {w.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 80 Grid Units Blocks */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(16, 1fr)',
                gap: '4px',
                padding: '16px',
                borderRadius: '10px',
                backgroundColor: 'rgba(5, 5, 5, 0.9)',
                border: '1px solid rgba(237, 233, 232, 0.08)',
                marginBottom: '16px',
              }}
            >
              {Array.from({ length: 80 }).map((_, idx) => {
                const isFilled = idx < totalAssignedUnits;
                return (
                  <div
                    key={idx}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '2px',
                      backgroundColor: isFilled ? '#c8ff3d' : 'rgba(255, 255, 255, 0.04)',
                      boxShadow: isFilled ? '0 0 6px rgba(200, 255, 61, 0.5)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  />
                );
              })}
            </div>

            {/* Grid Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 6px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#ede9e8',
                }}
              >
                {totalAssignedUnits} / 80 ARCHITECTURE SCOPE UNITS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(237, 233, 232, 0.45)',
                }}
              >
                MODULAR STACK MATRIX
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 04: AI & API Integration (#kubernetes) */}
      <section
        id="kubernetes"
        className="services-page-section"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          borderTop: '1px solid rgba(237, 233, 232, 0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.35fr)',
            gap: '64px',
            alignItems: 'center',
          }}
          className="services-split-grid"
        >
          {/* Left Column */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
                marginBottom: '16px',
              }}
            >
              <img
                src={aitechEmblem}
                alt="AI Technologies"
                style={{ width: 13, height: 13, objectFit: 'contain', flexShrink: 0 }}
              />
              <span>04 / AI AND API INTEGRATION</span>
            </div>

            <h2
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: 'clamp(34px, 4.2vw, 50px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: '#ede9e8',
                margin: '0 0 18px 0',
              }}
            >
              Connect systems. Automate work.
            </h2>

            <p
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: '16px',
                lineHeight: 1.55,
                color: 'rgba(237, 233, 232, 0.72)',
                margin: '0 0 28px 0',
              }}
            >
              We integrate AI and connect APIs directly into your applications to automate repetitive tasks and support business workflows.
            </p>

            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                'AI integrations tailored to business needs.',
                'Automate routine workflows and save time.',
                'API integrations to connect your tools.',
                'Clear and reliable interfaces for business data.',
              ].map((bullet, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '1px',
                      backgroundColor: '#c8ff3d',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      color: 'rgba(237, 233, 232, 0.85)',
                    }}
                  >
                    {bullet}
                  </span>
                </div>
              ))}
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
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(237, 233, 232, 0.16)',
                color: '#ede9e8',
                fontSize: '13px',
                fontWeight: 500,
                padding: '10px 16px',
                borderRadius: '7px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c8ff3d';
                e.currentTarget.style.color = '#c8ff3d';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.16)';
                e.currentTarget.style.color = '#ede9e8';
              }}
            >
              Discuss Your Integration <ChevronRight size={14} />
            </a>
          </div>

          {/* Right Visual: Workflow Terminal Simulator */}
          <div
            style={{
              borderRadius: '18px',
              backgroundColor: 'rgba(12, 12, 12, 0.95)',
              border: '1px solid rgba(237, 233, 232, 0.14)',
              padding: '24px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Terminal Top Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
                marginBottom: '18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(237, 233, 232, 0.3)' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(237, 233, 232, 0.3)' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(237, 233, 232, 0.3)' }} />
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
                AI TECHNOLOGIES / WORKFLOW
              </span>
            </div>

            {/* Workflow Steps Output */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: 1.65,
                color: '#ede9e8',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '8px 4px',
              }}
            >
              <div>
                <span style={{ color: '#c8ff3d' }}>01 / Understand your workflow</span>
                <div style={{ color: 'rgba(237, 233, 232, 0.65)' }}>
                  Define the problem and the intended users.
                </div>
              </div>

              <div>
                <span style={{ color: '#c8ff3d' }}>02 / Connect your systems</span>
                <div style={{ color: 'rgba(237, 233, 232, 0.65)' }}>
                  web-app &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;connected to your tools
                  <br />
                  business-api &nbsp;&nbsp;&nbsp;data flows between systems
                </div>
              </div>

              <div>
                <span style={{ color: '#c8ff3d' }}>03 / Test and refine</span>
                <div style={{ color: 'rgba(237, 233, 232, 0.65)' }}>
                  your workflow &nbsp;&nbsp;&nbsp;ready for review
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#c8ff3d',
                  paddingTop: '8px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '14px',
                    backgroundColor: '#c8ff3d',
                    display: 'inline-block',
                    animation: 'blinkCursor 1s infinite',
                  }}
                />
              </div>
            </div>

            {/* Sub-caption */}
            <div
              style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(237, 233, 232, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(237, 233, 232, 0.45)',
              }}
            >
              Illustrative integration workflow
            </div>
          </div>
        </div>
      </section>

      {/* 6. Plan Together Ticker Banner */}
      <section
        className="services-page-banner"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            borderRadius: '12px',
            backgroundColor: 'rgba(10, 10, 10, 0.75)',
            border: '1px solid rgba(237, 233, 232, 0.1)',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={aitechEmblem}
              alt="AI Technologies"
              style={{ width: 15, height: 15, objectFit: 'contain', flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: '15px',
                color: '#ede9e8',
              }}
            >
              Plan a website, mobile app or custom software project together. Contact us to discuss your goals.
            </span>
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
              gap: '6px',
              backgroundColor: '#c8ff3d',
              color: '#000000',
              fontWeight: 600,
              fontSize: '13px',
              padding: '8px 16px',
              borderRadius: '7px',
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
      </section>

      {/* 7. Homepage Contact Card */}
      <ContactForm />

      {/* 8. Footer */}
      <Footer onOpenContact={onOpenContact} onNavigateHome={onNavigateHome} />

      <style>{`
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .services-page-section {
          padding: 80px 48px;
        }
        .services-page-hero {
          padding: 80px 48px 60px;
        }
        .services-page-banner {
          padding: 40px 48px;
        }
        @media (max-width: 900px) {
          .services-page-section {
            padding: 50px 24px;
          }
          .services-page-hero {
            padding: 60px 24px 40px;
          }
          .services-page-banner {
            padding: 30px 24px;
          }
          .services-split-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 600px) {
          .services-page-section {
            padding: 40px 16px;
          }
          .services-page-hero {
            padding: 44px 16px 32px;
          }
          .services-page-banner {
            padding: 24px 16px;
          }
        }
      `}</style>
    </div>
  );
}
