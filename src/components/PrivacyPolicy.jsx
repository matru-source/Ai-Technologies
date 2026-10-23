import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';

export default function PrivacyPolicy({ onNavigateHome }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Privacy Policy — AI Technologies';
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
              <span>LEGAL COMPLIANCE & PRIVACY</span>
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
              Privacy Policy
            </h1>

            <p style={{ fontSize: '14px', color: 'rgba(237, 233, 232, 0.65)', margin: 0 }}>
              Last Updated: October 2026 &bull; Effective for all clients, visitors, and software users of AI Technologies.
            </p>
          </div>

          {/* Policy Content Sections */}
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
            <section id="intro">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                1. Introduction
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
                AI Technologies (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal data and proprietary project information you share with us. This Privacy Policy outlines our practices regarding data collection, usage, and protection in compliance with the Digital Personal Data Protection (DPDP) Act of India, GDPR guidelines, and international data security standards.
              </p>
            </section>

            <section id="collect">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                2. Information We Collect
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px', marginBottom: '12px' }}>
                When you contact us, request a project quote, or collaborate on digital development, we may collect:
              </p>
              <ul style={{ paddingLeft: '20px', color: 'rgba(237, 233, 232, 0.75)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Identity & Contact Information:</strong> Name, business email address, phone number, and company name.</li>
                <li><strong>Project & Technical Details:</strong> Project requirements, architecture specifications, API integration goals, and scope parameters provided during discovery.</li>
                <li><strong>Usage & Telemetry Data:</strong> Non-personally identifiable technical data such as browser type, device screen resolution, and navigation patterns to optimize website performance.</li>
              </ul>
            </section>

            <section id="usage">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                3. How We Use Your Information
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
                We strictly use collected information to:
              </p>
              <ul style={{ paddingLeft: '20px', color: 'rgba(237, 233, 232, 0.75)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Respond to your project inquiries and provide tailored technical proposals.</li>
                <li>Design, develop, and deliver custom websites, mobile applications, and AI integrations.</li>
                <li>Maintain clear project communication, milestones, and customer support.</li>
                <li><strong>Zero Commercial Data Selling:</strong> We never sell, rent, or trade your personal or project data to third-party advertisers.</li>
              </ul>
            </section>

            <section id="confidentiality">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                4. Proprietary Code & Intellectual Property Confidentiality
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
                All business logic, database schemas, proprietary algorithms, and intellectual property shared with AI Technologies during project development are treated under strict confidentiality. We routinely sign Non-Disclosure Agreements (NDAs) prior to examining sensitive client source code or business systems.
              </p>
            </section>

            <section id="rights">
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                5. Your Data Protection Rights
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
                You have the right to request access to the personal data we hold about you, request corrections, or request complete deletion of your contact records from our systems at any time by emailing us at <a href="mailto:support@aitechnologies.com" style={{ color: '#c8ff3d', textDecoration: 'none' }}>support@aitechnologies.com</a>.
              </p>
            </section>

            <section id="contact-sec" style={{ borderTop: '1px solid rgba(237, 233, 232, 0.1)', paddingTop: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
                6. Official Contact & Data Inquiries
              </h2>
              <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px', marginBottom: '12px' }}>
                For privacy inquiries, project data handling questions, or regulatory compliance requests, please reach out to our team:
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
              DPDP &bull; GDPR &bull; SOC2 COMPLIANT
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
              DOCUMENT INDEX
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
              <a href="#intro" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>1. Introduction</a>
              <a href="#collect" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>2. Information Collected</a>
              <a href="#usage" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>3. How We Use Data</a>
              <a href="#confidentiality" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>4. NDA & IP Confidentiality</a>
              <a href="#rights" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>5. Your Rights</a>
              <a href="#contact-sec" style={{ color: 'rgba(237, 233, 232, 0.8)', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c8ff3d'} onMouseLeave={e => e.target.style.color = 'rgba(237, 233, 232, 0.8)'}>6. Official Inquiries</a>
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
