import React, { useState } from 'react';
import { Radio } from 'lucide-react';
import RegionMap from './RegionMap';
import CountryGlyph from './CountryGlyphs';
import aitechEmblem from '../assets/aitech-emblem-clean.png';

export default function GlobalReach() {
  const [activeRegion, setActiveRegion] = useState('us');

  const regions = [
    {
      id: 'us',
      code: 'USA',
      name: 'United States',
      flag: '🇺🇸',
      collaboration: 'EST / PST Sync',
      hubs: 'New York, San Francisco, Chicago',
      reach: 'North America Enterprise',
      focus: 'Full-Stack Web & Enterprise AI',
      status: 'Active Delivery',
    },
    {
      id: 'uk',
      code: 'UK',
      name: 'United Kingdom',
      flag: '🇬🇧',
      collaboration: 'GMT / BST Agile',
      hubs: 'London, Manchester',
      reach: 'UK & Western Europe',
      focus: 'Mobile Apps & Custom SaaS',
      status: 'Active Delivery',
    },
    {
      id: 'eu',
      code: 'EU',
      name: 'European Union',
      flag: '🇪🇺',
      collaboration: 'CET Timezone',
      hubs: 'Berlin, Amsterdam, Paris',
      reach: 'EU Continental Core',
      focus: 'Cloud Architecture & Web Platforms',
      status: 'Active Delivery',
    },
    {
      id: 'in',
      code: 'IN',
      name: 'India',
      flag: '🇮🇳',
      collaboration: 'Global HQ (IST)',
      hubs: 'Saheed Nagar, Bhubaneswar & Bengaluru',
      reach: 'Global Engineering Center',
      focus: 'Design Labs & AI Engineering Hub',
      status: 'Primary HQ',
    },
    {
      id: 'ae',
      code: 'UAE',
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      collaboration: 'GST Timezone',
      hubs: 'Dubai, Abu Dhabi',
      reach: 'GCC & MENA Region',
      focus: 'Digital Platforms & Workflows',
      status: 'Active Delivery',
    },
    {
      id: 'sa',
      code: 'SA',
      name: 'Saudi Arabia',
      flag: '🇸🇦',
      collaboration: 'AST Timezone',
      hubs: 'Riyadh, Jeddah',
      reach: 'Middle East Tech Hub',
      focus: 'Custom Enterprise Software',
      status: 'Active Delivery',
    },
    {
      id: 'br',
      code: 'BR',
      name: 'Brazil',
      flag: '🇧🇷',
      collaboration: 'BRT Timezone',
      hubs: 'São Paulo, Rio de Janeiro',
      reach: 'LATAM Enterprise Core',
      focus: 'Scalable Cloud Systems',
      status: 'Active Delivery',
    },
    {
      id: 'mx',
      code: 'MX',
      name: 'Mexico',
      flag: '🇲🇽',
      collaboration: 'CST Timezone',
      hubs: 'Mexico City, Guadalajara',
      reach: 'North LATAM Hub',
      focus: 'Cross-Platform Mobile Apps',
      status: 'Active Delivery',
    },
    {
      id: 'ke',
      code: 'KE',
      name: 'Kenya',
      flag: '🇰🇪',
      collaboration: 'EAT Timezone',
      hubs: 'Nairobi Hub',
      reach: 'East Africa Digital',
      focus: 'Fintech & Mobile Platforms',
      status: 'Active Delivery',
    },
    {
      id: 'ng',
      code: 'NG',
      name: 'Nigeria',
      flag: '🇳🇬',
      collaboration: 'WAT Timezone',
      hubs: 'Lagos Hub',
      reach: 'West Africa Commercial Hub',
      focus: 'High-Scale Web Solutions',
      status: 'Active Delivery',
    },
  ];

  const current = regions.find((r) => r.id === activeRegion) || regions[0];

  return (
    <section
      id="global-reach"
      className="global-reach-section"
      style={{
        position: 'relative',
        background: 'transparent',
        zIndex: 1,
      }}
    >
      <div className="container">
        {/* Header */}
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
            <span>07 / GLOBAL CLIENT COLLABORATION</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(36px, 4.8vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: '18px',
            }}
          >
            Built for global scale.
            <br />
            <span style={{ color: 'rgba(237, 233, 232, 0.5)' }}>
              Collaborating across all timezones.
            </span>
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(237, 233, 232, 0.72)',
              maxWidth: '720px',
              lineHeight: 1.5,
            }}
          >
            We partner with companies worldwide to deliver websites, mobile applications, and intelligent systems. From our headquarters in Bhubaneswar to clients across North America, Europe, and the Middle East, our agile delivery process ensures seamless collaboration and predictable sprint milestones.
          </p>
        </div>

        {/* Global Hubs Interactive Map Console */}
        <div
          className="glass-panel has-brackets global-reach-panel"
          style={{
            background: 'radial-gradient(120% 120% at 50% 15%, rgba(200, 255, 61, 0.05) 0%, rgba(8, 7, 7, 0.98) 100%)',
            border: '1px solid var(--border-medium)',
            borderRadius: '16px',
            marginBottom: '32px',
          }}
        >
          {/* Top collaboration status */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Radio size={18} style={{ color: 'var(--accent-neon)' }} />
              <span className="mono" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                GLOBAL CLIENT DELIVERY // TIMEZONE COLLABORATION
              </span>
            </div>

            <div className="pulse-badge mono" style={{ fontSize: '11px' }}>
              <span className="pulse-dot" />
              100% SPRINT EFFICIENCY &bull; 10 CLIENT DELIVERY HUBS
            </div>
          </div>

          {/* Proper Geographic World Map Console */}
          <div style={{ marginBottom: '28px' }}>
            <RegionMap activeRegion={activeRegion} onSelectRegion={setActiveRegion} />
          </div>

          {/* Live Node Delivery Card */}
          <div
            style={{
              padding: '20px 24px',
              background: 'rgba(0, 0, 0, 0.65)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(200, 255, 61, 0.1)',
                  border: '1.5px solid var(--accent-neon)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                }}
              >
                {current.flag}
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {current.name} Client Delivery Hub
                </div>
                <div className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Regional Focus: {current.hubs} &bull; {current.reach}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
              <div>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  COLLABORATION
                </div>
                <div className="mono" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-neon)' }}>
                  {current.collaboration}
                </div>
              </div>

              <div>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  SERVICE FOCUS
                </div>
                <div className="mono" style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
                  {current.focus}
                </div>
              </div>

              <div>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  STATUS
                </div>
                <div className="mono" style={{ fontSize: '13px', fontWeight: 600, color: '#3df3ff' }}>
                  {current.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 10 Canvas Country Glyphs Badges */}
        <div
          className="global-reach-glyphs-grid"
          style={{
            gap: '14px',
          }}
        >
          {regions.map((reg) => (
            <div
              key={reg.id}
              onClick={() => setActiveRegion(reg.id)}
              style={{ cursor: 'pointer' }}
            >
              <CountryGlyph
                code={reg.code}
                name={reg.name}
                flag={reg.flag}
                latency={reg.collaboration}
                reach={reg.reach}
                isActive={activeRegion === reg.id}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .global-reach-section {
          padding: 90px 0;
        }
        .global-reach-panel {
          padding: 32px;
        }
        .global-reach-glyphs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }
        @media (max-width: 900px) {
          .global-reach-section {
            padding: 60px 0;
          }
          .global-reach-panel {
            padding: 24px 20px;
          }
          .global-reach-glyphs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
        }
        @media (max-width: 600px) {
          .global-reach-section {
            padding: 44px 0;
          }
          .global-reach-panel {
            padding: 16px 12px;
          }
          .global-reach-glyphs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
