import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';

export default function Footer({ onOpenContact, onNavigateHome, onNavigateServices }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = (e) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('support@aitechnologies.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterLink = (e, href) => {
    if (!href || href === '#') return;
    if (href === '#services-page') {
      e.preventDefault();
      if (onNavigateServices) onNavigateServices();
      return;
    }
    if (href === '#privacy' || href === '#terms') {
      e.preventDefault();
      window.location.hash = href;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (onNavigateHome && href.startsWith('#')) {
      e.preventDefault();
      onNavigateHome(href.replace('#', ''));
    }
  };

  return (
    <footer
      data-framer-name="Footer"
      className="footer-section"
      style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        padding: '0 20px 40px',
        boxSizing: 'border-box',
      }}
    >
      {/* Master Industry-Grade Glass Card */}
      <div className="footer-master-card">
        {/* Top Status & Brand Row */}
        <div className="footer-top-row">
          <div className="footer-brand-wrap">
            <div className="footer-status-pill">
              <span className="footer-status-dot" />
              <span>Available for Q2 2026 Projects</span>
              <span className="footer-status-tag">• Bhubaneswar, IN</span>
            </div>

            <div className="footer-logo-row">
              <img
                src={aitechLogo}
                alt="AI Technologies"
                className="footer-brand-logo"
              />
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  if (onOpenContact) onOpenContact();
                }}
                className="footer-cta-mobile-btn"
              >
                Start a Project <ArrowUpRight size={13} />
              </a>
            </div>

            <h2 className="footer-brand-title">
              Building Digital Solutions{' '}
              <span style={{ color: '#c8ff3d' }}>for Tomorrow.</span>
            </h2>

            <p className="footer-brand-desc">
              Engineering high-velocity web platforms, enterprise AI systems,
              mobile architectures, and mission-critical cloud applications.
            </p>
          </div>

          <div className="footer-cta-desktop-box">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenContact) onOpenContact();
              }}
              className="footer-cta-desktop-btn"
            >
              Start a Project <ArrowUpRight size={15} />
            </a>
            <div className="footer-cta-subtext">
              Direct response within 24 hours
            </div>
          </div>
        </div>

        {/* Capabilities & Tech Pill Strip */}
        <div className="footer-pills-row">
          <span className="footer-pill-item">
            <Sparkles size={11} color="#c8ff3d" /> Full-Stack Web
          </span>
          <span className="footer-pill-item">📱 iOS & Android Apps</span>
          <span className="footer-pill-item">🤖 Agentic AI & LLMs</span>
          <span className="footer-pill-item">☁️ Cloud Native</span>
          <span className="footer-pill-item">🔒 Enterprise Security</span>
          <span className="footer-pill-item">⚡ High Performance</span>
        </div>

        {/* Main Content Grid */}
        <div className="footer-content-grid">
          {/* Services Column */}
          <div className="footer-nav-col">
            <div className="footer-col-header">SERVICES</div>
            <div className="footer-links-list">
              {[
                { label: 'Website development', href: '#platform' },
                { label: 'Mobile applications', href: '#services' },
                { label: 'Custom software', href: '#scope-explorer' },
                { label: 'Our process', href: '#how-we-work' },
                { label: 'Digital experiences', href: '#global-reach' },
                { label: 'AI and APIs', href: '#ai-integration' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleFooterLink(e, link.href)}
                  className="footer-nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore & Legal Column */}
          <div className="footer-nav-col">
            <div className="footer-col-header">EXPLORE & LEGAL</div>
            <div className="footer-links-list">
              {[
                { label: 'About AI Technologies', href: '#about-agency' },
                { label: 'Our approach', href: '#how-we-work' },
                {
                  label: 'Contact us',
                  href: '#contact',
                  onClick: (e) => {
                    e.preventDefault();
                    if (onOpenContact) onOpenContact();
                  },
                },
                { label: 'Solution guides', href: '#solution-guides' },
                { label: 'Privacy Policy', href: '#privacy' },
                { label: 'Terms of Service', href: '#terms' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={link.onClick || ((e) => handleFooterLink(e, link.href))}
                  className="footer-nav-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Dedicated Direct Connect & Headquarters Card */}
          <div className="footer-contact-card">
            <div className="footer-col-header">OFFICE & DIRECT CONNECT</div>

            <div className="footer-contact-item">
              <MapPin size={14} className="footer-contact-icon" />
              <div>
                <strong style={{ color: '#ffffff' }}>Headquarters:</strong>
                <br />
                Saheed Nagar, near BMC Bhawani Mall, Bhubaneswar, Odisha 751007
              </div>
            </div>

            <div className="footer-contact-item">
              <Phone size={14} className="footer-contact-icon" />
              <div>
                <strong style={{ color: '#ffffff' }}>Direct Line:</strong>{' '}
                <a href="tel:+919777221665" className="footer-contact-link">
                  +91 9777221665
                </a>
              </div>
            </div>

            <div className="footer-contact-item footer-email-row">
              <Mail size={14} className="footer-contact-icon" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ color: '#ffffff' }}>Email:</strong>{' '}
                <a
                  href="mailto:support@aitechnologies.com"
                  className="footer-contact-link"
                >
                  support@aitechnologies.com
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmailToClipboard}
                title="Copy email address"
                className="footer-copy-btn"
              >
                {copiedEmail ? (
                  <>
                    <Check size={11} color="#c8ff3d" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="footer-sla-badge">
              <span className="footer-sla-dot" />
              <span>Standard client response time: &lt; 2 hours</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-copy">
            <img
              src={aitechEmblem}
              alt="AI Technologies Emblem"
              className="footer-emblem-img"
            />
            <span>© 2026 AI TECHNOLOGIES • IDEAS | INNOVATION | IMPACT</span>
          </div>

          <div className="footer-bottom-links">
            <a
              href="#privacy"
              onClick={(e) => handleFooterLink(e, '#privacy')}
              className="footer-legal-link"
            >
              Privacy Policy
            </a>
            <span className="footer-bottom-sep">•</span>
            <a
              href="#terms"
              onClick={(e) => handleFooterLink(e, '#terms')}
              className="footer-legal-link"
            >
              Terms of Service
            </a>
            <span className="footer-bottom-sep">•</span>
            <span className="footer-trust-tag">
              <ShieldCheck size={12} color="#c8ff3d" /> ISO 27001 Ready
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            title="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>

      <style>{`
        /* Master Container Styling */
        .footer-section {
          padding: 0 20px 40px;
        }
        .footer-master-card {
          position: relative;
          background: linear-gradient(180deg, rgba(16, 15, 15, 0.92) 0%, rgba(8, 8, 8, 0.97) 100%);
          border: 1px solid rgba(237, 233, 232, 0.12);
          border-radius: 24px;
          backdrop-filter: blur(24px);
          box-shadow: 0 24px 64px -16px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          padding: 44px 44px 30px;
          box-sizing: border-box;
          overflow: hidden;
        }
        .footer-master-card::before {
          content: '';
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 240px;
          background: radial-gradient(circle, rgba(200, 255, 61, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Top Brand & Status */
        .footer-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .footer-brand-wrap {
          flex: 1;
          max-width: 680px;
        }
        .footer-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          color: #c8ff3d;
          background: rgba(200, 255, 61, 0.08);
          border: 1px solid rgba(200, 255, 61, 0.25);
          border-radius: 100px;
          padding: 4px 12px;
          margin-bottom: 18px;
        }
        .footer-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8ff3d;
          box-shadow: 0 0 8px #c8ff3d;
          animation: footerPulse 2s infinite ease-in-out;
        }
        @keyframes footerPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .footer-status-tag {
          color: rgba(237, 233, 232, 0.5);
        }
        .footer-logo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .footer-brand-logo {
          height: 40px;
          width: auto;
          display: block;
          object-fit: contain;
        }
        .footer-cta-mobile-btn {
          display: none;
          align-items: center;
          gap: 6px;
          background-color: #c8ff3d;
          color: #000000;
          font-weight: 600;
          font-size: 12px;
          padding: 7px 14px;
          border-radius: 8px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .footer-brand-title {
          font-family: "Geist", sans-serif;
          font-size: clamp(30px, 3.8vw, 44px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: #ede9e8;
          margin: 0 0 12px 0;
        }
        .footer-brand-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(237, 233, 232, 0.65);
          margin: 0;
          max-width: 580px;
        }
        .footer-cta-desktop-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .footer-cta-desktop-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #c8ff3d;
          color: #000000;
          font-weight: 600;
          font-size: 14px;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 8px 24px rgba(200, 255, 61, 0.25);
        }
        .footer-cta-desktop-btn:hover {
          background-color: #d6ff66;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(200, 255, 61, 0.35);
        }
        .footer-cta-subtext {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(237, 233, 232, 0.45);
          letter-spacing: 0.04em;
        }

        /* Tech Pills */
        .footer-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 14px 0;
          border-top: 1px solid rgba(237, 233, 232, 0.08);
          border-bottom: 1px solid rgba(237, 233, 232, 0.08);
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .footer-pill-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.02em;
          color: rgba(237, 233, 232, 0.72);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(237, 233, 232, 0.09);
          border-radius: 100px;
          padding: 5px 12px;
          transition: all 0.15s;
        }
        .footer-pill-item:hover {
          border-color: rgba(200, 255, 61, 0.35);
          color: #ede9e8;
          background: rgba(200, 255, 61, 0.05);
        }

        /* Content Grid */
        .footer-content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.4fr);
          gap: 36px;
          align-items: flex-start;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .footer-col-header {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #c8ff3d;
          margin-bottom: 16px;
          font-weight: 600;
        }
        .footer-links-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-nav-link {
          font-family: "Geist", sans-serif;
          font-size: 14px;
          color: rgba(237, 233, 232, 0.65);
          text-decoration: none;
          transition: all 0.15s ease;
          cursor: pointer;
          display: inline-block;
        }
        .footer-nav-link:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        /* Dedicated Contact Glass Card */
        .footer-contact-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(237, 233, 232, 0.09);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(237, 233, 232, 0.68);
        }
        .footer-contact-icon {
          flex-shrink: 0;
          color: #c8ff3d;
          margin-top: 3px;
        }
        .footer-contact-link {
          color: #c8ff3d;
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-contact-link:hover {
          color: #d6ff66;
          text-decoration: underline;
        }
        .footer-email-row {
          align-items: center;
        }
        .footer-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(237, 233, 232, 0.12);
          color: rgba(237, 233, 232, 0.8);
          font-family: var(--font-mono);
          font-size: 10.5px;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .footer-copy-btn:hover {
          background: rgba(200, 255, 61, 0.12);
          border-color: rgba(200, 255, 61, 0.35);
          color: #ffffff;
        }
        .footer-sla-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: rgba(237, 233, 232, 0.45);
          padding-top: 8px;
          border-top: 1px solid rgba(237, 233, 232, 0.06);
        }
        .footer-sla-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #3df3ff;
        }

        /* Bottom Sub-bar */
        .footer-bottom-bar {
          border-top: 1px solid rgba(237, 233, 232, 0.09);
          padding-top: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .footer-bottom-copy {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(237, 233, 232, 0.5);
        }
        .footer-emblem-img {
          width: 18px;
          height: 18px;
          object-fit: contain;
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12.5px;
          color: rgba(237, 233, 232, 0.5);
        }
        .footer-legal-link {
          color: rgba(237, 233, 232, 0.55);
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-legal-link:hover {
          color: #ede9e8;
        }
        .footer-bottom-sep {
          color: rgba(237, 233, 232, 0.2);
        }
        .footer-trust-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: rgba(237, 233, 232, 0.45);
        }
        .footer-back-to-top {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(237, 233, 232, 0.1);
          color: rgba(237, 233, 232, 0.65);
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .footer-back-to-top:hover {
          background: rgba(200, 255, 61, 0.12);
          border-color: rgba(200, 255, 61, 0.35);
          color: #ffffff;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .footer-section {
            padding: 0 16px 32px;
          }
          .footer-master-card {
            padding: 32px 24px 24px;
          }
          .footer-top-row {
            flex-direction: column;
            gap: 20px;
          }
          .footer-cta-desktop-box {
            display: none;
          }
          .footer-cta-mobile-btn {
            display: inline-flex;
          }
          .footer-content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px 20px;
          }
          .footer-contact-card {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 600px) {
          .footer-section {
            padding: 0 12px 24px;
          }
          .footer-master-card {
            padding: 22px 16px 18px;
            border-radius: 18px;
          }
          .footer-top-row {
            margin-bottom: 20px;
          }
          .footer-status-pill {
            font-size: 10px;
            padding: 3px 10px;
            margin-bottom: 12px;
          }
          .footer-status-tag {
            display: none;
          }
          .footer-logo-row {
            margin-bottom: 12px;
          }
          .footer-brand-logo {
            height: 28px;
          }
          .footer-cta-mobile-btn {
            font-size: 11.5px;
            padding: 6px 12px;
          }
          .footer-brand-title {
            font-size: clamp(22px, 5.8vw, 26px);
            margin-bottom: 8px;
          }
          .footer-brand-desc {
            font-size: 12.5px;
            line-height: 1.5;
          }
          .footer-pills-row {
            gap: 6px;
            padding: 10px 0;
            margin-bottom: 20px;
          }
          .footer-pill-item {
            font-size: 10px;
            padding: 4px 9px;
          }
          .footer-content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px 14px;
            margin-bottom: 20px;
          }
          .footer-col-header {
            font-size: 10px;
            margin-bottom: 10px;
          }
          .footer-links-list {
            gap: 8px;
          }
          .footer-nav-link {
            font-size: 12.5px;
          }
          .footer-contact-card {
            padding: 14px;
            gap: 10px;
            grid-column: 1 / -1;
          }
          .footer-contact-item {
            font-size: 12px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding-top: 14px;
          }
          .footer-bottom-copy {
            font-size: 9.5px;
            gap: 6px;
          }
          .footer-emblem-img {
            width: 14px;
            height: 14px;
          }
          .footer-bottom-links {
            flex-wrap: wrap;
            gap: 8px;
            font-size: 11px;
          }
          .footer-trust-tag {
            font-size: 10px;
          }
          .footer-back-to-top {
            align-self: flex-end;
            margin-top: -30px;
            font-size: 10px;
            padding: 5px 10px;
          }
        }
      `}</style>
    </footer>
  );
}
