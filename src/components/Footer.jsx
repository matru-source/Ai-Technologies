import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';

export default function Footer({ onOpenContact, onNavigateHome, onNavigateServices }) {
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
      className="footer-container"
      style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      {/* Main Footer Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 2fr)',
          gap: '48px',
          alignItems: 'flex-start',
          paddingBottom: '64px',
        }}
        className="footer-grid"
      >
        {/* Left Column: Brand Logo + Heading + CTA Button */}
        <div className="footer-brand-col">
          <div className="footer-brand-header">
            <img
              src={aitechLogo}
              alt="AI Technologies"
              className="footer-brand-logo"
              style={{
                height: '44px',
                width: 'auto',
                marginBottom: '28px',
                display: 'block',
                objectFit: 'contain',
              }}
            />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenContact) onOpenContact();
              }}
              className="footer-cta-mobile-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: '#c8ff3d',
                color: '#000000',
                fontWeight: 600,
                fontSize: '11.5px',
                padding: '6px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
            >
              Start a Project <ArrowUpRight size={12} />
            </a>
          </div>

          <h2
            className="footer-brand-title"
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 'clamp(36px, 4.4vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: '#ede9e8',
              margin: '0 0 28px 0',
            }}
          >
            Building Digital
            <br className="footer-title-break" />
            {' '}Solutions
            <br />
            <span style={{ color: '#c8ff3d' }}>for Tomorrow</span>
          </h2>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenContact) onOpenContact();
            }}
            className="footer-cta-desktop-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#c8ff3d',
              color: '#000000',
              fontWeight: 600,
              fontSize: '13px',
              padding: '10px 18px',
              borderRadius: '8px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '28px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
          >
            Start a Project <ArrowUpRight size={14} />
          </a>

          {/* Official Company Details */}
          <div
            className="footer-contact-details"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'rgba(237, 233, 232, 0.65)',
              maxWidth: '360px',
            }}
          >
            <div className="footer-contact-hq">
              <strong style={{ color: '#ffffff' }}>Headquarters:</strong><br className="footer-hq-break" />
              {' '}Saheed Nagar, near BMC Bhawani Mall, Bhubaneswar, Odisha 751007
            </div>
            <div className="footer-contact-row">
              <div>
                <strong style={{ color: '#ffffff' }}>Phone:</strong>{' '}
                <a href="tel:+919777221665" style={{ color: '#c8ff3d', textDecoration: 'none' }}>
                  +91 9777221665
                </a>
              </div>
              <span className="footer-contact-sep" style={{ display: 'none', color: 'rgba(237, 233, 232, 0.3)' }}>•</span>
              <div>
                <strong style={{ color: '#ffffff' }}>Email:</strong>{' '}
                <a href="mailto:support@aitechnologies.com" style={{ color: '#c8ff3d', textDecoration: 'none' }}>
                  support@aitechnologies.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Services / Explore / Start a Project */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}
          className="footer-links-grid"
        >
          {/* Services */}
          <div className="footer-col-services">
            <div
              className="footer-col-header"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
                marginBottom: '18px',
              }}
            >
              SERVICES
            </div>
            <div className="footer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                  style={{
                    fontFamily: '"Geist", sans-serif',
                    fontSize: '14px',
                    color: 'rgba(237, 233, 232, 0.65)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.65)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="footer-col-explore">
            <div
              className="footer-col-header"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
                marginBottom: '18px',
              }}
            >
              EXPLORE & LEGAL
            </div>
            <div className="footer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                  style={{
                    fontFamily: '"Geist", sans-serif',
                    fontSize: '14px',
                    color: 'rgba(237, 233, 232, 0.65)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.65)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Start a Project */}
          <div className="footer-col-start">
            <div
              className="footer-col-header"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#c8ff3d',
                marginBottom: '18px',
              }}
            >
              START A PROJECT
            </div>
            <div className="footer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  label: 'Tell us your idea',
                  href: '#contact',
                  onClick: (e) => {
                    e.preventDefault();
                    if (onOpenContact) onOpenContact();
                  },
                },
                { label: 'Our services', href: '#services-page' },
                { label: 'Web, mobile, software and AI', href: '#ai-integration' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={link.onClick || ((e) => handleFooterLink(e, link.href))}
                  style={{
                    fontFamily: '"Geist", sans-serif',
                    fontSize: '14px',
                    color: 'rgba(237, 233, 232, 0.65)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.65)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div
        className="footer-bottom-bar"
        style={{
          borderTop: '1px solid rgba(237, 233, 232, 0.1)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div
          className="footer-bottom-copy"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(237, 233, 232, 0.45)',
          }}
        >
          <img
            src={aitechEmblem}
            alt="AI Technologies"
            style={{ width: '18px', height: '18px', objectFit: 'contain' }}
          />
          <span>© 2026 AI TECHNOLOGIES • IDEAS | INNOVATION | IMPACT</span>
        </div>

        <div className="footer-bottom-links" style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <a
            href="mailto:support@aitechnologies.com"
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: '13px',
              color: 'rgba(237, 233, 232, 0.55)',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8ff3d')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.55)')}
          >
            support@aitechnologies.com
          </a>

          <a
            href="#privacy"
            onClick={(e) => handleFooterLink(e, '#privacy')}
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: '13px',
              color: 'rgba(237, 233, 232, 0.45)',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ede9e8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.45)')}
          >
            Privacy Policy
          </a>

          <a
            href="#terms"
            onClick={(e) => handleFooterLink(e, '#terms')}
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: '13px',
              color: 'rgba(237, 233, 232, 0.45)',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ede9e8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.45)')}
          >
            Terms of Service
          </a>
        </div>

        <div
          className="footer-bottom-slogan"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(237, 233, 232, 0.45)',
          }}
        >
          BUILDING DIGITAL SOLUTIONS FOR TOMORROW
        </div>
      </div>

      <style>{`
        .footer-container {
          padding: 60px 48px 40px;
        }
        @media (max-width: 900px) {
          .footer-container {
            padding: 40px 24px 30px;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding-bottom: 36px !important;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 28px 20px !important;
          }
          .footer-col-start {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 600px) {
          .footer-container {
            min-height: 100svh;
            min-height: 100dvh;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            padding: 20px 16px 14px !important;
            box-sizing: border-box !important;
          }
          .footer-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
            padding-bottom: 0 !important;
            flex: 1 !important;
            justify-content: flex-start !important;
          }
          .footer-brand-col {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
          }
          .footer-brand-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            margin-bottom: 4px !important;
          }
          .footer-brand-logo {
            height: 26px !important;
            margin-bottom: 0 !important;
          }
          .footer-cta-mobile-btn {
            display: inline-flex !important;
          }
          .footer-cta-desktop-btn {
            display: none !important;
          }
          .footer-brand-title {
            font-size: clamp(20px, 5.2vw, 24px) !important;
            line-height: 1.15 !important;
            margin: 0 !important;
          }
          .footer-title-break {
            display: none !important;
          }
          .footer-contact-details {
            font-size: 11.5px !important;
            line-height: 1.35 !important;
            gap: 4px !important;
            margin-bottom: 4px !important;
          }
          .footer-contact-hq {
            font-size: 11px !important;
            line-height: 1.3 !important;
          }
          .footer-hq-break {
            display: none !important;
          }
          .footer-contact-row {
            display: flex !important;
            align-items: center !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
            font-size: 11px !important;
          }
          .footer-contact-sep {
            display: inline !important;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 16px 12px !important;
            margin-top: 4px !important;
          }
          .footer-col-header {
            font-size: 10px !important;
            margin-bottom: 8px !important;
            letter-spacing: 0.08em !important;
          }
          .footer-links-list {
            gap: 6px !important;
          }
          .footer-links-list a {
            font-size: 12px !important;
            line-height: 1.25 !important;
          }
          .footer-col-start {
            display: none !important;
          }
          .footer-bottom-bar {
            border-top: 1px solid rgba(237, 233, 232, 0.08) !important;
            padding-top: 10px !important;
            margin-top: 10px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
          .footer-bottom-copy {
            font-size: 9.5px !important;
            gap: 6px !important;
            letter-spacing: 0.04em !important;
          }
          .footer-bottom-copy img {
            width: 13px !important;
            height: 13px !important;
          }
          .footer-bottom-links {
            gap: 10px !important;
            font-size: 11px !important;
          }
          .footer-bottom-links a {
            font-size: 11px !important;
          }
          .footer-bottom-slogan {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
