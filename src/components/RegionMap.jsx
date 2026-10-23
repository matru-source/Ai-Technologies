import React, { useEffect, useRef, useState } from 'react';

const ACTIVE_REGIONS = [
  { id: 'usa', code: 'USA', name: 'United States', lat: 39, lng: -98, reach: 24, latency: '16ms', status: 'Optimal' },
  { id: 'uk', code: 'UK', name: 'United Kingdom', lat: 54, lng: -2.5, reach: 10, latency: '22ms', status: 'Optimal' },
  { id: 'eu', code: 'EU', name: 'European Union', lat: 49, lng: 10, reach: 16, latency: '26ms', status: 'Optimal' },
];

const SOON_REGIONS = [
  { id: 'in', code: 'IN', name: 'India', lat: 22.5, lng: 78.9, latency: '34ms', status: 'Deploying' },
  { id: 'ng', code: 'NG', name: 'Nigeria', lat: 9.1, lng: 8.7, latency: '58ms', status: 'Deploying' },
  { id: 'ke', code: 'KE', name: 'Kenya', lat: 0.2, lng: 37.9, latency: '52ms', status: 'Deploying' },
  { id: 'mx', code: 'MX', name: 'Mexico', lat: 23.6, lng: -102.5, latency: '38ms', status: 'Deploying' },
  { id: 'br', code: 'BR', name: 'Brazil', lat: -14.2, lng: -51.9, latency: '44ms', status: 'Deploying' },
  { id: 'pk', code: 'PK', name: 'Pakistan', lat: 30.3, lng: 69.3, latency: '40ms', status: 'Deploying' },
  { id: 'sa', code: 'SA', name: 'Saudi Arabia', lat: 23.8, lng: 45.0, latency: '32ms', status: 'Deploying' },
  { id: 'ae', code: 'AE', name: 'United Arab Emirates', lat: 23.4, lng: 53.8, latency: '29ms', status: 'Deploying' },
];

export default function RegionMap({
  dotSize = 2.2,
  pulseColor = 'rgb(200, 255, 61)',
  shellColor = 'rgb(237, 233, 232)',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [nodePositions, setNodePositions] = useState([]);

  // Simple Equal Earth / Equirectangular projection mapping [lng, lat] -> [x, y]
  const project = (lng, lat, w, h) => {
    const x = ((lng + 180) / 360) * w;
    const y = ((90 - lat) / 180) * h;
    return [x, y];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.offsetWidth || 800;
    let height = Math.round(width * 0.48);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Calculate node coordinates in canvas space
    const nodes = [
      ...ACTIVE_REGIONS.map((r) => {
        const [x, y] = project(r.lng, r.lat, width, height);
        const [rx] = project(r.lng + r.reach, r.lat, width, height);
        return { ...r, x, y, reachPx: Math.abs(rx - x), active: true };
      }),
      ...SOON_REGIONS.map((r) => {
        const [x, y] = project(r.lng, r.lat, width, height);
        return { ...r, x, y, reachPx: 12, active: false };
      }),
    ];
    setNodePositions(nodes);

    // Procedural Landmass dot matrix renderer (renders continents cleanly without external heavy bundle)
    // Continent rough bounding polygons for dot density
    const landPolys = [
      // North America
      { minX: -168, maxX: -52, minY: 15, maxY: 72 },
      // South America
      { minX: -82, maxX: -34, minY: -56, maxY: 12 },
      // Europe
      { minX: -10, maxX: 40, minY: 36, maxY: 71 },
      // Africa
      { minX: -18, maxX: 52, minY: -35, maxY: 37 },
      // Asia
      { minX: 40, maxX: 145, minY: 5, maxY: 75 },
      // Australia
      { minX: 112, maxX: 154, minY: -44, maxY: -10 },
      // UK / Japan / Islands
      { minX: -11, maxX: 2, minY: 50, maxY: 60 },
      { minX: 128, maxX: 146, minY: 30, maxY: 46 },
    ];

    const step = Math.max(5, Math.round(width / 140));

    ctx.clearRect(0, 0, width, height);

    for (let py = 10; py < height - 10; py += step) {
      for (let px = 10; px < width - 10; px += step) {
        // Convert screen pixel to [lng, lat]
        const lng = (px / width) * 360 - 180;
        const lat = 90 - (py / height) * 180;

        // Check if inside any continent rough box
        const isLand = landPolys.some(
          (b) => lng >= b.minX && lng <= b.maxX && lat >= b.minY && lat <= b.maxY
        );

        if (!isLand) continue;

        // Check proximity to active nodes
        const isNearActive = nodes.some(
          (n) => n.active && (px - n.x) ** 2 + (py - n.y) ** 2 < n.reachPx ** 2
        );

        ctx.fillStyle = isNearActive ? pulseColor : 'rgba(237, 233, 232, 0.16)';
        ctx.globalAlpha = isNearActive ? 0.9 : 0.45;
        const s = (isNearActive ? 1.4 : 1) * dotSize;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
    }

    ctx.globalAlpha = 1;
  }, [dotSize, pulseColor, shellColor]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '340px',
        background: 'radial-gradient(ellipse at center, rgba(14, 13, 13, 0.9) 0%, rgba(8, 7, 7, 0.98) 100%)',
        border: '1px solid var(--border-medium)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Interactive Node Markers with Pulsing Ripples */}
      {nodePositions.map((node) => {
        const isHovered = activeTooltip?.id === node.id;
        return (
          <div
            key={node.id}
            onMouseEnter={() => setActiveTooltip(node)}
            onMouseLeave={() => setActiveTooltip(null)}
            style={{
              position: 'absolute',
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: isHovered ? 20 : node.active ? 10 : 5,
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            {/* Animated Ripple for active nodes */}
            {node.active && (
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '16px',
                  height: '16px',
                  marginLeft: '-8px',
                  marginTop: '-8px',
                  borderRadius: '50%',
                  border: `1.5px solid ${pulseColor}`,
                  animation: 'pulseGlow 2s infinite ease-out',
                }}
              />
            )}

            {/* Core Node Marker */}
            <span
              style={{
                display: 'block',
                width: node.active ? '10px' : '7px',
                height: node.active ? '10px' : '7px',
                borderRadius: '2px',
                background: node.active ? pulseColor : 'rgba(237, 233, 232, 0.55)',
                boxShadow: node.active ? `0 0 12px ${pulseColor}` : 'none',
                position: 'relative',
              }}
            />

            {/* Static Code Tag */}
            {!isHovered && (
              <div
                className="mono"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '10px',
                  color: node.active ? pulseColor : 'var(--text-muted)',
                  background: 'rgba(0, 0, 0, 0.85)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {node.code}
              </div>
            )}

            {/* Tooltip on Hover */}
            {isHovered && (
              <div
                className="mono"
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '20px',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(10, 9, 9, 0.95)',
                  border: `1px solid ${node.active ? pulseColor : 'var(--border-medium)'}`,
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.8)',
                  pointerEvents: 'none',
                  zIndex: 30,
                }}
              >
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '12px', marginBottom: '2px' }}>
                  {node.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Latency: <strong style={{ color: pulseColor }}>{node.latency}</strong> &bull; Status:{' '}
                  <span style={{ color: node.active ? pulseColor : '#3df3ff' }}>{node.status}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
