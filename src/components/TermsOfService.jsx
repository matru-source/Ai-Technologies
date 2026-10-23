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
      style={{
        minHeight: '100vh',
        padding: '60px 24px 100px',
        maxWidth: '960px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        color: '#ede9e8',
        fontFamily: '"Geist", sans-serif',
      }}
    >
      {/* Top Back Navigation */}
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
          marginBottom: '40px',
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

      {/* Header Card */}
      <div
        style={{
          background: 'rgba(14, 13, 13, 0.85)',
          border: '1px solid rgba(237, 233, 232, 0.12)',
          borderRadius: '16px',
          padding: '36px 32px',
          marginBottom: '40px',
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
          background: 'rgba(12, 12, 12, 0.75)',
          border: '1px solid rgba(237, 233, 232, 0.1)',
          borderRadius: '16px',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          lineHeight: 1.7,
        }}
      >
        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
            By engaging AI Technologies (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) for digital development services, visiting our website, or submitting a project inquiry, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or legal entity, you represent that you have the authority to bind such entity.
          </p>
        </section>

        <section>
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

        <section>
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

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
            4. Project Milestones, Scope & Delivery
          </h2>
          <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
            All project delivery timelines, technical specifications, and cost estimates are defined in advance during discovery and formalized through written project scopes. Any additions or scope adjustments requested during development will be evaluated and agreed upon via mutual milestone amendments.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
            5. Limitation of Liability
          </h2>
          <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
            To the maximum extent permitted by applicable law, AI Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from third-party cloud hosting outages, external API modifications, or unauthorized third-party access to client infrastructure.
          </p>
        </section>

        <section style={{ borderTop: '1px solid rgba(237, 233, 232, 0.1)', paddingTop: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
            6. Governing Law & Contact Information
          </h2>
          <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px', marginBottom: '12px' }}>
            These Terms shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction in the courts of Bhubaneswar, Odisha.
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(237, 233, 232, 0.08)', borderRadius: '10px', padding: '16px 20px', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Company:</strong> AI Technologies</div>
            <div><strong>Email:</strong> <a href="mailto:support@aitechnologies.com" style={{ color: '#c8ff3d', textDecoration: 'none' }}>support@aitechnologies.com</a></div>
            <div><strong>Phone:</strong> <a href="tel:+919777221665" style={{ color: '#ede9e8', textDecoration: 'none' }}>+91 9777221665</a></div>
            <div><strong>Address:</strong> Saheed Nagar, near BMC Bhawani Mall, Bhubaneswar, Odisha 751007, India</div>
          </div>
        </section>
      </div>
    </div>
  );
}
