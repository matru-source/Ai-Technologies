import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';

export default function Navbar({ onOpenContact, onNavigateServices, onNavigateHome, currentView = 'home' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (name) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleItemNav = (e, href) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (!href || href === '#') return;

    if (href === '#services-page' || href === '#features') {
      e.preventDefault();
      if (onNavigateServices) onNavigateServices();
      return;
    }

    if (currentView !== 'home') {
      e.preventDefault();
      if (onNavigateHome) {
        onNavigateHome(href.replace('#', ''));
      }
    }
  };

  return (
    <div
      className="navbar-wrapper"
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <header
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '1264px',
          height: '56px',
          backgroundColor: scrolled ? 'rgba(8, 8, 8, 0.88)' : 'rgba(8, 8, 8, 0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(237, 233, 232, 0.12)',
          borderRadius: '14px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled
            ? '0 12px 32px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4)'
            : '0 4px 20px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Left: Brand Logo & Title */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <img
            src={aitechLogo}
            alt="AI Technologies — Ideas | Innovation | Impact"
            className="navbar-brand-logo"
            style={{
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </a>

        {/* Center: Desktop Navigation Links with Dropdowns */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '22px',
          }}
        >
          {/* 1. Services Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: activeDropdown === 'services' ? '#ffffff' : 'rgba(237, 233, 232, 0.72)',
                fontSize: '14px',
                fontWeight: 400,
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              Services <ChevronDown size={14} style={{ opacity: 0.7, transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {activeDropdown === 'services' && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  left: '-40px',
                  width: '560px',
                  backgroundColor: 'rgba(10, 10, 10, 0.96)',
                  border: '1px solid rgba(237, 233, 232, 0.14)',
                  borderRadius: '16px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'navFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px 10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#c8ff3d',
                      fontWeight: 500,
                    }}
                  >
                    DEVELOPMENT SERVICES
                  </span>
                  <svg viewBox="0 0 30 30" width="10" height="10">
                    <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(90 15 15)" />
                  </svg>
                </div>

                {/* 2-Column Items Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '6px 14px',
                    padding: '6px 14px 14px',
                  }}
                >
                  {[
                    { title: 'Website development', desc: 'Modern, responsive websites.', href: '#platform' },
                    { title: 'Mobile applications', desc: 'Android and iOS development.', href: '#services' },
                    { title: 'Custom software', desc: 'Built around your workflows.', href: '#scope-explorer' },
                    { title: 'AI and API integrations', desc: 'Connect systems. Automate tasks.', href: '#ai-integration' },
                    { title: 'Our process', desc: 'From discovery to development.', href: '#how-we-work' },
                    { title: 'Digital experiences', desc: 'Built for connected users.', href: '#global-reach' },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => handleItemNav(e, item.href)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          marginTop: '5px',
                          borderRadius: '1px',
                          backgroundColor: '#c8ff3d',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: '"Geist", sans-serif',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#ede9e8',
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: '"Geist", sans-serif',
                            fontSize: '12px',
                            color: 'rgba(237, 233, 232, 0.6)',
                            marginTop: '3px',
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Bottom Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                    borderTop: '1px solid rgba(237, 233, 232, 0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(237, 233, 232, 0.45)',
                    }}
                  >
                    SOLUTIONS FOR YOUR BUSINESS.
                  </span>
                  <a
                    href="#services"
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#c8ff3d',
                      textDecoration: 'none',
                    }}
                  >
                    Explore our services
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 2. Solutions Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: activeDropdown === 'solutions' ? '#ffffff' : 'rgba(237, 233, 232, 0.72)',
                fontSize: '14px',
                fontWeight: 400,
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              Solutions <ChevronDown size={14} style={{ opacity: 0.7, transform: activeDropdown === 'solutions' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {activeDropdown === 'solutions' && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  left: '-40px',
                  width: '340px',
                  backgroundColor: 'rgba(10, 10, 10, 0.96)',
                  border: '1px solid rgba(237, 233, 232, 0.14)',
                  borderRadius: '16px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'navFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px 10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#c8ff3d',
                      fontWeight: 500,
                    }}
                  >
                    WHAT WILL YOU BUILD?
                  </span>
                  <svg viewBox="0 0 30 30" width="10" height="10">
                    <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(90 15 15)" />
                  </svg>
                </div>

                {/* 1-Column Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px 14px 14px' }}>
                  {[
                    { title: 'Build a website', desc: 'Your business on the web.', href: '#platform' },
                    { title: 'Integrate AI', desc: 'Intelligent business workflows.', href: '#ai-integration' },
                    { title: 'Custom applications', desc: 'Software for your requirements.', href: '#business-apps' },
                    { title: 'Connect your tools', desc: 'Business apps and API integrations.', href: '#scope-explorer' },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => handleItemNav(e, item.href)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          marginTop: '5px',
                          borderRadius: '1px',
                          backgroundColor: '#c8ff3d',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: '"Geist", sans-serif',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#ede9e8',
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: '"Geist", sans-serif',
                            fontSize: '12px',
                            color: 'rgba(237, 233, 232, 0.6)',
                            marginTop: '3px',
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Bottom Bar */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '12px 20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                    borderTop: '1px solid rgba(237, 233, 232, 0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(237, 233, 232, 0.45)',
                    }}
                  >
                    WEB · MOBILE · SOFTWARE · AI
                  </span>
                  <a
                    href="#ai-integration"
                    onClick={() => setActiveDropdown(null)}
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#c8ff3d',
                      textDecoration: 'none',
                    }}
                  >
                    Explore AI integration
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 3. Resources Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: activeDropdown === 'resources' ? '#ffffff' : 'rgba(237, 233, 232, 0.72)',
                fontSize: '14px',
                fontWeight: 400,
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              Resources <ChevronDown size={14} style={{ opacity: 0.7, transform: activeDropdown === 'resources' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {activeDropdown === 'resources' && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  left: '-40px',
                  width: '340px',
                  backgroundColor: 'rgba(10, 10, 10, 0.96)',
                  border: '1px solid rgba(237, 233, 232, 0.14)',
                  borderRadius: '16px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'navFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px 10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#c8ff3d',
                      fontWeight: 500,
                    }}
                  >
                    LEARN MORE
                  </span>
                  <svg viewBox="0 0 30 30" width="10" height="10">
                    <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(90 15 15)" />
                  </svg>
                </div>

                {/* 1-Column Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px 14px 14px' }}>
                  {[
                    { title: 'Solution guides', desc: 'Explore illustrative solution ideas.', href: '#solution-guides' },
                    { title: 'About', desc: 'Get to know AI Technologies.', href: '#about-agency' },
                    { title: 'Services', desc: 'Explore what we can build.', href: '#services' },
                    { title: 'Questions, answered', desc: 'Everything before you start.', href: '#faq' },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => handleItemNav(e, item.href)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          marginTop: '5px',
                          borderRadius: '1px',
                          backgroundColor: '#c8ff3d',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: '"Geist", sans-serif',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#ede9e8',
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: '"Geist", sans-serif',
                            fontSize: '12px',
                            color: 'rgba(237, 233, 232, 0.6)',
                            marginTop: '3px',
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Bottom Bar */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '12px 20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.45)',
                    borderTop: '1px solid rgba(237, 233, 232, 0.08)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(237, 233, 232, 0.45)',
                    }}
                  >
                    YOUR NEXT SOLUTION STARTS HERE.
                  </span>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDropdown(null);
                      onOpenContact();
                    }}
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#c8ff3d',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Start a Project
                  </a>
                </div>
              </div>
            )}
          </div>

          <a
            href="#about-agency"
            onClick={(e) => handleItemNav(e, '#about-agency')}
            style={{
              color: 'rgba(237, 233, 232, 0.72)',
              fontSize: '14px',
              fontWeight: 400,
              transition: 'color 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.72)')}
          >
            About
          </a>

          <a
            href="#services-page"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateServices) onNavigateServices();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: currentView === 'services' ? '#c8ff3d' : 'rgba(237, 233, 232, 0.72)',
              fontSize: '14px',
              fontWeight: currentView === 'services' ? 600 : 400,
              transition: 'color 0.2s ease',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8ff3d')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color =
                currentView === 'services' ? '#c8ff3d' : 'rgba(237, 233, 232, 0.72)')
            }
          >
            Services <ArrowUpRight size={13} style={{ opacity: currentView === 'services' ? 1 : 0.6 }} />
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onOpenContact();
            }}
            style={{
              color: 'rgba(237, 233, 232, 0.72)',
              fontSize: '14px',
              fontWeight: 400,
              transition: 'color 0.2s ease',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.72)')}
          >
            Contact
          </a>
        </nav>

        {/* Right: Status Pill & CTA Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Status Indicator */}
          <div
            className="status-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(237, 233, 232, 0.65)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#c8ff3d',
                boxShadow: '0 0 8px rgba(200, 255, 61, 0.8)',
              }}
            />
            <span>LET'S BUILD TOGETHER</span>
          </div>

          {/* Start a Project Button */}
          <a
            href="#contact"
            className="navbar-cta-btn"
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
              borderRadius: '8px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d6ff66';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#c8ff3d';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start a Project <ArrowUpRight size={14} />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              color: '#ede9e8',
              padding: '6px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="navbar-mobile-drawer"
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(10, 10, 10, 0.98)',
            border: '1px solid rgba(237, 233, 232, 0.14)',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            backdropFilter: 'blur(24px)',
            pointerEvents: 'auto',
            zIndex: 101,
          }}
        >
          <a
            href="#platform"
            onClick={(e) => handleItemNav(e, '#platform')}
            style={{ fontSize: '15px', color: '#ede9e8', textDecoration: 'none' }}
          >
            Services
          </a>
          <a
            href="#ai-integration"
            onClick={(e) => handleItemNav(e, '#ai-integration')}
            style={{ fontSize: '15px', color: '#ede9e8', textDecoration: 'none' }}
          >
            Solutions
          </a>
          <a
            href="#solution-guides"
            onClick={(e) => handleItemNav(e, '#solution-guides')}
            style={{ fontSize: '15px', color: '#ede9e8', textDecoration: 'none' }}
          >
            Resources
          </a>
          <a
            href="#about-agency"
            onClick={(e) => handleItemNav(e, '#about-agency')}
            style={{ fontSize: '15px', color: '#ede9e8', textDecoration: 'none' }}
          >
            About
          </a>
          <a
            href="#services-page"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              if (onNavigateServices) onNavigateServices();
            }}
            style={{
              fontSize: '15px',
              color: currentView === 'services' ? '#c8ff3d' : '#ede9e8',
              fontWeight: currentView === 'services' ? 600 : 400,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            Services Page <ArrowUpRight size={14} color="#c8ff3d" />
          </a>
          <a
            href="#contact"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            style={{ fontSize: '15px', color: '#ede9e8', textDecoration: 'none' }}
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            style={{
              marginTop: '6px',
              backgroundColor: '#c8ff3d',
              color: '#000000',
              fontWeight: 700,
              fontSize: '14px',
              padding: '11px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            Start a Project <ArrowUpRight size={15} />
          </a>
        </div>
      )}

      <style>{`
        @keyframes navFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .navbar-wrapper {
          padding: 14px 20px 0;
        }
        .navbar-brand-logo {
          height: 38px;
          max-height: 38px;
        }
        .navbar-cta-btn {
          padding: 8px 14px;
          font-size: 13px;
        }
        .navbar-mobile-drawer {
          left: 20px;
          right: 20px;
          top: 72px;
          padding: 20px;
        }
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .status-pill {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .navbar-cta-btn {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .navbar-wrapper {
            padding: 10px 12px 0;
          }
          .navbar-brand-logo {
            height: 30px;
            max-height: 30px;
          }
          .navbar-cta-btn {
            padding: 7px 11px;
            font-size: 12px;
          }
          .navbar-mobile-drawer {
            left: 12px;
            right: 12px;
            top: 64px;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
