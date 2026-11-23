import React, { useState, useEffect, useRef } from 'react';
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
  Save,
  ExternalLink,
  Image as ImageIcon,
  Upload,
  Link2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import aitechLogo from '../assets/aitech-logo-white-neon.png';
import aitechEmblem from '../assets/aitech-hero-emblem.png';
import { getStoredProjects, saveStoredProjects, resetProjectsToDefault, STORAGE_KEY } from '../data/projectsData';

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

  // Portfolio items in admin state (synchronized with live site and localStorage)
  const [projectList, setProjectList] = useState(getStoredProjects);

  // Sync projects state in real-time across tabs/windows
  useEffect(() => {
    const handleSync = (e) => {
      if (e.type === 'storage' && e.key === STORAGE_KEY) {
        setProjectList(getStoredProjects());
      }
    };
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Real-time toast feedback state
  const [realtimeToast, setRealtimeToast] = useState(null);
  const showToast = (message) => {
    setRealtimeToast(message);
    setTimeout(() => {
      setRealtimeToast(null);
    }, 3200);
  };

  const saveProjects = (newList, message = 'Saved in real time & synced live') => {
    setProjectList(newList);
    saveStoredProjects(newList);
    showToast(message);
  };

  // Drag and drop reordering ref (avoids state re-renders during dragging)
  const dragSourceIndexRef = useRef(null);

  const reorderProject = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= projectList.length || toIndex >= projectList.length) return;

    const updated = [...projectList];
    const [movedItem] = updated.splice(fromIndex, 1);
    if (!movedItem) return;
    updated.splice(toIndex, 0, movedItem);

    // 1. Immediately update state with new array reference
    setProjectList(updated);
    // 2. Persist to localStorage and dispatch event for /projects
    saveStoredProjects(updated);
    // 3. Show feedback toast
    showToast(`⇅ Moved "${movedItem.title}" to position #${toIndex + 1}!`);
  };

  const moveProjectPosition = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projectList.length) return;
    reorderProject(index, targetIndex);
  };

  const handleDragStart = (e, index) => {
    dragSourceIndexRef.current = index;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    setTimeout(() => {
      if (e.target) e.target.style.opacity = '0.35';
    }, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (dragSourceIndexRef.current !== null && dragSourceIndexRef.current !== index) {
      e.currentTarget.style.borderTop = '3px solid #c8ff3d';
      e.currentTarget.style.backgroundColor = 'rgba(200, 255, 61, 0.08)';
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.borderTop = '';
    e.currentTarget.style.backgroundColor = '';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    e.currentTarget.style.borderTop = '';
    e.currentTarget.style.backgroundColor = '';
    const rawSource = e.dataTransfer.getData('text/plain');
    const sourceIndex = dragSourceIndexRef.current !== null
      ? dragSourceIndexRef.current
      : (rawSource ? parseInt(rawSource, 10) : null);

    dragSourceIndexRef.current = null;
    if (sourceIndex !== null && !isNaN(sourceIndex) && sourceIndex !== targetIndex) {
      reorderProject(sourceIndex, targetIndex);
    }
  };

  const handleDragEnd = (e) => {
    if (e.target) e.target.style.opacity = '1';
    dragSourceIndexRef.current = null;
    document.querySelectorAll('.admin-project-row').forEach((row) => {
      row.style.borderTop = '';
      row.style.backgroundColor = '';
      row.style.opacity = '1';
    });
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
    type: '',
    heroMetric: '',
    secondaryMetric: '',
    tagline: '',
    description: '',
    tags: '',
    liveUrl: '',
    image: '',
  });

  // Handle image upload from computer (reads as Base64 Data URL)
  const handleImageFileChange = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Selected image exceeds 5MB limit. Please choose a smaller image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target.result;
      if (isEdit) {
        setEditingProject((prev) => ({ ...prev, image: dataUrl }));
      } else {
        setNewProject((prev) => ({ ...prev, image: dataUrl }));
      }
      showToast('📷 Project image attached!');
    };
    reader.readAsDataURL(file);
  };

  // Real-Time Inline Table Editing State
  const [inlineEditId, setInlineEditId] = useState(null);
  const [inlineForm, setInlineForm] = useState({});

  const startInlineEdit = (p) => {
    setInlineEditId(p.id);
    setInlineForm({
      title: p.title || '',
      client: p.client || '',
      category: p.category || 'Web Platforms',
      heroMetric: p.heroMetric || '',
      status: p.status || 'Published',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''),
      liveUrl: p.liveUrl || '',
    });
  };

  const cancelInlineEdit = () => {
    setInlineEditId(null);
    setInlineForm({});
  };

  const saveInlineEdit = (id) => {
    const target = projectList.find((p) => p.id === id);
    if (!target) return;

    const parsedTags = typeof inlineForm.tags === 'string'
      ? inlineForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : target.tags;

    const updated = {
      ...target,
      title: inlineForm.title.trim() || target.title,
      client: inlineForm.client.trim() || target.client,
      category: inlineForm.category || target.category,
      heroMetric: inlineForm.heroMetric.trim() || target.heroMetric,
      status: inlineForm.status || target.status,
      tags: parsedTags.length > 0 ? parsedTags : target.tags,
      liveUrl: inlineForm.liveUrl !== undefined ? inlineForm.liveUrl.trim() : target.liveUrl,
    };

    const updatedList = projectList.map((p) => (p.id === id ? updated : p));
    saveProjects(updatedList, `⚡ Updated "${updated.title}" in real time!`);
    setInlineEditId(null);
  };

  // Real-Time Full Edit Modal State
  const [editingProject, setEditingProject] = useState(null);

  const handleOpenEditModal = (p) => {
    setEditingProject({
      ...p,
      type: p.type || `${p.category} Solution`,
      year: p.year || '2026',
      heroMetric: p.heroMetric || '',
      secondaryMetric: p.secondaryMetric || '',
      tagline: p.tagline || '',
      description: p.description || '',
      liveUrl: p.liveUrl || '',
      image: p.image || '',
      tagsInput: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''),
    });
  };

  const handleSaveEditModal = (e) => {
    e?.preventDefault();
    if (!editingProject) return;

    const parsedTags = typeof editingProject.tagsInput === 'string'
      ? editingProject.tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : (editingProject.tags || []);

    const updated = {
      ...editingProject,
      title: editingProject.title.trim() || 'Untitled Project',
      client: editingProject.client.trim() || 'Enterprise Client',
      category: editingProject.category || 'Web Platforms',
      type: editingProject.type?.trim() || `${editingProject.category} Solution`,
      year: editingProject.year?.trim() || '2026',
      heroMetric: editingProject.heroMetric?.trim() || '⚡ Production Ready',
      secondaryMetric: editingProject.secondaryMetric?.trim() || '🔒 Enterprise SLA',
      tagline: editingProject.tagline?.trim() || '',
      description: editingProject.description?.trim() || '',
      liveUrl: editingProject.liveUrl?.trim() || '',
      image: editingProject.image || '',
      tags: parsedTags.length > 0 ? parsedTags : ['React', 'Node.js'],
    };
    delete updated.tagsInput;

    const updatedList = projectList.map((p) => (p.id === updated.id ? updated : p));
    saveProjects(updatedList, `⚡ Synced "${updated.title}" changes to live portfolio!`);
    setEditingProject(null);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Restore all 8 showcase projects back to default portfolio state? Custom changes will be reset.')) {
      const reset = resetProjectsToDefault();
      setProjectList(reset);
      showToast('🔄 Restored default 8 showcase projects');
    }
  };

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
    const target = updated.find((p) => p.id === id);
    saveProjects(updated, `⚡ Project "${target?.title}" set to ${target?.status}`);
  };

  const deleteProject = (id) => {
    const target = projectList.find((p) => p.id === id);
    if (window.confirm(`Are you sure you want to remove "${target?.title || 'this project'}"?`)) {
      const updated = projectList.filter((p) => p.id !== id);
      saveProjects(updated, `🗑️ Removed "${target?.title || 'Project'}" from showcase`);
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const created = {
      id: 'proj-' + Date.now(),
      title: newProject.title.trim(),
      client: newProject.client.trim() || 'Enterprise Client',
      category: newProject.category || 'Web Platforms',
      type: newProject.type?.trim() || `${newProject.category} Platform`,
      status: 'Published',
      year: new Date().getFullYear().toString(),
      heroMetric: newProject.heroMetric.trim() || '⚡ Production Ready',
      secondaryMetric: newProject.secondaryMetric?.trim() || '🛡️ 99.9% Uptime',
      tagline: newProject.tagline?.trim() || 'High-performance digital engineering solution built for enterprise scale.',
      description: newProject.description?.trim() || 'Custom engineered software system delivered with cutting-edge architectural patterns.',
      tags: newProject.tags ? newProject.tags.split(',').map((t) => t.trim()).filter(Boolean) : ['React', 'Node.js', 'Cloud'],
      liveUrl: newProject.liveUrl?.trim() || '',
      image: newProject.image || '',
      accentColor: '#c8ff3d',
    };

    saveProjects([created, ...projectList], `✨ Added "${created.title}" to live portfolio!`);
    setIsAddModalOpen(false);
    setNewProject({
      title: '',
      client: '',
      category: 'Web Platforms',
      type: '',
      heroMetric: '',
      secondaryMetric: '',
      tagline: '',
      description: '',
      tags: '',
      liveUrl: '',
      image: '',
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
          minHeight: '100vh',
          backgroundColor: '#070707',
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
        minHeight: '100vh',
        backgroundColor: '#070707',
        width: '100%',
      }}
    >
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  Portfolio Showcase Manager
                </h2>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 9px',
                    borderRadius: '100px',
                    backgroundColor: 'rgba(200, 255, 61, 0.1)',
                    border: '1px solid rgba(200, 255, 61, 0.3)',
                    color: '#c8ff3d',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.02em',
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
                  Real-Time Live Sync Active
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.6)', margin: '4px 0 0 0' }}>
                Reorder projects using the drag handle (<span style={{ color: '#c8ff3d', fontWeight: 600 }}>⠿</span>), the <span style={{ color: '#c8ff3d', fontWeight: 600 }}>▲ / ▼</span> buttons, or the <span style={{ color: '#c8ff3d', fontWeight: 600 }}># Rank</span> selector to set their exact showcase order live.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleResetDefaults}
                title="Restore default 8 showcase projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  color: 'rgba(237, 233, 232, 0.75)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  padding: '9px 13px',
                  borderRadius: '8px',
                  border: '1px solid rgba(237, 233, 232, 0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = 'rgba(237, 233, 232, 0.75)';
                }}
              >
                <RefreshCw size={13} /> Reset Defaults
              </button>

              {onNavigateProjects && (
                <button
                  type="button"
                  onClick={onNavigateProjects}
                  title="View live public showcase"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    color: 'rgba(237, 233, 232, 0.75)',
                    fontSize: '12px',
                    padding: '9px 13px',
                    borderRadius: '8px',
                    border: '1px solid rgba(237, 233, 232, 0.12)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#c8ff3d';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.color = 'rgba(237, 233, 232, 0.75)';
                  }}
                >
                  <ExternalLink size={13} /> View Live Showcase
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#c8ff3d',
                  color: '#000000',
                  fontWeight: 600,
                  fontSize: '13px',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} /> Add New Project
              </button>
            </div>
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
                    <th style={{ padding: '14px 12px', width: '130px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <ArrowUpDown size={11} /> Order Rank
                      </span>
                    </th>
                    <th style={{ padding: '14px 20px', minWidth: '240px' }}>Project Name</th>
                    <th style={{ padding: '14px 20px', minWidth: '160px' }}>Client</th>
                    <th style={{ padding: '14px 20px', minWidth: '150px' }}>Category</th>
                    <th style={{ padding: '14px 20px', minWidth: '180px' }}>Key Metric</th>
                    <th style={{ padding: '14px 20px', minWidth: '120px' }}>Status</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right', minWidth: '190px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectList.map((p, index) => {
                    const isInline = inlineEditId === p.id;

                    if (isInline) {
                      return (
                        <tr
                          key={p.id}
                          style={{
                            backgroundColor: 'rgba(200, 255, 61, 0.04)',
                            borderBottom: '1px solid rgba(200, 255, 61, 0.25)',
                          }}
                        >
                          {/* Inline Position Number */}
                          <td style={{ padding: '12px 14px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d', fontWeight: 700 }}>
                            #{index + 1}
                          </td>

                          {/* Inline Project Name & Tags */}
                          <td style={{ padding: '12px 16px' }}>
                            <input
                              type="text"
                              value={inlineForm.title}
                              onChange={(e) => setInlineForm({ ...inlineForm, title: e.target.value })}
                              placeholder="Project title..."
                              style={{
                                width: '100%',
                                padding: '6px 10px',
                                backgroundColor: '#070707',
                                border: '1px solid rgba(200, 255, 61, 0.4)',
                                borderRadius: '6px',
                                color: '#ffffff',
                                fontSize: '13px',
                                fontWeight: 600,
                                outline: 'none',
                                marginBottom: '5px',
                                boxSizing: 'border-box',
                              }}
                            />
                            <input
                              type="text"
                              value={inlineForm.tags}
                              onChange={(e) => setInlineForm({ ...inlineForm, tags: e.target.value })}
                              placeholder="Tags (comma separated)..."
                              style={{
                                width: '100%',
                                padding: '4px 8px',
                                backgroundColor: '#070707',
                                border: '1px solid rgba(237, 233, 232, 0.15)',
                                borderRadius: '5px',
                                color: '#c8ff3d',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                outline: 'none',
                                marginBottom: '5px',
                                boxSizing: 'border-box',
                              }}
                            />
                            <input
                              type="text"
                              value={inlineForm.liveUrl || ''}
                              onChange={(e) => setInlineForm({ ...inlineForm, liveUrl: e.target.value })}
                              placeholder="Live Site URL (https://...)"
                              style={{
                                width: '100%',
                                padding: '4px 8px',
                                backgroundColor: '#070707',
                                border: '1px solid rgba(237, 233, 232, 0.15)',
                                borderRadius: '5px',
                                color: '#ede9e8',
                                fontSize: '11px',
                                outline: 'none',
                                boxSizing: 'border-box',
                              }}
                            />
                          </td>

                          {/* Inline Client */}
                          <td style={{ padding: '12px 16px' }}>
                            <input
                              type="text"
                              value={inlineForm.client}
                              onChange={(e) => setInlineForm({ ...inlineForm, client: e.target.value })}
                              placeholder="Client name..."
                              style={{
                                width: '100%',
                                padding: '6px 10px',
                                backgroundColor: '#070707',
                                border: '1px solid rgba(237, 233, 232, 0.2)',
                                borderRadius: '6px',
                                color: '#ffffff',
                                fontSize: '12px',
                                outline: 'none',
                                boxSizing: 'border-box',
                              }}
                            />
                          </td>

                          {/* Inline Category */}
                          <td style={{ padding: '12px 16px' }}>
                            <select
                              value={inlineForm.category}
                              onChange={(e) => setInlineForm({ ...inlineForm, category: e.target.value })}
                              style={{
                                width: '100%',
                                padding: '6px 8px',
                                backgroundColor: '#070707',
                                border: '1px solid rgba(237, 233, 232, 0.2)',
                                borderRadius: '6px',
                                color: '#ffffff',
                                fontSize: '12px',
                                outline: 'none',
                              }}
                            >
                              <option value="Web Platforms">Web Platforms</option>
                              <option value="Mobile Apps">Mobile Apps</option>
                              <option value="Enterprise SaaS">Enterprise SaaS</option>
                              <option value="AI & Automation">AI & Automation</option>
                            </select>
                          </td>

                          {/* Inline Key Metric */}
                          <td style={{ padding: '12px 16px' }}>
                            <input
                              type="text"
                              value={inlineForm.heroMetric}
                              onChange={(e) => setInlineForm({ ...inlineForm, heroMetric: e.target.value })}
                              placeholder="Key metric..."
                              style={{
                                width: '100%',
                                padding: '6px 8px',
                                backgroundColor: '#070707',
                                border: '1px solid rgba(200, 255, 61, 0.4)',
                                borderRadius: '6px',
                                color: '#c8ff3d',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '12px',
                                outline: 'none',
                                boxSizing: 'border-box',
                              }}
                            />
                          </td>

                          {/* Inline Status */}
                          <td style={{ padding: '12px 16px' }}>
                            <select
                              value={inlineForm.status}
                              onChange={(e) => setInlineForm({ ...inlineForm, status: e.target.value })}
                              style={{
                                padding: '5px 8px',
                                backgroundColor: '#070707',
                                border: '1px solid rgba(237, 233, 232, 0.2)',
                                borderRadius: '6px',
                                color: inlineForm.status === 'Published' ? '#c8ff3d' : 'rgba(237, 233, 232, 0.6)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                outline: 'none',
                              }}
                            >
                              <option value="Published">Published</option>
                              <option value="Draft">Draft</option>
                            </select>
                          </td>

                          {/* Inline Actions */}
                          <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <button
                                type="button"
                                onClick={() => saveInlineEdit(p.id)}
                                title="Save changes (Real-Time Live Sync)"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  backgroundColor: '#c8ff3d',
                                  color: '#000000',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '6px 11px',
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                }}
                              >
                                <Check size={14} /> Save
                              </button>
                              <button
                                type="button"
                                onClick={cancelInlineEdit}
                                title="Cancel inline edit"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                  color: 'rgba(237, 233, 232, 0.8)',
                                  border: '1px solid rgba(237, 233, 232, 0.15)',
                                  borderRadius: '6px',
                                  padding: '6px 8px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                }}
                              >
                                <X size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  cancelInlineEdit();
                                  handleOpenEditModal(p);
                                }}
                                title="Open Full Editor Modal"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                  color: '#c8ff3d',
                                  border: '1px solid rgba(200, 255, 61, 0.3)',
                                  borderRadius: '6px',
                                  padding: '6px 8px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                }}
                              >
                                <Sliders size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr
                        key={p.id}
                        className="admin-project-row"
                        draggable={!isInline}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        style={{
                          borderBottom: '1px solid rgba(237, 233, 232, 0.06)',
                          transition: 'background-color 0.15s, opacity 0.15s',
                          cursor: 'grab',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {/* Order / Position Drag Handle & Controls */}
                        <td style={{ padding: '10px 12px', textAlign: 'center', userSelect: 'none' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            {/* Drag Handle */}
                            <span
                              title="Drag to reorder position"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(237, 233, 232, 0.45)',
                                cursor: 'grab',
                                padding: '4px 2px',
                              }}
                            >
                              <GripVertical size={16} />
                            </span>

                            {/* Direct Rank Select Dropdown */}
                            <select
                              value={index}
                              draggable={false}
                              onMouseDown={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                e.stopPropagation();
                                reorderProject(index, parseInt(e.target.value, 10));
                              }}
                              title="Select position rank"
                              style={{
                                backgroundColor: 'rgba(200, 255, 61, 0.1)',
                                border: '1px solid rgba(200, 255, 61, 0.35)',
                                color: '#c8ff3d',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '3px 4px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                            >
                              {projectList.map((_, i) => (
                                <option key={i} value={i} style={{ backgroundColor: '#141414', color: '#ffffff' }}>
                                  #{i + 1}
                                </option>
                              ))}
                            </select>

                            {/* Up & Down Arrow Buttons */}
                            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2px' }}>
                              <button
                                type="button"
                                disabled={index === 0}
                                draggable={false}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveProjectPosition(index, -1);
                                }}
                                title={index === 0 ? 'Already at top' : `Move up to #${index}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '22px',
                                  height: '17px',
                                  backgroundColor: index === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.08)',
                                  border: '1px solid rgba(237, 233, 232, 0.15)',
                                  borderRadius: '3px',
                                  cursor: index === 0 ? 'not-allowed' : 'pointer',
                                  color: index === 0 ? 'rgba(255, 255, 255, 0.15)' : '#ede9e8',
                                  padding: 0,
                                  transition: 'all 0.12s ease',
                                }}
                                onMouseEnter={(e) => {
                                  if (index > 0) {
                                    e.currentTarget.style.backgroundColor = '#c8ff3d';
                                    e.currentTarget.style.color = '#000000';
                                    e.currentTarget.style.borderColor = '#c8ff3d';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (index > 0) {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.color = '#ede9e8';
                                    e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.15)';
                                  }
                                }}
                              >
                                <ChevronUp size={12} strokeWidth={2.5} />
                              </button>
                              <button
                                type="button"
                                disabled={index === projectList.length - 1}
                                draggable={false}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveProjectPosition(index, 1);
                                }}
                                title={index === projectList.length - 1 ? 'Already at bottom' : `Move down to #${index + 2}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '22px',
                                  height: '17px',
                                  backgroundColor: index === projectList.length - 1 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.08)',
                                  border: '1px solid rgba(237, 233, 232, 0.15)',
                                  borderRadius: '3px',
                                  cursor: index === projectList.length - 1 ? 'not-allowed' : 'pointer',
                                  color: index === projectList.length - 1 ? 'rgba(255, 255, 255, 0.15)' : '#ede9e8',
                                  padding: 0,
                                  transition: 'all 0.12s ease',
                                }}
                                onMouseEnter={(e) => {
                                  if (index < projectList.length - 1) {
                                    e.currentTarget.style.backgroundColor = '#c8ff3d';
                                    e.currentTarget.style.color = '#000000';
                                    e.currentTarget.style.borderColor = '#c8ff3d';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (index < projectList.length - 1) {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.color = '#ede9e8';
                                    e.currentTarget.style.borderColor = 'rgba(237, 233, 232, 0.15)';
                                  }
                                }}
                              >
                                <ChevronDown size={12} strokeWidth={2.5} />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span>{p.title}</span>
                            {p.image && (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '10px',
                                  padding: '1px 6px',
                                  borderRadius: '4px',
                                  backgroundColor: 'rgba(200, 255, 61, 0.1)',
                                  border: '1px solid rgba(200, 255, 61, 0.25)',
                                  color: '#c8ff3d',
                                }}
                                title="Homepage preview image attached"
                              >
                                <ImageIcon size={10} /> Image
                              </span>
                            )}
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span>{Array.isArray(p.tags) ? p.tags.join(' • ') : p.tags}</span>
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  color: 'rgba(237, 233, 232, 0.65)',
                                  textDecoration: 'none',
                                  fontSize: '10px',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#c8ff3d')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.65)')}
                              >
                                <Link2 size={10} /> Live Site ↗
                              </a>
                            )}
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
                            type="button"
                            onClick={() => toggleProjectStatus(p.id)}
                            title="Toggle status (live real-time sync)"
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
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                            {/* Real-time Full Edit Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(p)}
                              title="Full Project Editor (Real-Time Sync)"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                backgroundColor: 'rgba(200, 255, 61, 0.12)',
                                border: '1px solid rgba(200, 255, 61, 0.3)',
                                color: '#c8ff3d',
                                borderRadius: '6px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#c8ff3d';
                                e.currentTarget.style.color = '#000000';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(200, 255, 61, 0.12)';
                                e.currentTarget.style.color = '#c8ff3d';
                              }}
                            >
                              <Edit3 size={13} /> Edit
                            </button>

                            {/* Quick Inline Edit Button */}
                            <button
                              type="button"
                              onClick={() => startInlineEdit(p)}
                              title="Quick Table Edit"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(237, 233, 232, 0.12)',
                                color: 'rgba(237, 233, 232, 0.75)',
                                borderRadius: '6px',
                                padding: '6px 10px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                                e.currentTarget.style.color = '#ffffff';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.color = 'rgba(237, 233, 232, 0.75)';
                              }}
                            >
                              <Sliders size={13} /> Quick
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => deleteProject(p.id)}
                              title="Delete project"
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'rgba(237, 233, 232, 0.45)',
                                cursor: 'pointer',
                                padding: '6px',
                                borderRadius: '6px',
                                transition: 'color 0.15s',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d4f')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 233, 232, 0.45)')}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '6px' }}>
                  Live Site / Production URL
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://clientwebsite.com or https://project.demo.app"
                  value={newProject.liveUrl || ''}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
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
                  Project Homepage Image / Screenshot (Shown in Website Card)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Paste Image URL (https://...)"
                    value={newProject.image || ''}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
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

                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(200, 255, 61, 0.12)',
                      border: '1px dashed rgba(200, 255, 61, 0.4)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#c8ff3d',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <Upload size={14} /> Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageFileChange(e, false)}
                    />
                  </label>
                </div>

                {newProject.image && (
                  <div
                    style={{
                      marginTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <img
                      src={newProject.image}
                      alt="Preview"
                      style={{
                        width: '72px',
                        height: '46px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        border: '1px solid rgba(200, 255, 61, 0.3)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 600 }}>Homepage Image Attached</div>
                      <div style={{ fontSize: '11px', color: 'rgba(237, 233, 232, 0.5)' }}>Will be rendered on public /projects card</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewProject({ ...newProject, image: '' })}
                      title="Remove Image"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: 'rgba(255, 77, 79, 0.12)',
                        border: '1px solid rgba(255, 77, 79, 0.3)',
                        color: '#ff4d4f',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                )}
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

      {/* 4. REAL-TIME FULL EDIT PROJECT MODAL */}
      {editingProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              backgroundColor: '#0c0b0b',
              border: '1px solid rgba(200, 255, 61, 0.3)',
              borderRadius: '20px',
              maxWidth: '720px',
              width: '100%',
              padding: '28px 32px',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.9), 0 0 30px rgba(200, 255, 61, 0.1)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#c8ff3d',
                      backgroundColor: 'rgba(200, 255, 61, 0.12)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(200, 255, 61, 0.25)',
                    }}
                  >
                    REAL-TIME EDITOR
                  </span>
                  <span style={{ fontSize: '12px', color: 'rgba(237, 233, 232, 0.45)' }}>ID: {editingProject.id}</span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  Edit Project Details
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(237, 233, 232, 0.6)', margin: '4px 0 0 0' }}>
                  Changes sync immediately across open sessions and the public /projects showcase.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingProject(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(237, 233, 232, 0.15)',
                  borderRadius: '8px',
                  color: 'rgba(237, 233, 232, 0.7)',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditModal} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Row 1: Title & Client */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(200, 255, 61, 0.4)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
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
              </div>

              {/* Row 2: Category & Status & Year */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Category
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#111',
                      border: '1px solid rgba(237, 233, 232, 0.18)',
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

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Publication Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: '#111',
                      border: '1px solid rgba(237, 233, 232, 0.18)',
                      borderRadius: '8px',
                      color: editingProject.status === 'Published' ? '#c8ff3d' : 'rgba(237, 233, 232, 0.6)',
                      fontSize: '13px',
                      fontWeight: 600,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="Published">Published (Live on /projects)</option>
                    <option value="Draft">Draft (Hidden from public)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
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
              </div>

              {/* Row 3: Subtitle / Type & Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Project Type / Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingProject.type}
                    onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value })}
                    placeholder="e.g. Sub-Second Global Storefront"
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
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Primary Key Metric
                  </label>
                  <input
                    type="text"
                    value={editingProject.heroMetric}
                    onChange={(e) => setEditingProject({ ...editingProject, heroMetric: e.target.value })}
                    placeholder="e.g. 💳 $45M+ Monthly Volume"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(200, 255, 61, 0.4)',
                      borderRadius: '8px',
                      color: '#c8ff3d',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Row 4: Secondary Metric & Tags */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Secondary Metric / Certification
                  </label>
                  <input
                    type="text"
                    value={editingProject.secondaryMetric}
                    onChange={(e) => setEditingProject({ ...editingProject, secondaryMetric: e.target.value })}
                    placeholder="e.g. 🔒 SOC2 & PCI-DSS L1"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(237, 233, 232, 0.15)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                    Tech Stack Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingProject.tagsInput}
                    onChange={(e) => setEditingProject({ ...editingProject, tagsInput: e.target.value })}
                    placeholder="Next.js 15, Node.js, Stripe, Redis"
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
              </div>

              {/* Row 5: Tagline */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                  Tagline (One-liner Summary)
                </label>
                <input
                  type="text"
                  value={editingProject.tagline}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  placeholder="Sub-second headless e-commerce store with dynamic 3D product previews..."
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

              {/* Row 6: Description */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                  Detailed Description / Case Overview
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Architected a modern banking dashboard supporting multi-currency accounts..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(237, 233, 232, 0.15)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Row 7: Live Site URL */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <label style={{ fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)' }}>
                    Live Site / Production URL (Redirect Destination)
                  </label>
                  {editingProject.liveUrl && (
                    <a
                      href={editingProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#c8ff3d',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        textDecoration: 'none',
                      }}
                    >
                      Test Live Link <ExternalLink size={11} />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={editingProject.liveUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                  placeholder="https://client-domain.com or https://project.demo.app"
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

              {/* Row 8: Project Homepage Image Upload & Link */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(237, 233, 232, 0.7)', marginBottom: '5px' }}>
                  Project Homepage Image / Screenshot (Rendered on Public Website Card)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={editingProject.image || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="Paste Image URL (https://...)"
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

                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(200, 255, 61, 0.12)',
                      border: '1px dashed rgba(200, 255, 61, 0.4)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#c8ff3d',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <Upload size={14} /> Upload From Device
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleImageFileChange(e, true)}
                    />
                  </label>
                </div>

                {/* Edit Modal Image Preview Thumbnail */}
                {editingProject.image && (
                  <div
                    style={{
                      marginTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <img
                      src={editingProject.image}
                      alt="Homepage Preview"
                      style={{
                        width: '76px',
                        height: '48px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        border: '1px solid rgba(200, 255, 61, 0.3)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 600 }}>Homepage Image Attached</div>
                      <div style={{ fontSize: '11px', color: 'rgba(237, 233, 232, 0.5)' }}>Will be rendered on public /projects card</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingProject({ ...editingProject, image: '' })}
                      title="Remove Image"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: 'rgba(255, 77, 79, 0.12)',
                        border: '1px solid rgba(255, 77, 79, 0.3)',
                        color: '#ff4d4f',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Live Preview Card */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px dashed rgba(200, 255, 61, 0.3)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  marginTop: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d' }}>
                    ⚡ LIVE CARD PREVIEW (AS SEEN ON /PROJECTS)
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: editingProject.status === 'Published' ? '#c8ff3d' : '#888',
                    }}
                  >
                    ● {editingProject.status}
                  </span>
                </div>

                {/* Thumbnail in Preview Card */}
                {editingProject.image && (
                  <div
                    style={{
                      width: '100%',
                      height: '110px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '10px',
                      border: '1px solid rgba(200, 255, 61, 0.3)',
                      backgroundColor: '#000',
                    }}
                  >
                    <img
                      src={editingProject.image}
                      alt="Card Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                  {editingProject.title || 'Untitled Project'}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(237, 233, 232, 0.65)', marginTop: '2px' }}>
                  {editingProject.client || 'Enterprise Client'} • {editingProject.category}
                </div>
                {editingProject.tagline && (
                  <div style={{ fontSize: '12px', color: 'rgba(237, 233, 232, 0.85)', marginTop: '6px', lineHeight: 1.4 }}>
                    {editingProject.tagline}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {editingProject.heroMetric && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: '#c8ff3d',
                        backgroundColor: 'rgba(200, 255, 61, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {editingProject.heroMetric}
                    </span>
                  )}
                  {editingProject.secondaryMetric && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'rgba(237, 233, 232, 0.7)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {editingProject.secondaryMetric}
                    </span>
                  )}
                  {editingProject.liveUrl && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: '#c8ff3d',
                        backgroundColor: 'rgba(200, 255, 61, 0.08)',
                        border: '1px solid rgba(200, 255, 61, 0.2)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      🔗 Live Site Attached
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#c8ff3d',
                    color: '#000000',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <Check size={16} /> Save Changes & Broadcast Live
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    color: '#ede9e8',
                    border: '1px solid rgba(237, 233, 232, 0.15)',
                    fontSize: '13px',
                    padding: '12px 20px',
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

      {/* 5. FLOATING REAL-TIME SYNC TOAST */}
      {realtimeToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            backgroundColor: 'rgba(12, 11, 11, 0.95)',
            border: '1px solid #c8ff3d',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.8), 0 0 24px rgba(200, 255, 61, 0.25)',
            borderRadius: '12px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backdropFilter: 'blur(20px)',
            maxWidth: '460px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#c8ff3d',
              boxShadow: '0 0 10px #c8ff3d',
              flexShrink: 0,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#c8ff3d', fontWeight: 600 }}>
              REAL-TIME BROADCAST ACTIVE
            </span>
            <span style={{ fontSize: '13px', color: '#ffffff', marginTop: '2px' }}>
              {realtimeToast}
            </span>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
