// Centralized Real-Time Projects Data Store
export const STORAGE_KEY = 'aitech_admin_projects';

export const DEFAULT_PROJECTS = [
  {
    id: 'zex4u',
    title: 'ZEX® Personal Digital Guardian',
    client: 'ZEX Security',
    category: 'Mobile Apps',
    type: 'AI Mobile Security & Digital Safety Layer',
    year: '2026',
    status: 'Published',
    heroMetric: '🛡️ Immunity Score 721+',
    secondaryMetric: '⚡ Real-Time Scam & Threat Radar',
    tagline: 'Your digital life. A little safer. A lot calmer.',
    description: 'Engineered a next-generation personal digital safety layer for Android protecting users from scam links, risky apps, exposed identities, and real-time network threats with on-device intelligence.',
    tags: ['Android', 'React Native', 'Threat Intelligence', 'FastAPI', 'Cybersecurity', 'On-Device AI'],
    accentColor: '#c8ff3d',
    visualType: 'cyber-shield',
    liveUrl: 'https://zex4u.com/',
    image: '/assets/projects/zex4u.jpg',
    challenge: 'Smartphone users are inundated with malicious APKs, SMS phishing vectors, and silent credential leaks without clear visibility or actionable protection.',
    solution: 'Built an elegant, privacy-first mobile shield featuring live threat radar, immunity health scoring, and instant link safety verification.',
    deliverables: ['Native Android Protection Suite', 'Heuristic Link Verification Engine', 'Identity Exposure Scanner', 'Live Threat Telemetry'],
  },
  {
    id: 'novohoms',
    title: 'NovoHoms Luxury Real Estate Advisory',
    client: 'NovoHoms Advisory',
    category: 'Web Platforms',
    type: 'Bespoke Real Estate Advisory & Property Portal',
    year: '2026',
    status: 'Published',
    heroMetric: '🏙️ Bhubaneswar Luxury Portfolio',
    secondaryMetric: '✨ Curated Investment Spaces',
    tagline: 'Spaces that move you forward.',
    description: 'Architected and designed a high-end, immersive real estate advisory web platform for luxury residential and commercial properties in Bhubaneswar, featuring bespoke architectural showcases, WhatsApp advisor routing, and interactive opportunity discovery.',
    tags: ['React', 'Next.js 15', 'Tailwind CSS', 'Framer Motion', 'Lead Routing', 'Cloudflare CDN'],
    accentColor: '#cca468',
    visualType: 'fintech-chart',
    liveUrl: 'https://www.novohoms.com/',
    image: '/assets/projects/novohoms.jpg',
    challenge: 'Traditional real estate portals felt transactional and cluttered, failing to reflect the prestige, architectural nuance, and high-yield potential of premium developments.',
    solution: 'Crafted an editorial-grade web experience with cinematic imagery, seamless consultation scheduling, and high-speed multi-device responsiveness.',
    deliverables: ['Luxury Property Advisory Web Portal', 'Interactive Opportunities Directory', 'Automated WhatsApp Advisor Bridge', 'High-Speed Image & Video Delivery'],
  },
  {
    id: 'shresthamfoods',
    title: 'Shrestham Wood Pressed Mustard Oil',
    client: 'Shrestham Foods',
    category: 'Web Platforms',
    type: 'Cold-Pressed Organic Food D2C Storefront',
    year: '2026',
    status: 'Published',
    heroMetric: '🌿 100% Pure & Unrefined',
    secondaryMetric: '🏆 Cold Extracted Below 40°C',
    tagline: 'Pure Goodness. Honestly Pressed.',
    description: 'Engineered an authentic farm-to-doorstep D2C e-commerce platform for Shrestham, celebrating traditional wood-pressed (Kolhu) mustard oil with monthly recurring subscription plans, transparent lab certificates, and frictionless checkout.',
    tags: ['Next.js', 'React', 'Shopify Storefront', 'Tailwind CSS', 'Razorpay', 'Subscription Engine'],
    accentColor: '#ffaa00',
    visualType: 'ecommerce-cart',
    liveUrl: 'https://www.shresthamfoods.in/',
    image: '/assets/projects/shresthamfoods.jpg',
    challenge: 'Educating consumers on genuine cold-pressed extraction methods versus refined chemical processing while establishing trust and driving repeat recurring orders.',
    solution: 'Designed an organic, warm-toned storefront with interactive lab test verification, transparent process storytelling, and flexible 30-day recurring delivery plans.',
    deliverables: ['Custom D2C E-Commerce Storefront', 'Monthly Subscription & Repeat Delivery Engine', 'Dynamic Lab Certificate Viewer', '1-Click Express Checkout'],
  },
  {
    id: 'ghartakservice',
    title: 'Ghar Tak Service (GTS) On-Demand Ecosystem',
    client: 'Ghar Tak Service Technologies',
    category: 'Mobile Apps',
    type: 'On-Demand Doorstep Home Services Platform',
    year: '2026',
    status: 'Published',
    heroMetric: '🔧 18+ Doorstep Trades',
    secondaryMetric: '✅ OTP Verified Safe Handover',
    tagline: 'Service for your home and business, made simpler.',
    description: 'Architected an end-to-end multi-sided on-demand doorstep service platform uniting customers, verified technicians, and franchise partners across 18+ service categories with live GPS dispatch, OTP verification, and instant booking.',
    tags: ['React Native', 'Node.js', 'WebSockets', 'PostgreSQL', 'Redis', 'Admin Operations Panel'],
    accentColor: '#ff7700',
    visualType: 'logistics-map',
    liveUrl: 'https://web.ghartakservice.com/',
    image: '/assets/projects/ghartakservice.jpg',
    challenge: 'Fragmented local technician networks lacked price transparency, reliability, and automated dispatch across diverse service trades.',
    solution: 'Built an integrated ecosystem comprising consumer booking apps, technician job queues, franchise partner dashboards, and centralized operations monitoring.',
    deliverables: ['Multi-Tenant Web Booking Portal', 'Cross-Platform Mobile Apps', 'Partner & Franchise Management Hub', 'Real-Time Job Telemetry & Dispatch'],
  },
];

const DUMMY_PROJECT_IDS = [
  'aura-fintech',
  'kinetix-commerce',
  'pulse-health',
  'vortex-cloud',
  'apex-logistics',
  'synthetix-studio',
  'chronos-workspace',
  'cybershield-gateway',
  'stim-spark',
  'inashot-life',
  'codewave-tech',
  'lantern-brp',
];

export function getStoredProjects() {
  if (typeof window === 'undefined') return DEFAULT_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROJECTS;
    let parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Purge all dummy projects from client localStorage
      let filtered = parsed.filter((p) => !DUMMY_PROJECT_IDS.includes(p.id));

      // Ensure all 4 original projects exist in the list
      DEFAULT_PROJECTS.forEach((orig) => {
        if (!filtered.some((p) => p.id === orig.id)) {
          filtered.push(orig);
        }
      });

      // Maintain order: zex4u, novohoms, shresthamfoods, ghartakservice first
      const origIds = DEFAULT_PROJECTS.map((d) => d.id);
      const topOriginals = DEFAULT_PROJECTS.filter((d) => filtered.some((f) => f.id === d.id));
      const customProjects = filtered.filter((p) => !origIds.includes(p.id));
      filtered = [...topOriginals, ...customProjects];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

      return filtered.map((p) => {
        const defaultMatch = DEFAULT_PROJECTS.find((d) => d.id === p.id);
        return {
          ...p,
          liveUrl: p.liveUrl !== undefined && p.liveUrl !== '' ? p.liveUrl : (defaultMatch?.liveUrl || 'https://aitechnologies.org.in'),
          image: p.image !== undefined && p.image !== '' ? p.image : (defaultMatch?.image || ''),
        };
      });
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
