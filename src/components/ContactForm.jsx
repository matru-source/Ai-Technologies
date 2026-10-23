import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';

export default function ContactForm({ isDedicated = false, onCloseDedicated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Website development',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Asynchronously send data to support@aitechnologies.com
      await fetch('https://formsubmit.co/ajax/support@aitechnologies.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || 'Website Visitor',
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `New Project Inquiry: ${formData.service} (${formData.name || formData.email})`,
        }),
      });
    } catch (err) {
      console.warn('Form network submission fallback:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c8ff3d', '#ede9e8', '#ffffff'],
      });

      // Redirect / open client email to support@aitechnologies.com with prefilled enquiry details
      const mailtoSubject = encodeURIComponent(`Project Inquiry: ${formData.service} - ${formData.name || 'Client'}`);
      const mailtoBody = encodeURIComponent(
        `Hello AI Technologies Team,\n\nI have submitted a project inquiry via your website:\n\nName: ${formData.name || 'N/A'}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Scope & Message:\n${formData.message || 'I would like to discuss my project with your engineering team.'}\n\nLooking forward to speaking with you.`
      );
      // Initiate redirection to mail client
      setTimeout(() => {
        window.location.href = `mailto:support@aitechnologies.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }, 400);
    }
  };

  // If dedicated contact view (Screenshot 5) is requested:
  if (isDedicated) {
    return (
      <div
        className="contact-dedicated-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(5, 5, 5, 0.94)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: '1260px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Close button */}
          <button
            onClick={onCloseDedicated}
            style={{
              position: 'absolute',
              top: '-40px',
              right: '0',
              all: 'unset',
              cursor: 'pointer',
              color: '#ede9e8',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span>Close</span>
            <X size={18} />
          </button>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
              gap: '64px',
              alignItems: 'flex-start',
            }}
            className="contact-dedicated-grid"
          >
            {/* Left Column: Heading, Subtitle, and 3 Info Rows */}
            <div>
              {/* Brand Logo & Eyebrow */}
              <img
                src={aitechLogo}
                alt="AI Technologies"
                style={{
                  height: '36px',
                  width: 'auto',
                  marginBottom: '20px',
                  display: 'block',
                  objectFit: 'contain',
                }}
              />
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
                  marginBottom: '24px',
                }}
              >
                <img
                  src={aitechEmblem}
                  alt="AI Technologies"
                  style={{ width: 15, height: 15, objectFit: 'contain', flexShrink: 0 }}
                />
                <span>CONTACT</span>
              </div>

              {/* Heading */}
              <h1
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontSize: 'clamp(44px, 5.5vw, 68px)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  color: '#ede9e8',
                  margin: '0 0 24px 0',
                }}
              >
                Let’s talk about
                <br />
                <span style={{ color: '#c8ff3d' }}>your next project.</span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontSize: '18px',
                  lineHeight: 1.5,
                  color: 'rgba(237, 233, 232, 0.72)',
                  maxWidth: '440px',
                  margin: '0 0 48px 0',
                }}
              >
                Need a website, mobile app, custom software or AI integration? Tell AI Technologies what you have in mind.
              </p>

              {/* 3 Info Rows */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '1px solid rgba(237, 233, 232, 0.1)',
                }}
              >
                {[
                  {
                    kicker: 'EXPLORE OUR SERVICES',
                    value: 'Find the right solution',
                    href: '#services',
                    isLime: true,
                  },
                  {
                    kicker: 'OUR APPROACH',
                    value: 'Learn about AI Technologies',
                    href: '#about-agency',
                    isLime: false,
                  },
                  {
                    kicker: 'PROJECT PLANNING',
                    value: 'Tell us your goals and requirements',
                    href: null,
                    isLime: false,
                  },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 0',
                      borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
                      gap: '16px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(237, 233, 232, 0.5)',
                      }}
                    >
                      {row.kicker}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        onClick={onCloseDedicated}
                        style={{
                          fontFamily: '"Geist", sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: row.isLime ? '#c8ff3d' : '#ede9e8',
                          textDecoration: 'none',
                        }}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily: '"Geist", sans-serif',
                          fontSize: '14px',
                          color: 'rgba(237, 233, 232, 0.85)',
                        }}
                      >
                        {row.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Official Office Details Card */}
              <div
                style={{
                  marginTop: '32px',
                  padding: '20px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(237, 233, 232, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#c8ff3d',
                  }}
                >
                  GLOBAL HEADQUARTERS & CONTACT
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(237, 233, 232, 0.85)' }}>
                  Saheed Nagar, near BMC Bhawani Mall,<br />
                  Bhubaneswar, Odisha 751007, India
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', paddingTop: '4px' }}>
                  <a
                    href="tel:+919777221665"
                    style={{ color: '#c8ff3d', textDecoration: 'none', fontWeight: 500 }}
                  >
                    📞 +91 9777221665
                  </a>
                  <a
                    href="mailto:support@aitechnologies.com"
                    style={{ color: '#c8ff3d', textDecoration: 'none', fontWeight: 500 }}
                  >
                    ✉️ support@aitechnologies.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Dedicated Contact Form Card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                backgroundColor: 'rgba(12, 12, 12, 0.95)',
                border: '1px solid rgba(237, 233, 232, 0.14)',
                padding: '36px 32px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Corner tick at top right */}
              <svg
                viewBox="0 0 30 30"
                width="11"
                height="11"
                style={{ position: 'absolute', right: 14, top: 14 }}
              >
                <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(90 15 15)" />
              </svg>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                  <CheckCircle2 size={48} color="#c8ff3d" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '24px', color: '#ede9e8', margin: '0 0 10px 0' }}>
                    Inquiry Dispatched
                  </h3>
                  <p style={{ fontSize: '15px', color: 'rgba(237, 233, 232, 0.85)', margin: '0 0 12px 0' }}>
                    Thank you! Your project details have been routed to{' '}
                    <strong style={{ color: '#c8ff3d' }}>support@aitechnologies.com</strong>.
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.6)', margin: '0 0 24px 0' }}>
                    Our engineering leads review all project briefs and respond within 24 hours. For urgent requests, call{' '}
                    <a href="tel:+919777221665" style={{ color: '#c8ff3d', textDecoration: 'none' }}>+91 9777221665</a>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      backgroundColor: '#c8ff3d',
                      color: '#000000',
                      fontWeight: 600,
                      fontSize: '13px',
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Your Name */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(237, 233, 232, 0.55)',
                        marginBottom: '8px',
                      }}
                    >
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(237, 233, 232, 0.14)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#ede9e8',
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#c8ff3d')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(237, 233, 232, 0.14)')}
                    />
                  </div>

                  {/* Your Email */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(237, 233, 232, 0.55)',
                        marginBottom: '8px',
                      }}
                    >
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(237, 233, 232, 0.14)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#ede9e8',
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#c8ff3d')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(237, 233, 232, 0.14)')}
                    />
                  </div>

                  {/* What's it about? */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(237, 233, 232, 0.55)',
                        marginBottom: '8px',
                      }}
                    >
                      WHAT’S IT ABOUT?
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: '#121212',
                        border: '1px solid rgba(237, 233, 232, 0.14)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#ede9e8',
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="Website development">Website development</option>
                      <option value="Mobile applications">Mobile applications</option>
                      <option value="Custom software">Custom software</option>
                      <option value="AI integration">AI integration</option>
                      <option value="Connected systems & APIs">Connected systems & APIs</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(237, 233, 232, 0.55)',
                        marginBottom: '8px',
                      }}
                    >
                      MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us a little about it."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(237, 233, 232, 0.14)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#ede9e8',
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#c8ff3d')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(237, 233, 232, 0.14)')}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: '#c8ff3d',
                      color: '#000000',
                      fontWeight: 600,
                      fontSize: '14px',
                      padding: '14px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
                  >
                    {submitting ? 'Sending...' : 'Send message'} <ArrowUpRight size={15} />
                  </button>

                  <div
                    style={{
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '12px',
                      color: 'rgba(237, 233, 232, 0.5)',
                      textAlign: 'center',
                    }}
                  >
                    We’ll only use your details to reply to your message.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal Homepage Card (Screenshot 4 Section 4)
  return (
    <section
      id="contact"
      data-framer-name="Contact Card"
      className="contact-card-section"
      style={{
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      <div
        className="contact-card-inner"
        style={{
          position: 'relative',
          borderRadius: '20px',
          backgroundColor: 'rgba(10, 10, 10, 0.88)',
          border: '1px solid rgba(237, 233, 232, 0.14)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
        }}
      >
        {/* Neon Lime Corner Brackets: Top-Left and Bottom-Right */}
        <svg
          viewBox="0 0 30 30"
          width="14"
          height="14"
          style={{ position: 'absolute', left: 14, top: 14 }}
        >
          <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" />
        </svg>

        <svg
          viewBox="0 0 30 30"
          width="14"
          height="14"
          style={{ position: 'absolute', right: 14, bottom: 14 }}
        >
          <path d="M0,0H30V8H8V30H0Z" fill="#c8ff3d" transform="rotate(180 15 15)" />
        </svg>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.1fr)',
            gap: '56px',
            alignItems: 'flex-start',
          }}
          className="contact-card-grid"
        >
          {/* Left Column */}
          <div>
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
                style={{ width: 15, height: 15, objectFit: 'contain', flexShrink: 0 }}
              />
              <span>START A PROJECT</span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: 'clamp(36px, 4.4vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                color: '#ede9e8',
                margin: '0 0 20px 0',
              }}
            >
              Have a project in
              <br />
              mind?
              <br />
              <span style={{ color: '#c8ff3d' }}>Let’s build what’s next.</span>
            </h2>

            <p
              style={{
                fontFamily: '"Geist", sans-serif',
                fontSize: '17px',
                lineHeight: 1.5,
                color: 'rgba(237, 233, 232, 0.72)',
                maxWidth: '420px',
                margin: '0 0 32px 0',
              }}
            >
              Tell AI Technologies about your goals, users and the digital solution you need.
            </p>

            {/* Tag Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(237, 233, 232, 0.65)',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '1px',
                  backgroundColor: '#c8ff3d',
                }}
              />
              <span>WEBSITES. MOBILE APPS. INTELLIGENT SOFTWARE.</span>
            </div>

            {/* Official Office Details */}
            <div
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(237, 233, 232, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxWidth: '440px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#c8ff3d',
                }}
              >
                DIRECT CONTACT & OFFICE
              </div>
              <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(237, 233, 232, 0.8)' }}>
                Saheed Nagar, near BMC Bhawani Mall,<br />
                Bhubaneswar, Odisha 751007, India
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13px', paddingTop: '4px' }}>
                <a
                  href="tel:+919777221665"
                  style={{ color: '#c8ff3d', textDecoration: 'none', fontWeight: 500 }}
                >
                  📞 +91 9777221665
                </a>
                <a
                  href="mailto:support@aitechnologies.com"
                  style={{ color: '#c8ff3d', textDecoration: 'none', fontWeight: 500 }}
                >
                  ✉️ support@aitechnologies.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <CheckCircle2 size={44} color="#c8ff3d" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '22px', color: '#ede9e8', margin: '0 0 10px 0' }}>
                  Project Enquiry Dispatched
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(237, 233, 232, 0.85)', margin: '0 0 10px 0' }}>
                  Thank you! Your project details have been routed to{' '}
                  <strong style={{ color: '#c8ff3d' }}>support@aitechnologies.com</strong>.
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.6)', margin: '0 0 20px 0' }}>
                  We’ll review your details and reach out within 24 hours. For urgent needs, call{' '}
                  <a href="tel:+919777221665" style={{ color: '#c8ff3d', textDecoration: 'none' }}>+91 9777221665</a>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '7px',
                    backgroundColor: '#c8ff3d',
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Your Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(237, 233, 232, 0.55)',
                      marginBottom: '6px',
                    }}
                  >
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(237, 233, 232, 0.14)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#ede9e8',
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#c8ff3d')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(237, 233, 232, 0.14)')}
                  />
                </div>

                {/* Your Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(237, 233, 232, 0.55)',
                      marginBottom: '6px',
                    }}
                  >
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(237, 233, 232, 0.14)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#ede9e8',
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#c8ff3d')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(237, 233, 232, 0.14)')}
                  />
                </div>

                {/* What are you building? */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(237, 233, 232, 0.55)',
                      marginBottom: '6px',
                    }}
                  >
                    WHAT ARE YOU BUILDING?
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#121212',
                      border: '1px solid rgba(237, 233, 232, 0.14)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#ede9e8',
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Choose your starting point">Choose your starting point</option>
                    <option value="Website development">Website development</option>
                    <option value="Mobile applications">Mobile applications</option>
                    <option value="Custom software">Custom software</option>
                    <option value="AI integration">AI integration</option>
                    <option value="Connected API systems">Connected API systems</option>
                  </select>
                </div>

                {/* Tell us more (Optional) */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(237, 233, 232, 0.55)',
                      marginBottom: '6px',
                    }}
                  >
                    TELL US MORE (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your website, mobile app, software or automation project."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(237, 233, 232, 0.14)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#ede9e8',
                      fontFamily: '"Geist", sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#c8ff3d')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(237, 233, 232, 0.14)')}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#c8ff3d',
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: '14px',
                    padding: '13px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
                >
                  {submitting ? 'Sending...' : 'Send project enquiry'} <ArrowUpRight size={15} />
                </button>

                <div
                  style={{
                    fontFamily: '"Geist", sans-serif',
                    fontSize: '12px',
                    color: 'rgba(237, 233, 232, 0.45)',
                  }}
                >
                  We’ll use your details to discuss your project enquiry.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-dedicated-overlay {
          padding: 80px 24px 60px;
        }
        .contact-card-section {
          padding: 70px 48px 90px;
        }
        .contact-card-inner {
          padding: 48px 44px;
        }
        @media (max-width: 900px) {
          .contact-card-section {
            padding: 50px 24px 70px;
          }
          .contact-card-inner {
            padding: 36px 28px;
          }
          .contact-card-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .contact-dedicated-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .contact-dedicated-overlay {
            padding: 60px 16px 40px;
          }
          .contact-card-section {
            padding: 36px 16px 56px;
          }
          .contact-card-inner {
            padding: 24px 16px;
            border-radius: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
