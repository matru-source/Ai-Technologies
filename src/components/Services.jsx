import React, { useState } from 'react';
import { Globe, Smartphone, Apple, ArrowUpRight, Check } from 'lucide-react';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function Services({ onSelectService }) {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 'web',
      number: '01',
      title: 'Website development.',
      desc: 'Modern, responsive websites that connect your business with its audience.',
      icon: Globe,
      features: [
        'Responsive layouts across all viewports',
        'SEO-optimized semantic architecture',
        'Sub-second load times & CDN caching',
        'Headless CMS & custom management tools',
      ],
      technologies: ['React', 'Next.js', 'Vite', 'TypeScript', 'Node.js'],
    },
    {
      id: 'android',
      number: '02',
      title: 'Android app development.',
      desc: 'Mobile experiences designed around your users and business needs.',
      icon: Smartphone,
      features: [
        'Modern declarative UI with Jetpack Compose',
        'Offline-first synchronization & caching',
        'Hardware sensor & camera integration',
        'Google Play Store release management',
      ],
      technologies: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Ktor'],
    },
    {
      id: 'ios',
      number: '03',
      title: 'iOS app development.',
      desc: 'Thoughtful iPhone and iPad applications, from concept to release.',
      icon: Apple,
      features: [
        'Swift & SwiftUI native architecture',
        'Fluid gestures & Apple HIG precision',
        'WidgetKit & Live Activities support',
        'TestFlight & App Store automated submission',
      ],
      technologies: ['Swift', 'SwiftUI', 'CoreML', 'Combine'],
    },
  ];

  return (
    <section
      id="services"
      style={{
        padding: '90px 0',
        position: 'relative',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div
        className="services-container"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow & Title */}
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
            <span>02 / OUR SERVICES</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(32px, 5.5vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: '#ffffff',
            }}
          >
            You bring the idea.
            <br />
            <span style={{ color: 'rgba(237, 233, 232, 0.5)' }}>
              We build the solution.
            </span>
          </h2>
        </div>

        {/* 3 Main Service Cards Grid */}
        <div className="services-cards-grid">
          {services.map((s) => {
            const Icon = s.icon;
            const isHovered = activeService === s.id;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setActiveService(s.id)}
                onMouseLeave={() => setActiveService(null)}
                style={{
                  background: 'rgba(18, 17, 17, 0.75)',
                  border: `1px solid ${
                    isHovered ? '#c8ff3d' : 'rgba(237, 233, 232, 0.12)'
                  }`,
                  borderRadius: '12px',
                  padding: '36px 32px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '380px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: isHovered
                    ? '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(200, 255, 61, 0.15)'
                    : 'none',
                }}
                onClick={() => onSelectService && onSelectService(s.title)}
              >
                {/* Top Corner Decorative Tick */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '10px',
                    height: '10px',
                    borderTop: `1.5px solid ${
                      isHovered ? '#c8ff3d' : 'rgba(237, 233, 232, 0.25)'
                    }`,
                    borderRight: `1.5px solid ${
                      isHovered ? '#c8ff3d' : 'rgba(237, 233, 232, 0.25)'
                    }`,
                    transition: 'border-color 0.25s',
                  }}
                />

                <div>
                  {/* Icon & Number */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '28px',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: isHovered
                          ? '#c8ff3d'
                          : 'rgba(237, 233, 232, 0.08)',
                        color: isHovered ? '#000' : '#c8ff3d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.25s',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'rgba(237, 233, 232, 0.4)',
                      }}
                    >
                      {s.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#ffffff',
                      letterSpacing: '-0.03em',
                      marginBottom: '12px',
                    }}
                  >
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.55,
                      color: 'rgba(237, 233, 232, 0.72)',
                      marginBottom: '24px',
                    }}
                  >
                    {s.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {s.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '13px',
                          color: 'rgba(237, 233, 232, 0.85)',
                        }}
                      >
                        <Check size={14} style={{ color: '#c8ff3d', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '32px',
                    paddingTop: '20px',
                    borderTop: '1px solid rgba(237, 233, 232, 0.08)',
                  }}
                >
                  {s.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'rgba(237, 233, 232, 0.55)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Card: "Your business. Your software." */}
        <div
          className="services-bottom-banner"
          style={{
            background: 'rgba(18, 17, 17, 0.75)',
            border: '1px solid rgba(237, 233, 232, 0.12)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '4px',
              }}
            >
              Your business. Your software.
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(237, 233, 232, 0.65)',
              }}
            >
              Custom web applications tailored precisely to your team's operational needs.
            </p>
          </div>

          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '8px',
              border: '1px solid rgba(237, 233, 232, 0.25)',
              background: 'rgba(0, 0, 0, 0.4)',
              color: '#ede9e8',
              fontSize: '13px',
              fontWeight: 600,
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
            Explore Our Services <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <style>{`
        .services-container {
          padding: 0 36px;
        }
        .services-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }
        .services-bottom-banner {
          padding: 28px 36px;
        }
        @media (max-width: 900px) {
          .services-container {
            padding: 0 24px;
          }
          .services-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .services-bottom-banner {
            padding: 24px 22px;
          }
        }
        @media (max-width: 600px) {
          .services-container {
            padding: 0 16px;
          }
          .services-cards-grid {
            gap: 16px;
          }
          .services-bottom-banner {
            padding: 20px 16px;
          }
        }
      `}</style>
    </section>
  );
}
