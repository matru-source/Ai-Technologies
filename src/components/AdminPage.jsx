import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Activity,
  Server,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  RefreshCw,
  Sliders,
  Sparkles,
  Terminal,
  Layers,
  FileText,
  Inbox,
  Mail,
  Phone,
  Globe,
  ArrowUpRight,
  ShieldAlert,
  X,
  Check,
} from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';

export default function AdminPage({ onNavigateHome, onNavigateProjects, onNavigateServices, onOpenContact }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'AI Technologies — Enterprise Admin Console';
    return () => {
      document.title = 'AI Technologies — Ideas | Innovation | Impact';
    };
  }, []);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('aitech_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active console tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'leads' | 'telemetry'

  // Portfolio items in admin state (persisted to localStorage)
  const initialProjects = [
    {
      id: 'aura-fintech',
      title: 'Aura FinTech Global Banking',
      client: 'Aura Financial UK',
      category: 'Enterprise SaaS',
      status: 'Published',
      year: '2026',
      heroMetric: '💳 $45M+ Monthly Volume',
      tags: ['Next.js 15', 'Node.js', 'Stripe Treasury', 'Redis'],
    },
    {
      id: 'kinetix-commerce',
      title: 'Kinetix Headless Commerce Suite',
      client: 'Kinetix Apparel Global',
      category: 'Web Platforms',
      status: 'Published',
      year: '2025',
      heroMetric: '🚀 99 Core Web Vitals',
      tags: ['React', 'Shopify Storefront', 'GraphQL', 'Edge CDN'],
    },
    {
      id: 'pulse-health',
      title: 'Pulse Health Clinical Telehealth',
      client: 'Pulse Health Systems',
      category: 'Mobile Apps',
      status: 'Published',
      year: '2026',
      heroMetric: '🏥 HIPAA Compliant',
      tags: ['React Native', 'WebRTC', 'FastAPI', 'AWS GovCloud'],
    },
    {
      id: 'vortex-cloud',
      title: 'Vortex Cloud Kubernetes Mesh',
      client: 'Vortex Data Labs',
      category: 'Enterprise SaaS',
      status: 'Published',
      year: '2026',
      heroMetric: '⏱️ 99.999% SLA',
      tags: ['Go', 'Kubernetes', 'Prometheus', 'Docker'],
    },
    {
      id: 'apex-logistics',
      title: 'Apex Global Fleet & Supply Chain',
      client: 'Apex TransLogistics',
      category: 'Web Platforms',
      status: 'Published',
      year: '2025',
      heroMetric: '🗺️ 15,000+ Vehicles',
      tags: ['Mapbox GL', 'Node.js', 'WebSocket', 'PostGIS'],
    },
    {
      id: 'synthetix-studio',
      title: 'Synthetix 3D Creative Studio',
      client: 'Synthetix Media Group',
      category: 'AI & Automation',
      status: 'Published',
      year: '2026',
      heroMetric: '🎨 2.5M Assets Rendered',
      tags: ['Three.js', 'WebGL 2.0', 'GLSL', 'WebAssembly'],
    },
    {
      id: 'chronos-workspace',
      title: 'Chronos Team Collaboration Suite',
      client: 'Chronos Software Inc',
      category: 'Mobile Apps',
      status: 'Published',
      year: '2025',
      heroMetric: '📱 85k Daily Users',
      tags: ['React Native', 'CRDTs', 'SQLite', 'Tailwind'],
    },
    {
      id: 'cybershield-gateway',
      title: 'CyberShield Zero-Trust Access',
      client: 'CyberShield Security Labs',
      category: 'Enterprise SaaS',
      status: 'Published',
      year: '2026',
      heroMetric: '🛡️ ISO 27001 Certified',
      tags: ['Rust Core', 'Next.js 15', 'WireGuard', 'WebAuthn'],
    },
  ];

  const [projectList, setProjectList] = useState(() => {
    try {
      const saved = localStorage.getItem('aitech_admin_projects');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const saveProjects = (newList) => {
    setProjectList(newList);
    try {
      localStorage.setItem('aitech_admin_projects', JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  // Inquiries / Leads state
  const initialLeads = [
    {
      id: 'lead-101',
      name: 'Alexander Wright',
      company: 'Apex Venture Capital',
      email: 'a.wright@apexvc.io',
      service: 'Custom software',
      scope: 'Enterprise Core System ($15k - $30k)',
      date: 'Today, 2:45 PM',
      status: 'New',
      message: 'Looking to architect a high-frequency asset allocation portal with real-time portfolio rebalancing.',
    },
    {
      id: 'lead-102',
      name: 'Dr. Sarah Lin',
      company: 'Novus MedTech UK',
      email: 's.lin@novusmed.co.uk',
      service: 'Mobile applications',
      scope: 'Native iOS & Android ($10k - $20k)',
      date: 'Yesterday, 6:12 PM',
      status: 'In Review',
      message: 'We require a HIPAA/GDPR compliant telemedicine mobile application with live video triage.',
    },
    {
      id: 'lead-103',
      name: 'Marcus Vance',
      company: 'Kinetix Global Brand',
      email: 'marcus@kinetixapparel.com',
      service: 'Website development',
      scope: 'Headless E-Commerce ($8k - $15k)',
      date: 'Nov 18, 2026',
      status: 'Contacted',
      message: 'Need a sub-second headless React storefront connected to Shopify Plus with 3D product previews.',
    },
    {
      id: 'lead-104',
      name: 'Priyanka Sharma',
      company: 'Bhubaneswar Smart Mobility',
      email: 'p.sharma@odishamobility.gov.in',
      service: 'AI and APIs',
      scope: 'Predictive Transit AI ($25k+)',
      date: 'Nov 17, 2026',
      status: 'In Review',
      message: 'Government initiative to deploy real-time bus telemetry, dynamic passenger ETA screens, and automated scheduling.',
    },
  ];

  const [leads, setLeads] = useState(initialLeads);

  // New project modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    client: '',
    category: 'Web Platforms',
    heroMetric: '',
    tags: '',
  });

  const handleLogin = (e) => {
    e?.preventDefault();
    if (passcode.trim() === 'Support@2026z') {
      sessionStorage.setItem('aitech_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid admin password. Access denied.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aitech_admin_auth');
    setIsAuthenticated(false);
  };

  const toggleProjectStatus = (id) => {
    const updated = projectList.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: p.status === 'Published' ? 'Draft' : 'Published',
        };
      }
      return p;
    });
    saveProjects(updated);
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to remove this project?')) {
      const updated = projectList.filter((p) => p.id !== id);
      saveProjects(updated);
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const created = {
      id: 'proj-' + Date.now(),
      title: newProject.title,
      client: newProject.client || 'Enterprise Client',
      category: newProject.category,
      status: 'Published',
      year: '2026',
      heroMetric: newProject.heroMetric || '⚡ Production Ready',
      tags: newProject.tags ? newProject.tags.split(',').map((t) => t.trim()) : ['React', 'Node.js'],
    };

    saveProjects([created, ...projectList]);
    setIsAddModalOpen(false);
    setNewProject({
      title: '',
      client: '',
      category: 'Web Platforms',
      heroMetric: '',
      tags: '',
    });
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const exportLeadsCSV = () => {
    const headers = 'ID,Name,Company,Email,Service,Scope,Date,Status,Message\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.company}","${l.email}","${l.service}","${l.scope}","${l.date}","${l.status}","${l.message.replace(/"/g, '""')}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `aitech_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Passcode Gateway / Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: '440px',
            width: '100%',
            backgroundColor: 'rgba(12, 11, 11, 0.92)',
            border: '1px solid rgba(200, 255, 61, 0.3)',
            borderRadius: '20px',
            padding: '36px 32px',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(200, 255, 61, 0.1)',
            backdropFilter: 'blur(30px)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Top Lock Badge */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: 'rgba(200, 255, 61, 0.12)',
              border: '1px solid rgba(200, 255, 61, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#c8ff3d',
            }}
          >
            <Lock size={24} />
          </div>

          <img
            src={aitechLogo}
            alt="AI Technologies"
            style={{ height: '32px', width: 'auto', margin: '0 auto 16px', display: 'block' }}
          />

          <h2
            style={{
              fontFamily: '"Geist", sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 6px 0',
            }}
          >
            Enterprise Admin Portal
          </h2>

          <p
            style={{
              fontSize: '13px',
              color: 'rgba(237, 233, 232, 0.65)',
              margin: '0 0 24px 0',
              lineHeight: 1.5,
            }}
          >
            Restricted access for authorized AI Technologies engineering & operations staff.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Admin Password..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: authError ? '1px solid #ff4d4f' : '1px solid rgba(237, 233, 232, 0.15)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: showPassword ? 'normal' : '0.12em',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#c8ff3d')}
                onBlur={(e) => (e.target.style.borderColor = authError ? '#ff4d4f' : 'rgba(237, 233, 232, 0.15)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: showPassword ? '#c8ff3d' : 'rgba(237, 233, 232, 0.5)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c8ff3d')}
                onMouseLeave={(e) => (e.currentTarget.style.color = showPassword ? '#c8ff3d' : 'rgba(237, 233, 232, 0.5)')}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {authError && (
              <div
                style={{
                  color: '#ff6b6b',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'left',
                }}
              >
                {authError}
              </div>
            )}

            <button
              type="submit"
              style={{
                backgroundColor: '#c8ff3d',
                color: '#000000',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px',
                borderRadius: '9px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d6ff66')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c8ff3d')}
            >
              Sign In to Console <ArrowUpRight size={16} />
            </button>
          </form>

          <div
            style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(237, 233, 232, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(237, 233, 232, 0.45)',
            }}
          >
            <span>v2.4 Production Gateway</span>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
              }}
              style={{ color: '#c8ff3d', textDecoration: 'none' }}
            >
              ← Return to Site
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Console Screen
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 24px 80px',
        boxSizing: 'border-box',
      }}
    >
      {/* Executive Header Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '16px 24px',
          backgroundColor: 'rgba(12, 11, 11, 0.85)',
          border: '1px solid rgba(237, 233, 232, 0.12)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src={aitechLogo} alt="AI Technologies" style={{ height: '32px', width: 'auto' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#000000',
                backgroundColor: '#c8ff3d',
                padding: '2px 8px',
                borderRadius: '5px',
                letterSpacing: '0.06em',
              }}
            >
              ADMIN
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(237, 233, 232, 0.5)',
              }}
            >
              v2.4 Production Console
            </span>
          </div>
        </div>

        {/* Status & Quick Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#c8ff3d',
              background: 'rgba(200, 255, 61, 0.08)',
              border: '1px solid rgba(200, 255, 61, 0.25)',
              padding: '5px 12px',
              borderRadius: '100px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#c8ff3d',
                boxShadow: '0 0 8px #c8ff3d',
              }}
            />
            <span>Production Healthy • Vercel Edge</span>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12.5px',
              color: '#ede9e8',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              padding: '7px 14px',
              borderRadius: '8px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
          >
            View Live Site <ArrowUpRight size={13} />
          </a>

          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12.5px',
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 77, 79, 0.08)',
              border: '1px solid rgba(255, 77, 79, 0.2)',
              padding: '7px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 77, 79, 0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 77, 79, 0.08)')}
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* Console Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
          paddingBottom: '16px',
          marginBottom: '28px',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
          { id: 'projects', label: `Projects Manager (${projectList.length})`, icon: Layers },
          { id: 'leads', label: `Inquiries & Leads (${leads.length})`, icon: Inbox },
          { id: 'telemetry', label: 'System & Deployment Health', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#000000' : 'rgba(237, 233, 232, 0.7)',
                backgroundColor: isActive ? '#c8ff3d' : 'rgba(255, 255, 255, 0.04)',
                border: isActive ? '1px solid #c8ff3d' : '1px solid rgba(237, 233, 232, 0.1)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Top 4 KPI Metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                title: 'Active Inquiries',
                value: `${leads.length}`,
                subtitle: '+24% from last month',
                icon: Inbox,
                color: '#c8ff3d',
              },
              {
                title: 'Showcased Projects',
                value: `${projectList.length}`,
                subtitle: 'All synced with /projects',
                icon: Layers,
                color: '#3df3ff',
              },
              {
                title: 'Monthly Web Traffic',
                value: '248.6K',
                subtitle: '38ms average edge response',
                icon: Globe,
                color: '#a78bfa',
              },
              {
                title: 'Pipeline Revenue',
                value: '$385,000',
                subtitle: 'Active client deal values',
                icon: Activity,
                color: '#f59e0b',
              },
            ].map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(12, 11, 11, 0.85)',
                    border: '1px solid rgba(237, 233, 232, 0.12)',
                    borderRadius: '16px',
                    padding: '22px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'rgba(237, 233, 232, 0.6)',
                      }}
                    >
                      {kpi.title}
                    </span>
                    <div
                      style={{
                        padding: '6px',
                        borderRadius: '8px',
                        backgroundColor: `${kpi.color}15`,
                        color: kpi.color,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <div
                      style={{
                        fontFamily: '"Geist", sans-serif',
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1,
                      }}
                    >
                      {kpi.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11.5px',
                        color: kpi.color,
                        marginTop: '8px',
                      }}
                    >
                      {kpi.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Activity Grid & Quick Leads Preview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '24px',
            }}
            className="admin-overview-split"
          >
            {/* Recent Leads Card */}
            <div
              style={{
                backgroundColor: 'rgba(12, 11, 11, 0.85)',
                border: '1px solid rgba(237, 233, 232, 0.12)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '18px',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                  Recent Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#c8ff3d',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                  }}
                >
                  View All ({leads.length}) →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {leads.slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(237, 233, 232, 0.08)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#ffffff' }}>
                        {lead.name} • <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>{lead.company}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#c8ff3d', marginTop: '2px' }}>
                        {lead.service} — {lead.scope}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10.5px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        backgroundColor:
                          lead.status === 'New'
                            ? 'rgba(200, 255, 61, 0.15)'
                            : 'rgba(255, 255, 255, 0.08)',
                        color: lead.status === 'New' ? '#c8ff3d' : '#ede9e8',
                      }}
                    >
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status Summary */}
            <div
              style={{
                backgroundColor: 'rgba(12, 11, 11, 0.85)',
                border: '1px solid rgba(237, 233, 232, 0.12)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: '0 0 18px 0' }}>
                Deployment Pipeline
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Hosting Provider</span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>Vercel Production</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Branch</span>
                  <span style={{ color: '#c8ff3d', fontFamily: 'var(--font-mono)' }}>main (731b9bb)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Custom Domain</span>
                  <span style={{ color: '#ffffff' }}>aitechnolgies.in</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>SSL Status</span>
                  <span style={{ color: '#27c93f', fontWeight: 600 }}>Active (HTTPS 🔒)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Contact Form</span>
                  <span style={{ color: '#27c93f' }}>Connected (FormSubmit)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PORTFOLIO & PROJECTS MANAGER */}
      {activeTab === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px 0' }}>
                Portfolio Showcase Manager
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.6)', margin: 0 }}>
                Control projects visible on the public /projects portfolio showcase page.
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
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
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Plus size={16} /> Add New Project
            </button>
          </div>

          {/* Project Items Table */}
          <div
            style={{
              backgroundColor: 'rgba(12, 11, 11, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'rgba(237, 233, 232, 0.5)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <th style={{ padding: '14px 20px' }}>Project Name</th>
                    <th style={{ padding: '14px 20px' }}>Client</th>
                    <th style={{ padding: '14px 20px' }}>Category</th>
                    <th style={{ padding: '14px 20px' }}>Key Metric</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectList.map((p) => (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid rgba(237, 233, 232, 0.06)',
                        transition: 'background-color 0.15s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 600, color: '#ffffff' }}>{p.title}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d', marginTop: '2px' }}>
                          {p.tags?.join(' • ')}
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', color: 'rgba(237, 233, 232, 0.8)' }}>
                        {p.client}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#ede9e8',
                          }}
                        >
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', color: '#c8ff3d' }}>
                        {p.heroMetric}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <button
                          onClick={() => toggleProjectStatus(p.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            padding: '4px 10px',
                            borderRadius: '100px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor:
                              p.status === 'Published'
                                ? 'rgba(200, 255, 61, 0.15)'
                                : 'rgba(255, 255, 255, 0.08)',
                            color: p.status === 'Published' ? '#c8ff3d' : 'rgba(237, 233, 232, 0.5)',
                          }}
                        >
                          <span
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: p.status === 'Published' ? '#c8ff3d' : '#888',
                            }}
                          />
                          {p.status}
                        </button>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <button
                          onClick={() => deleteProject(p.id)}
                          title="Delete project"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'rgba(237, 233, 232, 0.5)',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '6px',
                            transition: 'color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d4f')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.5)')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INQUIRIES & LEAD CRM */}
      {activeTab === 'leads' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px 0' }}>
                Client Inquiries & Project Leads
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.6)', margin: 0 }}>
                Manage submitted project scopes, client details, and contact follow-ups.
              </p>
            </div>

            <button
              onClick={exportLeadsCSV}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(237, 233, 232, 0.15)',
                color: '#ede9e8',
                fontWeight: 600,
                fontSize: '13px',
                padding: '9px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)')}
            >
              <FileText size={15} /> Export as CSV
            </button>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(12, 11, 11, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'rgba(237, 233, 232, 0.5)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <th style={{ padding: '14px 20px' }}>Client</th>
                    <th style={{ padding: '14px 20px' }}>Contact</th>
                    <th style={{ padding: '14px 20px' }}>Service & Scope</th>
                    <th style={{ padding: '14px 20px' }}>Message Preview</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Reply</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr
                      key={l.id}
                      style={{
                        borderBottom: '1px solid rgba(237, 233, 232, 0.06)',
                      }}
                    >
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 600, color: '#ffffff' }}>{l.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(237, 233, 232, 0.6)' }}>{l.company}</div>
                      </td>
                      <td style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                        <a href={`mailto:${l.email}`} style={{ color: '#c8ff3d', textDecoration: 'none' }}>
                          {l.email}
                        </a>
                        <div style={{ color: 'rgba(237, 233, 232, 0.45)', fontSize: '11px', marginTop: '2px' }}>
                          {l.date}
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ color: '#ffffff', fontWeight: 500 }}>{l.service}</div>
                        <div style={{ fontSize: '11.5px', color: 'rgba(237, 233, 232, 0.6)' }}>{l.scope}</div>
                      </td>
                      <td style={{ padding: '16px 20px', maxWidth: '300px' }}>
                        <div
                          style={{
                            fontSize: '12.5px',
                            color: 'rgba(237, 233, 232, 0.75)',
                            lineHeight: 1.4,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={l.message}
                        >
                          {l.message}
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <select
                          value={l.status}
                          onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(237, 233, 232, 0.15)',
                            borderRadius: '6px',
                            color: l.status === 'New' ? '#c8ff3d' : '#ede9e8',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            outline: 'none',
                          }}
                        >
                          <option value="New" style={{ background: '#111', color: '#c8ff3d' }}>
                            New
                          </option>
                          <option value="In Review" style={{ background: '#111', color: '#3df3ff' }}>
                            In Review
                          </option>
                          <option value="Contacted" style={{ background: '#111', color: '#a78bfa' }}>
                            Contacted
                          </option>
                          <option value="Closed" style={{ background: '#111', color: '#888' }}>
                            Closed
                          </option>
                        </select>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <a
                          href={`mailto:${l.email}?subject=Regarding your project inquiry with AI Technologies`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: 'rgba(200, 255, 61, 0.1)',
                            border: '1px solid rgba(200, 255, 61, 0.25)',
                            color: '#c8ff3d',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '12px',
                            fontWeight: 600,
                          }}
                        >
                          <Mail size={12} /> Email Client
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM HEALTH & DEPLOYMENT TELEMETRY */}
      {activeTab === 'telemetry' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Card 1: Vercel Infrastructure */}
          <div
            style={{
              backgroundColor: 'rgba(12, 11, 11, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Server size={18} color="#c8ff3d" />
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                Vercel Hosting Pipeline
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Deployment Target</span>
                <span style={{ color: '#ffffff' }}>Production (Vercel Edge)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Git Repository</span>
                <span style={{ color: '#c8ff3d', fontFamily: 'var(--font-mono)' }}>matru-source/Ai-Technologies</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Active Branch</span>
                <span style={{ color: '#ffffff' }}>main</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>SPA Rewrites</span>
                <span style={{ color: '#27c93f' }}>Active (vercel.json)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Global Edge CDN</span>
                <span style={{ color: '#27c93f' }}>100% Operational</span>
              </div>
            </div>
          </div>

          {/* Card 2: Custom Domain & DNS */}
          <div
            style={{
              backgroundColor: 'rgba(12, 11, 11, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Globe size={18} color="#3df3ff" />
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                DNS & Domain Routing
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Primary Domain</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>aitechnolgies.in</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>A Record IP</span>
                <span style={{ color: '#c8ff3d', fontFamily: 'var(--font-mono)' }}>216.198.79.1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>CNAME (www)</span>
                <span style={{ color: '#c8ff3d', fontFamily: 'var(--font-mono)' }}>cname.vercel-dns.com</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Fallback URL</span>
                <span style={{ color: '#ffffff' }}>aitechnologies-jade.vercel.app</span>
              </div>
            </div>
          </div>

          {/* Card 3: Form & API Telemetry */}
          <div
            style={{
              backgroundColor: 'rgba(12, 11, 11, 0.85)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Terminal size={18} color="#f59e0b" />
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                API & Notification Services
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Inquiry Notification</span>
                <span style={{ color: '#ffffff' }}>support@aitechnologies.com</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Form Webhook Engine</span>
                <span style={{ color: '#27c93f' }}>FormSubmit.co (Active)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Client Mailto Fallback</span>
                <span style={{ color: '#27c93f' }}>Configured</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(237, 233, 232, 0.6)' }}>Avg Latency</span>
                <span style={{ color: '#c8ff3d', fontFamily: 'var(--font-mono)' }}>28ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            boxSizing: 'border-box',
          }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#0e0d0d',
              border: '1px solid rgba(200, 255, 61, 0.3)',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.9)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Add New Portfolio Project
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(237, 233, 232, 0.5)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '6px' }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenith Global Real Estate Portal"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(237, 233, 232, 0.15)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '6px' }}>
                    Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Zenith Properties UK"
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(237, 233, 232, 0.15)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#111',
                      border: '1px solid rgba(237, 233, 232, 0.15)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Web Platforms">Web Platforms</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Enterprise SaaS">Enterprise SaaS</option>
                    <option value="AI & Automation">AI & Automation</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '6px' }}>
                  Key Hero Metric
                </label>
                <input
                  type="text"
                  placeholder="e.g. ⚡ 0.2s Load Time or 📈 +140% Conversion"
                  value={newProject.heroMetric}
                  onChange={(e) => setNewProject({ ...newProject, heroMetric: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(237, 233, 232, 0.15)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '6px' }}>
                  Tech Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React 19, TypeScript, PostgreSQL, Tailwind"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(237, 233, 232, 0.15)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    backgroundColor: '#c8ff3d',
                    color: '#000000',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    padding: '11px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Create & Publish Project
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    color: '#ede9e8',
                    border: '1px solid rgba(237, 233, 232, 0.12)',
                    fontSize: '13px',
                    padding: '11px 18px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
