import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  Shield,
  Globe,
  Smartphone,
  Zap,
  BarChart3,
  Check,
  Code2,
  X,
  Filter,
  Monitor,
} from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';
import ContactForm from './ContactForm';
import Footer from './Footer';
import { getStoredProjects } from '../data/projectsData';

export default function ProjectsPage({ onOpenContact, onNavigateHome, onNavigateServices }) {
  const [projects, setProjects] = useState(getStoredProjects);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'AI Technologies — Featured Projects & Portfolio';

    const handleSync = () => {
      setProjects(getStoredProjects());
    };
    window.addEventListener('aitech_projects_changed', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      document.title = 'AI Technologies — Ideas | Innovation | Impact';
      window.removeEventListener('aitech_projects_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'AI & Automation',
    'Web Platforms',
    'Mobile Apps',
    'Enterprise SaaS',
  ];

  const publishedProjects = projects.filter((p) => p.status !== 'Draft');

  const filteredProjects = publishedProjects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.tagline && project.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.tags && project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', background: 'transparent' }}>
      {/* 1. Hero Banner */}
      <section
        className="projects-hero-section"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '70px 32px 40px',
          position: 'relative',
        }}
      >
        {/* Navigation Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(237, 233, 232, 0.5)',
          }}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
            }}
            style={{
              color: 'rgba(237, 233, 232, 0.7)',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#c8ff3d')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.7)')}
          >
            <ArrowLeft size={12} /> HOME
          </a>
          <span>/</span>
          <span style={{ color: '#c8ff3d' }}>PROJECTS & PORTFOLIO</span>
        </div>

        {/* Kicker Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(200, 255, 61, 0.08)',
            border: '1px solid rgba(200, 255, 61, 0.25)',
            borderRadius: '100px',
            padding: '5px 14px',
            marginBottom: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#c8ff3d',
          }}
        >
          <Sparkles size={12} />
          <span>PORTFOLIO & CASE STUDIES ── PRODUCTION DELIVERIES</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: '"Geist", sans-serif',
            fontSize: 'clamp(36px, 5.8vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            margin: '0 0 20px 0',
            maxWidth: '920px',
          }}
        >
          Featured Projects.{' '}
          <span style={{ color: '#c8ff3d' }}>Engineered for Impact.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 1.35vw, 19px)',
            lineHeight: 1.55,
            color: 'rgba(237, 233, 232, 0.72)',
            maxWidth: '680px',
            margin: '0 0 36px 0',
          }}
        >
          Explore our proven portfolio of modern web platforms, mobile apps, and enterprise AI systems built to scale businesses worldwide.
        </p>

        {/* Filter Controls Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
          }}
        >
          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? publishedProjects.length
                  : publishedProjects.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    fontFamily: '"Geist", sans-serif',
                    color: isActive ? '#000000' : 'rgba(237, 233, 232, 0.75)',
                    backgroundColor: isActive ? '#c8ff3d' : 'rgba(255, 255, 255, 0.04)',
                    border: isActive
                      ? '1px solid #c8ff3d'
                      : '1px solid rgba(237, 233, 232, 0.12)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(200, 255, 61, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.12)';
                    }
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10.5px',
                      opacity: isActive ? 0.85 : 0.6,
                      background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.08)',
                      padding: '1px 6px',
                      borderRadius: '10px',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(15, 14, 14, 0.8)',
                border: '1px solid rgba(237, 233, 232, 0.14)',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none',
                width: '220px',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#c8ff3d')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(237, 233, 232, 0.14)')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(237, 233, 232, 0.5)',
                  cursor: 'pointer',
                  padding: '2px',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Projects Showcase Grid: 3 Projects in a Row */}
      <section
        className="projects-grid-section"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 32px 70px',
        }}
      >
        {filteredProjects.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              background: 'rgba(14, 13, 13, 0.6)',
              borderRadius: '16px',
              border: '1px solid rgba(237, 233, 232, 0.1)',
            }}
          >
            <p style={{ color: 'rgba(237, 233, 232, 0.6)', fontSize: '15px' }}>
              No projects found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              style={{
                marginTop: '12px',
                background: '#c8ff3d',
                color: '#000',
                border: 'none',
                fontWeight: 600,
                fontSize: '13px',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className="projects-3col-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '28px',
            }}
          >
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="project-card-item"
                style={{
                  backgroundColor: 'rgba(12, 11, 11, 0.85)',
                  border: '1px solid rgba(237, 233, 232, 0.12)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(200, 255, 61, 0.4)';
                  e.currentTarget.style.boxShadow =
                    '0 20px 48px rgba(0, 0, 0, 0.7), 0 0 20px rgba(200, 255, 61, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.12)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.45)';
                }}
              >
                {/* Visual Top Preview Frame */}
                <div
                  style={{
                    height: '190px',
                    background: 'linear-gradient(180deg, rgba(24, 23, 23, 0.95) 0%, rgba(10, 10, 10, 0.95) 100%)',
                    borderBottom: '1px solid rgba(237, 233, 232, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                  }}
                >
                  {/* Subtle Glow Backdrop */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-40px',
                      right: '-40px',
                      width: '160px',
                      height: '160px',
                      background: `radial-gradient(circle, ${p.accentColor}25 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Bar of the Card Preview: Browser Dot Controls & Category Pill */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'rgba(237, 233, 232, 0.75)',
                      }}
                    >
                      {p.category}
                    </div>
                  </div>

                  {/* Center Schematic Visual Diagram */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '4px 0',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(200, 255, 61, 0.12)',
                            border: '1px solid rgba(200, 255, 61, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#c8ff3d',
                          }}
                        >
                          {p.category === 'AI & Automation' ? (
                            <Cpu size={15} />
                          ) : p.category === 'Mobile Apps' ? (
                            <Smartphone size={15} />
                          ) : p.category === 'Enterprise SaaS' ? (
                            <Shield size={15} />
                          ) : (
                            <Globe size={15} />
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: 'rgba(237, 233, 232, 0.5)', fontFamily: 'var(--font-mono)' }}>
                            CLIENT / SPEC
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}>
                            {p.client}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          color: '#c8ff3d',
                          background: 'rgba(200, 255, 61, 0.08)',
                          padding: '3px 8px',
                          borderRadius: '100px',
                          border: '1px solid rgba(200, 255, 61, 0.25)',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#c8ff3d',
                            boxShadow: '0 0 6px #c8ff3d',
                          }}
                        />
                        <span>{p.status}</span>
                      </div>
                    </div>

                    {/* Metric Highlight Ribbon */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: '#ede9e8',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        {p.heroMetric}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: '#c8ff3d',
                          background: 'rgba(200, 255, 61, 0.08)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(200, 255, 61, 0.2)',
                        }}
                      >
                        {p.secondaryMetric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content Details */}
                <div
                  style={{
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Project Title */}
                    <h3
                      style={{
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: '0 0 6px 0',
                        lineHeight: 1.25,
                      }}
                    >
                      {p.title}
                    </h3>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: '#c8ff3d',
                        marginBottom: '12px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {p.type} • {p.year}
                    </div>

                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.55,
                        color: 'rgba(237, 233, 232, 0.68)',
                        margin: '0 0 18px 0',
                        minHeight: '60px',
                      }}
                    >
                      {p.tagline}
                    </p>

                    {/* Tech Stack Chips */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '20px',
                      }}
                    >
                      {p.tags.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10.5px',
                            color: 'rgba(237, 233, 232, 0.7)',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(237, 233, 232, 0.08)',
                            padding: '3px 7px',
                            borderRadius: '4px',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10.5px',
                            color: '#c8ff3d',
                            backgroundColor: 'rgba(200, 255, 61, 0.06)',
                            border: '1px solid rgba(200, 255, 61, 0.2)',
                            padding: '3px 7px',
                            borderRadius: '4px',
                          }}
                        >
                          +{p.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(237, 233, 232, 0.08)',
                    }}
                  >
                    <button
                      onClick={() => setSelectedProject(p)}
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        backgroundColor: '#c8ff3d',
                        color: '#000000',
                        fontWeight: 600,
                        fontSize: '12.5px',
                        padding: '9px 14px',
                        borderRadius: '7px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
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
                      View Case Study <ArrowUpRight size={14} />
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenContact) onOpenContact();
                      }}
                      title="Inquire about a similar project"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(237, 233, 232, 0.12)',
                        color: 'rgba(237, 233, 232, 0.8)',
                        padding: '9px 12px',
                        borderRadius: '7px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.color = 'rgba(237, 233, 232, 0.8)';
                      }}
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Interactive Case Study Modal */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            boxSizing: 'border-box',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal-content"
            style={{
              backgroundColor: '#0c0b0b',
              border: '1px solid rgba(200, 255, 61, 0.3)',
              borderRadius: '20px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 32px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(200, 255, 61, 0.15)',
              position: 'relative',
              padding: '36px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#c8ff3d',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                }}
              >
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span>{selectedProject.client}</span>
                <span>•</span>
                <span>{selectedProject.year}</span>
              </div>

              <h2
                style={{
                  fontFamily: '"Geist", sans-serif',
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 10px 0',
                }}
              >
                {selectedProject.title}
              </h2>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.5,
                  color: 'rgba(237, 233, 232, 0.75)',
                  margin: 0,
                }}
              >
                {selectedProject.tagline}
              </p>
            </div>

            {/* Metrics Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  background: 'rgba(200, 255, 61, 0.06)',
                  border: '1px solid rgba(200, 255, 61, 0.2)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(237, 233, 232, 0.5)' }}>
                  PRIMARY METRIC
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: '#c8ff3d', marginTop: '4px' }}>
                  {selectedProject.heroMetric}
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(237, 233, 232, 0.5)' }}>
                  EFFICIENCY IMPACT
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                  {selectedProject.secondaryMetric}
                </div>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d', textTransform: 'uppercase', marginBottom: '6px' }}>
                  THE ENGINEERING CHALLENGE
                </h4>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(237, 233, 232, 0.8)', margin: 0 }}>
                  {selectedProject.challenge}
                </p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d', textTransform: 'uppercase', marginBottom: '6px' }}>
                  HOW WE DELIVERED THE SOLUTION
                </h4>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(237, 233, 232, 0.8)', margin: 0 }}>
                  {selectedProject.solution}
                </p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d', textTransform: 'uppercase', marginBottom: '8px' }}>
                  KEY SYSTEM DELIVERABLES
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {selectedProject.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12.5px',
                        color: 'rgba(237, 233, 232, 0.85)',
                      }}
                    >
                      <Check size={14} color="#c8ff3d" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Full Tech Stack */}
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d', textTransform: 'uppercase', marginBottom: '8px' }}>
                TECHNOLOGY STACK
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedProject.tags.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#ede9e8',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button Inside Modal */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  if (onOpenContact) onOpenContact();
                }}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#c8ff3d',
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 8px 24px rgba(200, 255, 61, 0.3)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
              >
                Start a Project Like This <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ede9e8',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Conversion CTA Banner */}
      <section
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '40px 32px 80px',
        }}
      >
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(18, 17, 17, 0.95) 0%, rgba(9, 9, 9, 0.98) 100%)',
            border: '1px solid rgba(200, 255, 61, 0.25)',
            borderRadius: '24px',
            padding: '48px 40px',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7), 0 0 32px rgba(200, 255, 61, 0.08)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#c8ff3d',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={12} />
            <span>LET’S COLLABORATE</span>
          </div>

          <h2
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 16px 0',
              lineHeight: 1.15,
            }}
          >
            Have a project in mind?{' '}
            <span style={{ color: '#c8ff3d' }}>Let’s build it.</span>
          </h2>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'rgba(237, 233, 232, 0.7)',
              maxWidth: '560px',
              margin: '0 auto 28px',
            }}
          >
            From high-velocity web platforms and AI automation to enterprise applications, our engineering team is ready to deliver.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                if (onOpenContact) onOpenContact();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#c8ff3d',
                color: '#000000',
                fontWeight: 700,
                fontSize: '14px',
                padding: '13px 26px',
                borderRadius: '9px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 8px 24px rgba(200, 255, 61, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d6ff66';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#c8ff3d';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start a Project <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => {
                if (onNavigateServices) onNavigateServices();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ede9e8',
                fontWeight: 600,
                fontSize: '14px',
                padding: '13px 22px',
                borderRadius: '9px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
            >
              Explore Our Services <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <ContactForm />

      {/* 6. Footer */}
      <Footer
        onOpenContact={onOpenContact}
        onNavigateHome={onNavigateHome}
        onNavigateServices={onNavigateServices}
      />

      <style>{`
        .projects-hero-section {
          padding: 70px 32px 40px;
        }
        .projects-grid-section {
          padding: 0 32px 70px;
        }
        .projects-3col-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }

        @media (max-width: 1040px) {
          .projects-3col-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 20px !important;
          }
          .projects-hero-section {
            padding: 50px 24px 32px;
          }
          .projects-grid-section {
            padding: 0 24px 50px;
          }
        }

        @media (max-width: 640px) {
          .projects-3col-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .projects-hero-section {
            padding: 40px 16px 24px;
          }
          .projects-grid-section {
            padding: 0 16px 40px;
          }
        }
      `}</style>
    </div>
  );
}
