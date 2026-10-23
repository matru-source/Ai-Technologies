import React, { useState, useRef, useEffect } from 'react';
import aitechEmblem from '../assets/aitech-emblem-white-neon.png';

// Exact cable routing algorithms from Framer source
function b(startX, startY, midX, endX, endY, radius = 14) {
  const dy = endY - startY;
  if (Math.abs(dy) < 2) return `M${startX},${startY} H${endX}`;
  const signY = Math.sign(dy);
  const cornerR = Math.min(radius, Math.abs(dy) / 2);
  const signStartX = Math.sign(midX - startX) || 1;
  const signEndX = Math.sign(endX - midX) || 1;
  return `M${startX},${startY} H${midX - signStartX * cornerR} Q${midX},${startY} ${midX},${startY + signY * cornerR} V${endY - signY * cornerR} Q${midX},${endY} ${midX + signEndX * cornerR},${endY} H${endX}`;
}

function x(startX, startY, midY, endX, endY, radius = 14) {
  const dx = endX - startX;
  if (Math.abs(dx) < 2) return `M${startX},${startY} V${endY}`;
  const signX = Math.sign(dx);
  const cornerR = Math.min(radius, Math.abs(dx) / 2);
  const signStartY = Math.sign(midY - startY) || 1;
  const signEndY = Math.sign(endY - midY) || 1;
  return `M${startX},${startY} V${midY - signStartY * cornerR} Q${startX},${midY} ${startX + signX * cornerR},${midY} H${endX - signX * cornerR} Q${endX},${midY} ${endX},${midY + signEndY * cornerR} V${endY}`;
}

const C_LOGO_PATHS = [
  'M30,0H118C134.6,0 148,13.4 148,30V40H30C24.5,40 20,44.5 20,50V98C20,103.5 24.5,108 30,108H148V118C148,134.6 134.6,148 118,148H30C13.4,148 0,134.6 0,118V30C0,13.4 13.4,0 30,0Z',
  'M54,54H138C143.5,54 148,58.5 148,64V84C148,89.5 143.5,94 138,94H54C48.5,94 44,89.5 44,84V64C44,58.5 48.5,54 54,54Z',
];

const W_CORNER_PATH = 'M0,0H30V8H8V30H0Z';

export default function DeployCanvas({
  inputs = [
    { id: 'default-item-0', label: 'Your code', title: 'Code repository' },
    { id: 'default-item-1', label: 'Your model', title: 'Open model' },
  ],
  outputs = [
    { id: 'default-item-0', label: 'Your app', title: 'Ready to deploy' },
    { id: 'default-item-1', label: 'Your endpoint', title: 'Ready to serve' },
  ],
  envs = ['production', 'staging', 'edge'],
  regions = ['USA', 'UK', 'EU'],
  coreLabel = 'AI Technologies',
  regionLabel = 'What we build:',
  appLayerLabel = 'Your solution',
  explodedLabel = 'Exploded view',
  flatLabel = 'Canvas',
  shell = '#ede9e8',
  pulse = '#c8ff3d',
  panel = 'rgba(14, 13, 13, 0.82)',
  radius = 22,
  packetSpeed = 1,
}) {
  const containerRef = useRef(null);
  const [containerW, setContainerW] = useState(1100);
  const [activeEnvIdx, setActiveEnvIdx] = useState(0);
  const [activeRegionIdx, setActiveRegionIdx] = useState(2); // EU default matching video
  const [isExploded, setIsExploded] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      setContainerW((prev) => (prev === w ? prev : w));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isMobile = containerW < 760;
  const stageW = isMobile ? 400 : 1000;
  const stageH = isMobile ? 640 : 380;
  const nodeW = isMobile ? 176 : 220;
  const nodeH = isMobile ? 70 : 74;
  const centerSize = isMobile ? 104 : 124;
  const centerX = stageW / 2;
  const centerY = stageH / 2;

  const getNodeCoords = (totalNodes, nodeIdx, isOutput) => {
    if (!isMobile) {
      const totalColH = totalNodes * nodeH + (totalNodes - 1) * 26;
      const startY = centerY - totalColH / 2;
      return {
        x: isOutput < 0 ? 40 : stageW - 40 - nodeW,
        y: startY + nodeIdx * (nodeH + 26),
      };
    }
    const totalRowW = totalNodes * nodeW + (totalNodes - 1) * 16;
    return {
      x: centerX - totalRowW / 2 + nodeIdx * (nodeW + 16),
      y: isOutput < 0 ? 24 : stageH - 24 - nodeH,
    };
  };

  const inputCoords = inputs.map((_, idx) => getNodeCoords(inputs.length, idx, -1));
  const outputCoords = outputs.map((_, idx) => getNodeCoords(outputs.length, idx, 1));

  // Compute exact cables
  const cables = [];
  inputCoords.forEach((coords, idx) => {
    const offset = (idx - (inputs.length - 1) / 2) * 12;
    if (isMobile) {
      cables.push({
        d: x(
          coords.x + nodeW / 2,
          coords.y + nodeH,
          (coords.y + nodeH + centerY - centerSize / 2) / 2 + offset,
          centerX + offset,
          centerY - centerSize / 2
        ),
        hot: idx,
      });
    } else {
      cables.push({
        d: b(
          coords.x + nodeW,
          coords.y + nodeH / 2,
          (coords.x + nodeW + centerX - centerSize / 2) / 2 + offset,
          centerX - centerSize / 2,
          centerY + offset
        ),
        hot: idx,
      });
    }
  });

  outputCoords.forEach((coords, idx) => {
    const offset = (idx - (outputs.length - 1) / 2) * 12;
    const hotId = inputs.length + idx;
    if (isMobile) {
      cables.push({
        d: x(
          centerX + offset,
          centerY + centerSize / 2,
          (centerY + centerSize / 2 + coords.y) / 2 + offset,
          coords.x + nodeW / 2,
          coords.y
        ),
        hot: hotId,
      });
    } else {
      cables.push({
        d: b(
          centerX + centerSize / 2,
          centerY + offset,
          (centerX + centerSize / 2 + coords.x) / 2 + offset,
          coords.x,
          coords.y + nodeH / 2
        ),
        hot: hotId,
      });
    }
  });

  const packetDuration = Math.max(0.8, 3 / Math.max(0.1, packetSpeed));
  const toPct = (val, max) => `${(val / max) * 100}%`;

  const renderNode = (item, coords, nodeIdx, isOutput) => {
    const isHovered = hoveredNode === nodeIdx;
    return (
      <div
        key={(isOutput ? 'o' : 'i') + nodeIdx}
        onMouseEnter={() => setHoveredNode(nodeIdx)}
        onMouseLeave={() => setHoveredNode(null)}
        style={{
          position: 'absolute',
          left: toPct(coords.x, stageW),
          top: toPct(coords.y, stageH),
          width: toPct(nodeW, stageW),
          height: toPct(nodeH, stageH),
          boxSizing: 'border-box',
          padding: isMobile ? '8px 10px' : '12px 14px',
          borderRadius: 12,
          background: 'rgba(10, 10, 10, 0.92)',
          border: `1px solid ${isHovered ? pulse : 'rgba(237, 233, 232, 0.14)'}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 6,
          boxShadow: isHovered
            ? '0 0 0 4px rgba(200, 255, 61, 0.12), 0 18px 40px rgba(0, 0, 0, 0.5)'
            : '0 12px 30px rgba(0, 0, 0, 0.4)',
          transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
          cursor: 'default',
        }}
      >
        {/* Corner tick at top-right */}
        <svg
          viewBox="0 0 30 30"
          style={{
            position: 'absolute',
            right: 6,
            top: 6,
            width: 9,
            height: 9,
            opacity: isHovered || isOutput ? 1 : 0.35,
          }}
        >
          <path d={W_CORNER_PATH} fill={pulse} />
        </svg>

        {/* Top Eyebrow Tag */}
        <span
          style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: isMobile ? '9px' : '10px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            color: isOutput ? pulse : 'rgba(237, 233, 232, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: isOutput ? 6 : 1,
              background: isOutput ? pulse : 'rgba(237, 233, 232, 0.55)',
              display: 'inline-block',
              boxShadow: isOutput ? '0 0 6px rgba(200, 255, 61, 0.7)' : 'none',
              animation: isOutput ? 'deployPulse 1.5s infinite ease-in-out' : 'none',
              animationDelay: `${nodeIdx * 0.3}s`,
            }}
          />
          {item.label}
        </span>

        {/* Title */}
        <span
          style={{
            fontFamily: '"Geist", sans-serif',
            fontWeight: 600,
            fontSize: isMobile ? '13px' : '18px',
            letterSpacing: '-0.02em',
            color: shell,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.title}
        </span>
      </div>
    );
  };

  const renderTopButton = (text, isSelected, onClick, key, hasDot = false) => (
    <button
      key={key}
      onClick={onClick}
      style={{
        all: 'unset',
        cursor: 'pointer',
        fontFamily: '"Geist Mono", ui-monospace, monospace',
        fontSize: '10px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '6px 10px',
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: isSelected ? shell : 'rgba(237, 233, 232, 0.55)',
        background: isSelected ? 'rgba(237, 233, 232, 0.08)' : 'transparent',
        border: `1px solid ${isSelected ? 'rgba(237, 233, 232, 0.18)' : 'transparent'}`,
        transition: 'all 0.2s',
      }}
    >
      {hasDot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 6,
            background: isSelected ? pulse : 'rgba(237, 233, 232, 0.35)',
            boxShadow: isSelected ? '0 0 6px rgba(200, 255, 61, 0.7)' : 'none',
          }}
        />
      )}
      {text}
    </button>
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: radius,
        background: panel,
        border: '1px solid rgba(237, 233, 232, 0.12)',
        overflow: 'hidden',
        color: shell,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: isMobile ? '10px 12px' : '12px 16px',
          borderBottom: '1px solid rgba(237, 233, 232, 0.1)',
          flexWrap: 'wrap',
          background: 'rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Environment Selector: production / staging / edge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {envs.map((env, idx) =>
            renderTopButton(env, idx === activeEnvIdx, () => setActiveEnvIdx(idx), `env-${idx}`, true)
          )}
        </div>

        {/* View Mode Toggle: Canvas / Exploded view */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: 3,
            borderRadius: 9,
            border: '1px solid rgba(237, 233, 232, 0.12)',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          {renderTopButton(flatLabel, !isExploded, () => setIsExploded(false), 'v0')}
          {renderTopButton(explodedLabel, isExploded, () => setIsExploded(true), 'v1')}
        </div>
      </div>

      {/* Main Interactive Stage with Grid Pattern */}
      <div
        style={{
          position: 'relative',
          padding: isMobile ? '20px 12px 40px' : '28px 28px 52px',
          backgroundImage:
            'linear-gradient(rgba(237, 233, 232, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(237, 233, 232, 0.045) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          perspective: 1600,
          minHeight: isMobile ? 0 : 420,
          overflow: 'hidden',
        }}
      >
        {/* Layer 1: Architecture Nodes & Cables (Tilted in Exploded Mode) */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            position: 'relative',
            zIndex: 2,
            transform: isExploded
              ? `rotateX(52deg) rotateZ(${isMobile ? -18 : -26}deg) scale(${isMobile ? 0.82 : 0.78}) translateY(${isMobile ? -30 : -40}px)`
              : 'rotateX(0deg) rotateZ(0deg) scale(1) translateY(0px)',
            transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Floating 'Your solution' Layer Label when in Exploded View */}
          {isExploded && (
            <span
              style={{
                fontFamily: '"Geist Mono", ui-monospace, monospace',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                position: 'absolute',
                left: 0,
                top: -24,
                color: pulse,
                transform: 'translateZ(40px)',
                textShadow: '0 0 12px rgba(200, 255, 61, 0.4)',
                zIndex: 10,
              }}
            >
              {appLayerLabel}
            </span>
          )}

          {/* Node Graph Grid & SVG Cables */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: `${stageW} / ${stageH}` }}>
            <svg
              viewBox={`0 0 ${stageW} ${stageH}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
            >
              {cables.map((cable, idx) => {
                const isHot = hoveredNode === cable.hot;
                return (
                  <g key={idx}>
                    <path
                      d={cable.d}
                      fill="none"
                      stroke="rgba(237, 233, 232, 0.16)"
                      strokeWidth={1.4}
                    />
                    <path
                      d={cable.d}
                      fill="none"
                      stroke={pulse}
                      strokeWidth={isHot ? 2.2 : 1.4}
                      strokeOpacity={hoveredNode === null || isHot ? 0.85 : 0.25}
                      style={{
                        transition: 'stroke-width 0.25s, stroke-opacity 0.25s',
                      }}
                    />
                    {/* Animated moving pulse packet cubes */}
                    {[0, 1].map((pktIdx) => (
                      <rect
                        key={pktIdx}
                        x={-3.5}
                        y={-3.5}
                        width={7}
                        height={7}
                        rx={1}
                        fill={pktIdx ? shell : pulse}
                        opacity={0}
                      >
                        <animateMotion
                          dur={`${packetDuration}s`}
                          begin={`${0.8 + idx * 0.3 + (packetDuration / 2) * pktIdx}s`}
                          repeatCount="indefinite"
                          path={cable.d}
                        />
                        <animate
                          attributeName="opacity"
                          from="0"
                          to="1"
                          dur="0.01s"
                          begin={`${0.8 + idx * 0.3 + (packetDuration / 2) * pktIdx}s`}
                          fill="freeze"
                        />
                      </rect>
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* Render Inputs */}
            {inputs.map((item, idx) => renderNode(item, inputCoords[idx], idx, false))}

            {/* Render Outputs */}
            {outputs.map((item, idx) =>
              renderNode(item, outputCoords[idx], inputs.length + idx, true)
            )}

            {/* Center Core Chip: AI Tecnologies */}
            <div
              style={{
                position: 'absolute',
                left: toPct(centerX - centerSize / 2, stageW),
                top: toPct(centerY - centerSize / 2, stageH),
                width: toPct(centerSize, stageW),
                height: toPct(centerSize, stageH),
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {/* Outer Dashed Rotating Ring */}
              <div
                className="deploy-dashed-ring"
                style={{
                  position: 'absolute',
                  inset: -12,
                  borderRadius: 30,
                  border: '1px dashed rgba(237, 233, 232, 0.22)',
                  pointerEvents: 'none',
                }}
              />
              {/* Core Chip Body with Neon Radial Glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 24,
                  background:
                    'radial-gradient(circle at 50% 35%, rgba(200, 255, 61, 0.28) 0%, rgba(10, 14, 10, 0.96) 72%)',
                  border: '1px solid rgba(200, 255, 61, 0.6)',
                  boxShadow: '0 0 50px rgba(200, 255, 61, 0.35)',
                }}
              />
              <img
                src={aitechEmblem}
                alt="AI Technologies Emblem"
                style={{
                  position: 'relative',
                  width: '68%',
                  height: '68%',
                  objectFit: 'contain',
                  zIndex: 2,
                  filter: 'drop-shadow(0 0 16px rgba(200, 255, 61, 0.55))',
                }}
              />
              <span
                style={{
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: shell,
                  position: 'absolute',
                  top: 'calc(100% + 18px)',
                  whiteSpace: 'nowrap',
                }}
              >
                {coreLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Layer 2: Isometric Striped Ground Plane (Visible in Exploded Mode) */}
        <div
          style={{
            position: 'absolute',
            left: '8%',
            right: '8%',
            top: '22%',
            bottom: '6%',
            borderRadius: 18,
            border: '1px solid rgba(200, 255, 61, 0.5)',
            background:
              'repeating-linear-gradient(135deg, rgba(200, 255, 61, 0.10) 0 2px, transparent 2px 14px), rgba(200, 255, 61, 0.05)',
            transformStyle: 'preserve-3d',
            zIndex: 1,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: 18,
            opacity: isExploded ? 1 : 0,
            transform: isExploded
              ? `rotateX(52deg) rotateZ(${isMobile ? -18 : -26}deg) translateY(${isMobile ? 60 : 90}px) scale(${isMobile ? 0.9 : 0.86})`
              : 'rotateX(52deg) rotateZ(-26deg) translateY(200px) scale(0.86)',
            transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            style={{
              fontFamily: '"Geist", sans-serif',
              fontWeight: 600,
              fontSize: isMobile ? '16px' : '22px',
              color: pulse,
              letterSpacing: '-0.02em',
              textShadow: '0 0 16px rgba(200, 255, 61, 0.4)',
            }}
          >
            {regionLabel} {regions[activeRegionIdx] || ''}
          </span>
        </div>

        {/* Exploded Mode Region Switcher Pill at Bottom */}
        {isExploded && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 14,
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 4,
              padding: 3,
              borderRadius: 9,
              background: 'rgba(0, 0, 0, 0.75)',
              border: '1px solid rgba(237, 233, 232, 0.12)',
              backdropFilter: 'blur(16px)',
              zIndex: 3,
            }}
          >
            {regions.map((regionName, idx) => {
              const isSel = idx === activeRegionIdx;
              return (
                <button
                  key={`r-${idx}`}
                  onClick={() => setActiveRegionIdx(idx)}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    fontFamily: '"Geist Mono", ui-monospace, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '6px 10px',
                    borderRadius: 7,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: isSel ? shell : 'rgba(237, 233, 232, 0.55)',
                    background: isSel ? 'rgba(237, 233, 232, 0.08)' : 'transparent',
                    border: `1px solid ${isSel ? 'rgba(237, 233, 232, 0.18)' : 'transparent'}`,
                    transition: 'all 0.2s',
                  }}
                >
                  {regionName}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes deployRotateDashed {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .deploy-dashed-ring {
          animation: deployRotateDashed 40s linear infinite;
        }
        @keyframes deployPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.35;
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
}
