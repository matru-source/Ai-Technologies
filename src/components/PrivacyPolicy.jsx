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
            1. Introduction
          </h2>
          <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
            AI Technologies (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal data and proprietary project information you share with us. This Privacy Policy outlines our practices regarding data collection, usage, and protection in compliance with the Digital Personal Data Protection (DPDP) Act of India, GDPR guidelines, and international data security standards.
          </p>
        </section>

        <section>
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

        <section>
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

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
            4. Proprietary Code & Intellectual Property Confidentiality
          </h2>
          <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
            All business logic, database schemas, proprietary algorithms, and intellectual property shared with AI Technologies during project development are treated under strict confidentiality. We routinely sign Non-Disclosure Agreements (NDAs) prior to examining sensitive client source code or business systems.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
            5. Your Data Protection Rights
          </h2>
          <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px' }}>
            You have the right to request access to the personal data we hold about you, request corrections, or request complete deletion of your contact records from our systems at any time by emailing us at <a href="mailto:support@aitechnologies.com" style={{ color: '#c8ff3d', textDecoration: 'none' }}>support@aitechnologies.com</a>.
          </p>
        </section>

        <section style={{ borderTop: '1px solid rgba(237, 233, 232, 0.1)', paddingTop: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', marginBottom: '12px' }}>
            6. Official Contact & Data Inquiries
          </h2>
          <p style={{ color: 'rgba(237, 233, 232, 0.8)', fontSize: '15px', marginBottom: '12px' }}>
            For privacy inquiries, project data handling questions, or regulatory compliance requests, please reach out to our team:
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
