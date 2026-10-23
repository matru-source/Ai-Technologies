import React, { useEffect } from 'react';
import { ArrowLeft, FileText, CheckCircle2, ShieldCheck, Scale } from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';

export default function TermsOfService({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Terms of Service — AI Technologies';
    return () => {
      document.title = 'AI Technologies — Ideas | Innovation | Impact';
    };
  }, []);

  return (
    <div
      className="legal-page-wrapper"
      style={{
        minHeight: '100vh',
        padding: '50px 36px 120px',
        maxWidth: '1440px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        color: '#ede9e8',
        fontFamily: '"Geist", sans-serif',
      }}
    >
      {/* Top Back Navigation */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => onNavigateHome ? onNavigateHome() : (window.location.href = '/')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#ede9e8',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#c8ff3d';
            e.currentTarget.style.color = '#c8ff3d';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.color = '#ede9e8';
          }}
        >
          <ArrowLeft size={15} /> Back to Home
        </button>
      </div>

      {/* Two-Column Grid: Content on Left, Clear Zone on Right for 3D Emblem & Particles */}
      <div
        className="legal-grid-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.28fr) minmax(0, 0.92fr)',
          gap: '56px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Documentation Details */}
        <div style={{ maxWidth: '780px', width: '100%' }}>
          {/* Header Card */}
          <div
            style={{
              background: 'rgba(14, 13, 13, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              borderRadius: '16px',
              padding: '36px 32px',
              marginBottom: '32px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
                marginBottom: '16px',
              }}
            >
              <img src={aitechEmblem} alt="AI Technologies" style={{ width: 14, height: 14, objectFit: 'contain' }} />
              <span>LEGAL AGREEMENT & TERMS</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '12px',
              }}
            >
              Terms of Service
            </h1>

            <p style={{ fontSize: '14px', color: 'rgba(237, 233, 232, 0.65)', margin: 0 }}>
              Last Updated: October 2026 &bull; Governing all software development, consulting, and digital solutions provided by AI Technologies.
            </p>
          </div>

          {/* Terms Content Sections */}
          <div
            style={{
              background: 'rgba(12, 12, 12, 0.78)',
              border: '1px solid rgba(237, 233, 232, 0.1)',
              borderRadius: '16px',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '36px',
              lineHeight: 1.7,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <section id="terms-accept">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
                By engaging AI Technologies (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) for digital development services, visiting our website, or submitting a project inquiry, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or legal entity, you represent that you have the authority to bind such entity.
              </p>
            </section>

            <section id="terms-scope">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                2. Scope of Services
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px', marginBottom: '12px' }}>
                AI Technologies provides modern technology services including:
              </p>
              <ul style={{ paddingLeft: '20px', color: 'rgba(237, 233, 232, 0.75)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Custom website engineering, responsive web applications, and CMS solutions.</li>
                <li>Mobile application development across iOS and Android ecosystems.</li>
                <li>Intelligent AI pipeline integrations, LLM copilots, and business process automation.</li>
                <li>API architecture, cloud backends, and custom software systems.</li>
              </ul>
            </section>

            <section id="terms-ip">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                3. Intellectual Property Rights & Ownership
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
                Unless explicitly agreed otherwise in a separate Statement of Work (SOW):
              </p>
              <ul style={{ paddingLeft: '20px', color: 'rgba(237, 233, 232, 0.75)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Client Deliverables:</strong> Upon receipt of full payment for contracted milestones, all custom code, graphic assets, and project deliverables created specifically for the client transfer entirely to the client.</li>
                <li><strong>Pre-existing Frameworks:</strong> Open-source libraries, general development utilities, and proprietary developer toolkits remain licensed under standard open-source or permissive terms.</li>
              </ul>
            </section>

            <section id="terms-milestones">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                4. Project Milestones, Scope & Delivery
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
                All project delivery timelines, technical specifications, and cost estimates are defined in advance during discovery and formalized through written project scopes. Any additions or scope adjustments requested during development will be evaluated and agreed upon via mutual milestone amendments.
              </p>
            </section>

            <section id="terms-liability">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                5. Limitation of Liability
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
                To the maximum extent permitted by applicable law, AI Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from third-party cloud hosting outages, external API modifications, or unauthorized third-party access to client infrastructure.
              </p>
            </section>

            <section id="terms-governing" style={{ borderTop: '1px solid rgba(237, 233, 232, 0.1)', paddingTop: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                6. Governing Law & Contact Information
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px', marginBottom: '12px' }}>
                These Terms shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction in the courts of Bhubaneswar, Odisha.
              </p>
              <div style={{ background: 'rgba(0, 0, 0, 0.45)', border: '1px solid rgba(237, 233, 232, 0.08)', borderRadius: '10px', padding: '16px 20px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><strong>Company:</strong> AI Technologies</div>
                <div><strong>Email:</strong> <a href="mailto:support@aitechnologies.com" style={{ color: '#c8ff3d', textDecoration: 'none' }}>support@aitechnologies.com</a></div>
                <div><strong>Phone:</strong> <a href="tel:+919777221665" style={{ color: '#ede9e8', textDecoration: 'none' }}>+91 9777221665</a></div>
                <div><strong>Address:</strong> Saheed Nagar, near BMC Bhawani Mall, Bhubaneswar, Odisha 751007, India</div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Kept Clear for 3D AI Emblem & Swarm + Floating Status Pill */}
        <div
          className="legal-sidebar"
          style={{
            position: 'sticky',
            top: '110px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '20px',
            pointerEvents: 'none',
          }}
        >
          {/* Top Compliance Badge */}
          <div
            style={{
              background: 'rgba(14, 13, 13, 0.72)',
              border: '1px solid rgba(200, 255, 61, 0.35)',
              borderRadius: '24px',
              padding: '8px 18px',
              backdropFilter: 'blur(16px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 24px rgba(0, 0, 0, 0.7), 0 0 16px rgba(200, 255, 61, 0.15)',
            }}
          >
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
                color: '#c8ff3d',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              MASTER SERVICES AGREEMENT (MSA)
            </span>
          </div>

          {/* Quick Nav Drawer */}
          <div
            style={{
              maxWidth: '280px',
              width: '100%',
              background: 'rgba(10, 10, 10, 0.65)',
              border: '1px solid rgba(237, 233, 232, 0.1)',
              borderRadius: '12px',
              padding: '18px 20px',
              backdropFilter: 'blur(20px)',
              pointerEvents: 'auto',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.55)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'rgba(237, 233, 232, 0.5)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              TERMS INDEX
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
              <a href="#terms-accept" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>1. Acceptance of Terms</a>
              <a href="#terms-scope" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>2. Scope of Services</a>
              <a href="#terms-ip" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>3. IP Rights & Ownership</a>
              <a href="#terms-milestones" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>4. Scope & Milestones</a>
              <a href="#terms-liability" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>5. Limitation of Liability</a>
              <a href="#terms-governing" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>6. Governing Law</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .legal-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .legal-sidebar {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .legal-page-wrapper {
            padding: 30px 16px 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
