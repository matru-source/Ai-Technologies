// Centralized Real-Time Projects Data Store
export const STORAGE_KEY = 'aitech_admin_projects';

export const DEFAULT_PROJECTS = [
  {
    id: 'aura-fintech',
    title: 'Aura FinTech Global Banking',
    client: 'Aura Financial UK',
    category: 'Enterprise SaaS',
    type: 'Cross-Border Treasury & NeoBank',
    year: '2026',
    status: 'Published',
    heroMetric: '💳 $45M+ Monthly Volume',
    secondaryMetric: '🔒 SOC2 & PCI-DSS L1',
    tagline: 'High-frequency cross-border remittance and treasury dashboard with sub-second instant settlement.',
    description: 'Architected a modern banking dashboard supporting multi-currency accounts, automated FX hedging, instant virtual card issuance, and real-time fraud scoring powered by streaming transaction pipelines.',
    tags: ['Next.js 15', 'Node.js', 'Stripe Treasury', 'Redis', 'PostgreSQL', 'TypeScript'],
    accentColor: '#3df3ff',
    visualType: 'fintech-chart',
    liveUrl: 'https://aura-fintech.vercel.app',
    image: '',
    challenge: 'Managing real-time FX currency swings and high-concurrency wallet transactions without ledger inconsistency or latency spikes.',
    solution: 'Built an event-driven microservices architecture using Redis Streams and atomic ledger transactions with sub-10ms reconciliation.',
    deliverables: ['Multi-Currency Treasury Core', 'Instant Virtual Card Engine', 'Automated FX Hedging Automation', 'Real-Time Fraud Telemetry'],
  },
  {
    id: 'kinetix-commerce',
    title: 'Kinetix Headless Commerce Suite',
    client: 'Kinetix Apparel Global',
    category: 'Web Platforms',
    type: 'Sub-Second Global Storefront',
    year: '2025',
    status: 'Published',
    heroMetric: '🚀 99 Core Web Vitals',
    secondaryMetric: '🛒 +42% Checkout Conversion',
    tagline: 'Sub-second headless e-commerce store with dynamic 3D product previews and localized multi-currency checkout.',
    description: 'Developed an ultra-fast, headless commerce experience using edge-rendered product catalogs, fluid cart interactions, and instant checkout. Decreased bounce rates by 54% across mobile devices.',
    tags: ['React', 'Shopify Storefront API', 'GraphQL', 'Edge Workers', 'Three.js', 'Framer Motion'],
    accentColor: '#c8ff3d',
    visualType: 'ecommerce-cart',
    liveUrl: 'https://kinetix-apparel.com',
    image: '',
    challenge: 'Legacy monolithic storefront took 4.8 seconds to load on mobile, causing severe cart abandonment during global sales drops.',
    solution: 'Decoupled frontend into a distributed edge-rendered application with proactive pre-fetching and WebGL 3D garment exploration.',
    deliverables: ['Headless React Storefront', 'Interactive 3D Product Viewer', 'Edge CDN Optimization', 'Instant One-Click Checkout'],
  },
  {
    id: 'pulse-health',
    title: 'Pulse Health Clinical Telehealth',
    client: 'Pulse Health Systems',
    category: 'Mobile Apps',
    type: 'iOS & Android Telehealth App',
    year: '2026',
    status: 'Published',
    heroMetric: '🏥 HIPAA Compliant',
    secondaryMetric: '⭐ 4.9 App Store (120k Users)',
    tagline: 'Cross-platform iOS & Android telehealth application with real-time biometric vitals and encrypted consultations.',
    description: 'A patient-facing and clinician-facing mobile ecosystem featuring end-to-end encrypted WebRTC video visits, automated prescription routing, and Bluetooth medical device synchronization.',
    tags: ['React Native', 'WebRTC Video', 'FastAPI', 'EHR Integration', 'AWS GovCloud', 'Bluetooth BLE'],
    accentColor: '#ff5c5c',
    visualType: 'telehealth-vitals',
    liveUrl: 'https://pulse-health-systems.com',
    image: '',
    challenge: 'Ensuring zero-latency video calls and reliable biometric telemetry transfer even on unstable 3G/4G rural networks.',
    solution: 'Implemented adaptive bitrate WebRTC pipelines and an offline-first patient records caching layer with biometric biometric lock.',
    deliverables: ['Patient iOS & Android Mobile Apps', 'Clinician Web Console', 'HIPAA Encrypted Video Core', 'Smart Vitals Bluetooth Link'],
  },
  {
    id: 'vortex-cloud',
    title: 'Vortex Cloud Kubernetes Mesh',
    client: 'Vortex Data Labs',
    category: 'Enterprise SaaS',
    type: 'Multi-Cluster Observability Control',
    year: '2026',
    status: 'Published',
    heroMetric: '⏱️ 99.999% Uptime SLA',
    secondaryMetric: '📉 -35% AWS Cloud Bill',
    tagline: 'Unified observability and multi-cluster telemetry control plane with AI-assisted anomaly detection.',
    description: 'Designed a real-time infrastructure command center that visualizes Kubernetes pods, network topology, distributed traces, and cloud spending across AWS, GCP, and bare-metal servers.',
    tags: ['Go / Golang', 'React', 'Kubernetes API', 'Prometheus', 'Grafana Core', 'Docker'],
    accentColor: '#a78bfa',
    visualType: 'infra-topology',
    liveUrl: 'https://vortex-mesh.io',
    image: '',
    challenge: 'Engineering teams spent 6+ hours diagnosing inter-service cascading failures across 400+ distributed microservices.',
    solution: 'Engineered an eBPF-based topology auto-discovery engine that automatically maps root-cause bottlenecks and recommends instant node scaling.',
    deliverables: ['Visual Cluster Topology Map', 'Automated Cost Optimization Engine', 'eBPF Kernel Telemetry Agent', 'Multi-Cloud IAM Security'],
  },
  {
    id: 'apex-logistics',
    title: 'Apex Global Fleet & Supply Chain',
    client: 'Apex TransLogistics',
    category: 'Web Platforms',
    type: 'Real-Time Geospatial Fleet Engine',
    year: '2025',
    status: 'Published',
    heroMetric: '🗺️ 15,000+ Active Vehicles',
    secondaryMetric: '⛽ -18% Fuel Optimization',
    tagline: 'Live geospatial logistics dashboard tracking real-time delivery telemetry, ETA predictions, and automated dispatch.',
    description: 'A mission-critical fleet management platform providing sub-second GPS tracking, predictive arrival estimates, driver safety scoring, and algorithmic route dispatch across cross-country corridors.',
    tags: ['Mapbox GL JS', 'Node.js', 'WebSocket Real-Time', 'PostGIS', 'TypeScript', 'Tailwind CSS'],
    accentColor: '#c8ff3d',
    visualType: 'geo-fleet',
    liveUrl: 'https://apex-fleet-tracking.com',
    image: '',
    challenge: 'Legacy system lagged up to 4 minutes behind vehicle GPS updates, causing driver dispatch inefficiencies and misrouted cargo.',
    solution: 'Engineered a high-throughput binary WebSocket broker handling 15,000 simultaneous telemetry pings per second with instant map clustering.',
    deliverables: ['Live Geospatial Dispatcher Desk', 'Driver Route Navigation App', 'Predictive Fuel Analytics', 'Automated Bill-of-Lading Workflow'],
  },
  {
    id: 'synthetix-studio',
    title: 'Synthetix 3D Creative Studio',
    client: 'Synthetix Media Group',
    category: 'AI & Automation',
    type: 'Procedural WebGL Generative Suite',
    year: '2026',
    status: 'Published',
    heroMetric: '🎨 2.5M Assets Rendered',
    secondaryMetric: '⚡ 60 FPS in Browser',
    tagline: 'Browser-based procedural 3D modeler and generative design studio for brand designers and creative teams.',
    description: 'A browser-native WebGL studio that allows creative teams to compose, light, animate, and export photorealistic 3D assets and generative AI visuals directly without desktop software installation.',
    tags: ['Three.js', 'React', 'WebGL 2.0', 'Stable Diffusion API', 'WebAssembly', 'GLSL Shaders'],
    accentColor: '#f59e0b',
    visualType: 'studio-3d',
    liveUrl: 'https://synthetix-studio.ai',
    image: '',
    challenge: 'Bringing desktop-class 3D rendering and ray-traced materials into standard consumer web browsers with 60 FPS performance.',
    solution: 'Optimized custom WebGL shaders, instanced mesh geometry, and WebAssembly lighting computations running parallel on client GPUs.',
    deliverables: ['Full WebGL 3D Canvas Editor', 'Procedural Lighting Rig', 'AI Prompt-to-Texture Engine', 'High-Res USDZ/GLTF Exporter'],
  },
  {
    id: 'chronos-workspace',
    title: 'Chronos Team Collaboration Suite',
    client: 'Chronos Software Inc',
    category: 'Mobile Apps',
    type: 'Zero-Lag Offline-First Mobile App',
    year: '2025',
    status: 'Published',
    heroMetric: '📱 85k Daily Active Users',
    secondaryMetric: '⚡ < 5ms Local Sync',
    tagline: 'Zero-lag collaborative notes, task graphs, and team timeline manager with bi-directional offline synchronization.',
    description: 'A lightning-fast cross-platform productivity application designed for remote teams. Uses conflict-free replicated data types (CRDTs) to allow seamless offline editing and collaborative whiteboard brainstorms.',
    tags: ['React Native', 'CRDTs (Yjs)', 'SQLite Edge', 'Tailwind', 'Pusher Sockets', 'iOS / Android'],
    accentColor: '#38bdf8',
    visualType: 'notes-crdt',
    liveUrl: 'https://chronos-workspace.app',
    image: '',
    challenge: 'Ensuring team members collaborating across flights and subways never suffer merge conflicts or data loss upon reconnecting.',
    solution: 'Implemented mathematical CRDT conflict resolution paired with an embedded SQLite engine that syncs delta states seamlessly.',
    deliverables: ['iOS & Android Native Apps', 'Offline-First CRDT Sync Engine', 'Canvas Whiteboard Engine', 'Encrypted Cloud Backup'],
  },
  {
    id: 'cybershield-gateway',
    title: 'CyberShield Zero-Trust Access',
    client: 'CyberShield Security Labs',
    category: 'Enterprise SaaS',
    type: 'ZTNA Identity & Edge Protection',
    year: '2026',
    status: 'Published',
    heroMetric: '🛡️ ISO 27001 Certified',
    secondaryMetric: '🚫 0 Security Breaches',
    tagline: 'Next-generation zero-trust network access (ZTNA) control panel with biometric device verification and audit logs.',
    description: 'A security operations control plane that enforces identity verification, continuous device posture checks, dynamic perimeter firewall rules, and unified SAML / OAuth SSO authentication.',
    tags: ['Rust Core', 'Next.js 15', 'WireGuard Protocol', 'OAuth 2.1 / SAML', 'PostgreSQL', 'WebAuthn'],
    accentColor: '#c8ff3d',
    visualType: 'security-shield',
    liveUrl: 'https://cybershield-gateway.dev',
    image: '',
    challenge: 'Protecting distributed remote workforces from phishing and credential theft without frustrating users with intrusive VPN lag.',
    solution: 'Engineered a Rust-based edge proxy with hardware security key authentication (WebAuthn / FIDO2) and micro-segmented network routing.',
    deliverables: ['Zero-Trust Policy Command Center', 'Cross-Platform WireGuard Client', 'Hardware FIDO2 Integration', 'Automated Compliance Reporting'],
  },
];

const REMOVED_PROJECT_IDS = ['stim-spark', 'inashot-life', 'codewave-tech', 'lantern-brp'];

export function getStoredProjects() {
  if (typeof window === 'undefined') return DEFAULT_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROJECTS;
    let parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Purge any removed legacy/temporary project IDs from localStorage
      const filtered = parsed.filter((p) => !REMOVED_PROJECT_IDS.includes(p.id));
      if (filtered.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        parsed = filtered;
      }
      if (parsed.length === 0) return DEFAULT_PROJECTS;
      return parsed.map((p) => ({
        ...p,
        liveUrl: p.liveUrl !== undefined ? p.liveUrl : (DEFAULT_PROJECTS.find((d) => d.id === p.id)?.liveUrl || 'https://aitechnologies.org.in'),
        image: p.image !== undefined ? p.image : (DEFAULT_PROJECTS.find((d) => d.id === p.id)?.image || ''),
      }));
    }
  } catch (err) {
    console.warn('Error reading stored projects:', err);
  }
  return DEFAULT_PROJECTS;
}

export function saveStoredProjects(projects) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent('aitech_projects_changed', { detail: projects }));
  } catch (err) {
    console.error('Error saving projects:', err);
  }
}

export function resetProjectsToDefault() {
  saveStoredProjects(DEFAULT_PROJECTS);
  return DEFAULT_PROJECTS;
}
