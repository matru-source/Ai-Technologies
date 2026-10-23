import React, { useState } from 'react';
import {
  WORLD_VIEWBOX,
  WORLD_LANDMASS_PATH,
  REGION_SVG_PATHS,
  MAP_HUBS,
} from './worldMapData';

export default function RegionMap({
  activeRegion = 'us',
  onSelectRegion,
  pulseColor = '#c8ff3d',
}) {
  const [hoveredHub, setHoveredHub] = useState(null);
  const [mouseCoord, setMouseCoord] = useState(null);

  // HQ location is India
  const hqNode = MAP_HUBS.find((h) => h.isHQ) || MAP_HUBS[0];

  // Helper to generate elegant curved Bezier arcs between HQ and client hubs
  const createArc = (from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    // Elevated control point for natural orbital trajectory
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;
    const lift = Math.min(65, Math.max(22, dist * 0.16));
    const cx = mx;
    const cy = my - lift;
    return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
  };

  // Convert SVG coordinates to approximate lat/lng for futuristic HUD readout
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 1000;
    const svgY = ((e.clientY - rect.top) / rect.height) * 507;
    const approxLng = Math.round((svgX / 1000) * 360 - 180);
    const approxLat = Math.round(90 - (svgY / 507) * 180);
    setMouseCoord({
      lat: `${Math.abs(approxLat)}°${approxLat >= 0 ? 'N' : 'S'}`,
      lng: `${Math.abs(approxLng)}°${approxLng >= 0 ? 'E' : 'W'}`,
    });
  };

  // Prevent hover card from triggering and obstructing the map on mobile/touch devices
  const handleHubEnter = (hubId) => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) {
        return;
      }
    }
    setHoveredHub(hubId);
  };

  const handleTouchStart = () => {
    setHoveredHub(null);
  };

  return (
    <div
      className="proper-map-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        background: 'radial-gradient(120% 90% at 50% 20%, #111411 0%, #080808 100%)',
        border: '1px solid rgba(237, 233, 232, 0.12)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.75)',
      }}
    >
      {/* Top Map HUD Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 20px',
          background: 'rgba(10, 10, 10, 0.7)',
          borderBottom: '1px solid rgba(237, 233, 232, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: pulseColor,
                boxShadow: `0 0 8px ${pulseColor}`,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: pulseColor,
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              HQ: Saheed Nagar, Bhubaneswar (IST)
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(237, 233, 232, 0.45)',
            }}
          >
            &bull; 10 Global Delivery Hubs Active
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {mouseCoord && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(237, 233, 232, 0.55)',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(237, 233, 232, 0.08)',
              }}
            >
              {mouseCoord.lat}, {mouseCoord.lng}
            </span>
          )}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#3df3ff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'rgba(61, 243, 255, 0.08)',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(61, 243, 255, 0.25)',
            }}
          >
            24/7 Agile Sync
          </span>
        </div>
      </div>

      {/* SVG True Geographic World Map */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '50.7%', // Preserves 1000:507 Robinson aspect ratio
          minHeight: '340px',
        }}
      >
        <svg
          viewBox={WORLD_VIEWBOX}
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMouseCoord(null)}
          onTouchStart={handleTouchStart}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        >
          <defs>
            {/* Glowing filter for active nodes */}
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing filter for country selection */}
            <filter id="country-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#c8ff3d" floodOpacity="0.4" />
            </filter>

            {/* Linear gradient for beam flow */}
            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c8ff3d" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3df3ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c8ff3d" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Graticule Grid Lines (Latitude & Longitude) */}
          <g opacity="0.12" stroke="rgba(237, 233, 232, 0.4)" strokeWidth="0.5" strokeDasharray="3 4">
            {/* Parallels (Latitude) */}
            <line x1="50" y1="80" x2="950" y2="80" />
            <line x1="40" y1="140" x2="960" y2="140" />
            <line x1="20" y1="200" x2="980" y2="200" />
            {/* Equator */}
            <line
              x1="0"
              y1="253.5"
              x2="1000"
              y2="253.5"
              stroke="#c8ff3d"
              strokeWidth="0.8"
              opacity="0.3"
              strokeDasharray="4 4"
            />
            <line x1="20" y1="310" x2="980" y2="310" />
            <line x1="40" y1="380" x2="960" y2="380" />
            <line x1="60" y1="440" x2="940" y2="440" />

            {/* Meridians (Longitude) */}
            <line x1="166" y1="40" x2="166" y2="470" />
            <line x1="333" y1="30" x2="333" y2="480" />
            <line x1="500" y1="20" x2="500" y2="490" stroke="rgba(237, 233, 232, 0.6)" />
            <line x1="666" y1="30" x2="666" y2="480" />
            <line x1="833" y1="40" x2="833" y2="470" />
          </g>

          {/* 1. Global World Landmass Background Path */}
          <path
            d={WORLD_LANDMASS_PATH}
            fill="rgba(237, 233, 232, 0.065)"
            stroke="rgba(237, 233, 232, 0.16)"
            strokeWidth="0.75"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* 2. Highlighted Active Delivery Hub Countries */}
          {Object.entries(REGION_SVG_PATHS).map(([regId, pathD]) => {
            if (!pathD) return null;
            const isSelected = activeRegion === regId;
            const isHovered = hoveredHub === regId;

            return (
              <path
                key={regId}
                d={pathD}
                onClick={() => onSelectRegion && onSelectRegion(regId)}
                onMouseEnter={() => handleHubEnter(regId)}
                onMouseLeave={() => setHoveredHub(null)}
                onTouchStart={handleTouchStart}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                fill={
                  isSelected
                    ? 'rgba(200, 255, 61, 0.28)'
                    : isHovered
                    ? 'rgba(200, 255, 61, 0.18)'
                    : 'rgba(200, 255, 61, 0.08)'
                }
                stroke={isSelected ? '#c8ff3d' : isHovered ? '#c8ff3d' : 'rgba(200, 255, 61, 0.4)'}
                strokeWidth={isSelected ? 1.5 : isHovered ? 1.2 : 0.8}
                filter={isSelected ? 'url(#country-glow)' : 'none'}
              />
            );
          })}

          {/* 3. Cyber Collaboration Arcs Radiating from India HQ */}
          {MAP_HUBS.filter((h) => !h.isHQ).map((hub) => {
            const arcD = createArc(hqNode, hub);
            const isHighlighted = activeRegion === hub.id || hoveredHub === hub.id;

            return (
              <g key={`arc-${hub.id}`}>
                {/* Background static arc */}
                <path
                  d={arcD}
                  fill="none"
                  stroke={isHighlighted ? '#c8ff3d' : 'rgba(200, 255, 61, 0.25)'}
                  strokeWidth={isHighlighted ? 1.8 : 1}
                  opacity={isHighlighted ? 0.95 : 0.4}
                  strokeLinecap="round"
                  style={{ transition: 'all 0.3s ease' }}
                />

                {/* Animated beam pulse flowing along arc */}
                <path
                  d={arcD}
                  fill="none"
                  stroke="url(#arc-gradient)"
                  strokeWidth={isHighlighted ? 2.4 : 1.6}
                  strokeDasharray="8 16"
                  className="beam-animation"
                  opacity={isHighlighted ? 1 : 0.75}
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* 4. Delivery Hub Markers (Interactive Beacons) */}
          {MAP_HUBS.map((hub) => {
            const isSelected = activeRegion === hub.id;
            const isHovered = hoveredHub === hub.id;

            return (
              <g
                key={hub.id}
                transform={`translate(${hub.x}, ${hub.y})`}
                onClick={() => onSelectRegion && onSelectRegion(hub.id)}
                onMouseEnter={() => handleHubEnter(hub.id)}
                onMouseLeave={() => setHoveredHub(null)}
                onTouchStart={handleTouchStart}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer radar pulse wave */}
                <circle
                  r={hub.isHQ ? 16 : 12}
                  fill="none"
                  stroke={hub.isHQ ? '#c8ff3d' : isSelected ? '#c8ff3d' : 'rgba(200, 255, 61, 0.6)'}
                  strokeWidth={hub.isHQ ? 1.5 : 1}
                  className="radar-pulse"
                  opacity="0.6"
                />

                {/* Secondary wave for Global HQ */}
                {hub.isHQ && (
                  <circle
                    r={24}
                    fill="none"
                    stroke="#c8ff3d"
                    strokeWidth="0.8"
                    className="radar-pulse-secondary"
                    opacity="0.4"
                  />
                )}

                {/* Solid beacon halo */}
                <circle
                  r={hub.isHQ ? 7 : isSelected ? 5.5 : 4}
                  fill={hub.isHQ ? '#c8ff3d' : isSelected ? '#c8ff3d' : 'rgba(200, 255, 61, 0.85)'}
                  filter="url(#neon-glow)"
                />

                {/* Inner white core */}
                <circle r={hub.isHQ ? 3 : 2} fill="#ffffff" />

                {/* City / Hub Code Label Chip */}
                <g transform="translate(10, -4)">
                  <rect
                    x="-2"
                    y="-10"
                    width={hub.isHQ ? 54 : 32}
                    height="14"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.88)"
                    stroke={isSelected || hub.isHQ ? '#c8ff3d' : 'rgba(237, 233, 232, 0.25)'}
                    strokeWidth="0.8"
                  />
                  <text
                    x="2"
                    y="0"
                    fill={isSelected || hub.isHQ ? '#c8ff3d' : 'rgba(237, 233, 232, 0.85)'}
                    fontSize={hub.isHQ ? '8.5' : '8'}
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="0.05em"
                  >
                    {hub.isHQ ? 'IN • HQ' : hub.code}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* 5. Tooltip on Hover (Desktop Hover Only, hidden on Mobile) */}
        {hoveredHub && (() => {
          const hub = MAP_HUBS.find((h) => h.id === hoveredHub);
          if (!hub) return null;

          // Convert viewBox coordinate percentage to CSS positioning with safe horizontal clamping
          const leftPct = Math.min(84, Math.max(16, (hub.x / 1000) * 100));
          const topPct = (hub.y / 507) * 100;

          return (
            <div
              className="map-hover-tooltip"
              style={{
                position: 'absolute',
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: 'translate(-50%, -125%)',
                zIndex: 30,
                pointerEvents: 'none',
                background: 'rgba(12, 12, 12, 0.96)',
                border: '1px solid #c8ff3d',
                borderRadius: '8px',
                padding: '10px 14px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.85), 0 0 16px rgba(200, 255, 61, 0.25)',
                whiteSpace: 'nowrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <span style={{ fontSize: '15px' }}>{hub.flag}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                  {hub.name} {hub.isHQ ? '(Primary Global HQ)' : 'Client Hub'}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(237, 233, 232, 0.75)',
                  marginBottom: '2px',
                }}
              >
                Focus: {hub.city} &bull; {hub.focus}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#c8ff3d',
                  fontWeight: 600,
                }}
              >
                Sync: {hub.sync}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Map Legend Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 20px',
          background: 'rgba(8, 8, 8, 0.75)',
          borderTop: '1px solid rgba(237, 233, 232, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#c8ff3d',
                boxShadow: '0 0 8px #c8ff3d',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(237, 233, 232, 0.7)',
              }}
            >
              India Global HQ
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '2px',
                background: '#3df3ff',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(237, 233, 232, 0.7)',
              }}
            >
              Active Delivery Hub
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '24px',
                height: '2px',
                background: 'linear-gradient(90deg, #c8ff3d, #3df3ff)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(237, 233, 232, 0.7)',
              }}
            >
              Realtime Sprint Collaboration Beam
            </span>
          </div>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(237, 233, 232, 0.4)',
          }}
        >
          Click any country or hub on map to view details
        </span>
      </div>

      <style>{`
        @keyframes radarExpand {
          0% {
            r: 8px;
            opacity: 0.8;
          }
          100% {
            r: 22px;
            opacity: 0;
          }
        }
        @keyframes radarExpandHQ {
          0% {
            r: 12px;
            opacity: 0.9;
          }
          100% {
            r: 34px;
            opacity: 0;
          }
        }
        @keyframes beamFlow {
          0% {
            stroke-dashoffset: 48;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .radar-pulse {
          animation: radarExpand 2.2s infinite ease-out;
          transform-origin: center;
        }
        .radar-pulse-secondary {
          animation: radarExpandHQ 2.8s infinite ease-out 0.8s;
          transform-origin: center;
        }
        .beam-animation {
          animation: beamFlow 1.8s infinite linear;
        }
        .proper-map-wrapper path {
          transition: fill 0.25s ease, stroke 0.25s ease;
        }
        @media (max-width: 768px), (hover: none), (pointer: coarse) {
          .map-hover-tooltip {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        }
      `}</style>
    </div>
  );
}
