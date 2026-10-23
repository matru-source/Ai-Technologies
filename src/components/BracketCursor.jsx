import React, { useEffect } from 'react';

export default function BracketCursor({
  color = '#c8ff3d',
  shell = '#ede9e8',
  size = 8,
  bracket = 8,
  stiffness = 260,
  burst = true,
  hideNative = true,
}) {
  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === 'undefined') return;
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    // 1. Hide native cursor via injected style
    let styleTag = null;
    if (hideNative) {
      styleTag = document.createElement('style');
      styleTag.id = 'bracket-cursor-style';
      styleTag.textContent = `
        html, body, a, button, select, [role="button"], div, span, p, h1, h2, h3, h4, h5, h6, canvas, svg {
          cursor: none !important;
        }
        input, textarea, [contenteditable="true"] {
          cursor: text !important;
        }
      `;
      document.head.appendChild(styleTag);
    }

    // 2. Create cursor root container
    const root = document.createElement('div');
    root.id = 'bracket-cursor-root';
    root.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999999;overflow:hidden;';
    document.body.appendChild(root);

    // 3. Center dot/square
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 1px;
      will-change: transform;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s, background 0.25s, width 0.2s, height 0.2s;
    `;

    // 4. Outer brackets container
    const brackets = document.createElement('div');
    brackets.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      will-change: transform, width, height;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s;
    `;

    // 4 corner brackets
    const cornerDivs = [];
    const corners = [
      'left:0;top:0;border-left:1.5px solid;border-top:1.5px solid;',
      'right:0;top:0;border-right:1.5px solid;border-top:1.5px solid;',
      'left:0;bottom:0;border-left:1.5px solid;border-bottom:1.5px solid;',
      'right:0;bottom:0;border-right:1.5px solid;border-bottom:1.5px solid;',
    ];

    corners.forEach((css) => {
      const c = document.createElement('div');
      c.style.cssText = `
        position: absolute;
        width: ${bracket}px;
        height: ${bracket}px;
        border-color: ${shell};
        transition: border-color 0.25s ease;
        ${css}
      `;
      brackets.appendChild(c);
      cornerDivs.push(c);
    });

    root.appendChild(brackets);
    root.appendChild(dot);

    // Mouse tracking & physics state
    const mouse = { x: -100, y: -100, seen: false };
    const spring = { x: -100, y: -100, w: 34, h: 34, vx: 0, vy: 0, vw: 0, vh: 0 };
    let hoveredTarget = null;
    let isTextInput = false;
    let isMouseDown = false;
    let rafId = null;
    let lastTime = performance.now();

    const interactiveSelector = "a, button, [role='button'], input, textarea, select, label, [data-interactive='true']";
    const textInputSelector = "input, textarea, [contenteditable='true']";

    const onPointerMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!mouse.seen) {
        mouse.seen = true;
        spring.x = mouse.x - spring.w / 2;
        spring.y = mouse.y - spring.h / 2;
        dot.style.opacity = '1';
        brackets.style.opacity = '1';
      }

      const target = e.target;
      isTextInput = !!target?.closest?.(textInputSelector);
      hoveredTarget = isTextInput ? null : target?.closest?.(interactiveSelector) || null;
    };

    const onPointerLeave = () => {
      dot.style.opacity = '0';
      brackets.style.opacity = '0';
      mouse.seen = false;
    };

    // Burst particles on click
    const createClickBurst = (cx, cy) => {
      if (!burst) return;
      const burstContainer = document.createElement('div');
      burstContainer.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:0;height:0;pointer-events:none;`;
      root.appendChild(burstContainer);

      const dirs = [
        [1, -1], [-1, -1], [1, 1], [-1, 1],
      ];
      const pSize = Math.max(4, size * 0.8);

      dirs.forEach(([dx, dy], dirIdx) => {
        for (let pIdx = 1; pIdx <= 3; pIdx++) {
          const spark = document.createElement('div');
          spark.style.cssText = `
            position: absolute;
            left: ${-pSize / 2}px;
            top: ${-pSize / 2}px;
            width: ${pSize}px;
            height: ${pSize}px;
            background: ${pIdx === 3 ? shell : color};
            border-radius: 1px;
            pointer-events: none;
          `;
          burstContainer.appendChild(spark);

          const tx = dx * (pIdx * pSize * 1.35);
          const ty = dy * (pIdx * pSize * 1.35);

          spark.animate(
            [
              { transform: 'translate(0, 0) scale(0.4)', opacity: 1 },
              { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 1, offset: 0.55 },
              { transform: `translate(${tx * 1.4}px, ${ty * 1.4}px) scale(0.5)`, opacity: 0 },
            ],
            {
              duration: 560,
              delay: pIdx * 35 + dirIdx * 10,
              easing: 'cubic-bezier(.2, .7, .1, 1)',
              fill: 'forwards',
            }
          );
        }
      });

      setTimeout(() => burstContainer.remove(), 900);
    };

    const onPointerDown = (e) => {
      isMouseDown = true;
      if (e.pointerType === 'mouse') {
        createClickBurst(e.clientX, e.clientY);
      }
    };

    const onPointerUp = () => {
      isMouseDown = false;
    };

    // Spring loop
    const updateSpring = (now) => {
      const dt = Math.min(0.034, (now - lastTime) / 1000);
      lastTime = now;

      if (mouse.seen) {
        let targetX, targetY, targetW, targetH;

        if (hoveredTarget) {
          const rect = hoveredTarget.getBoundingClientRect();
          if (rect.width <= 340 && rect.height <= 180) {
            // Snug framing for buttons, tabs, links, and small cards
            targetW = rect.width + 12;
            targetH = rect.height + 12;
            targetX = rect.left - 6 + (mouse.x - (rect.left + rect.width / 2)) * 0.12;
            targetY = rect.top - 6 + (mouse.y - (rect.top + rect.height / 2)) * 0.12;
          } else {
            // Expanded focus frame for larger clickable cards
            const focusSize = isMouseDown ? 44 : 56;
            targetW = focusSize;
            targetH = focusSize;
            targetX = mouse.x - focusSize / 2;
            targetY = mouse.y - focusSize / 2;
          }
        } else {
          const baseSize = isMouseDown ? 22 : 32;
          targetW = baseSize;
          targetH = baseSize;
          targetX = mouse.x - baseSize / 2;
          targetY = mouse.y - baseSize / 2;
        }

        // Spring equations
        const k = stiffness; // 260
        const damping = 2 * Math.sqrt(k) * 0.88;

        const step = (pos, vel, target) => {
          const acc = k * (target - pos) - damping * vel;
          vel += acc * dt;
          return [pos + vel * dt, vel];
        };

        [spring.x, spring.vx] = step(spring.x, spring.vx, targetX);
        [spring.y, spring.vy] = step(spring.y, spring.vy, targetY);
        [spring.w, spring.vw] = step(spring.w, spring.vw, targetW);
        [spring.h, spring.vh] = step(spring.h, spring.vh, targetH);

        brackets.style.transform = `translate3d(${spring.x}px, ${spring.y}px, 0)`;
        brackets.style.width = `${Math.max(8, spring.w)}px`;
        brackets.style.height = `${Math.max(8, spring.h)}px`;

        const isHovering = !!hoveredTarget;
        cornerDivs.forEach((c) => {
          c.style.borderColor = isHovering ? color : shell;
        });

        // Center dot
        const dotSize = isTextInput ? 0 : isHovering ? size * 0.6 : isMouseDown ? size * 1.4 : size;
        dot.style.background = isHovering ? shell : color;
        dot.style.width = `${dotSize}px`;
        dot.style.height = `${dotSize}px`;
        dot.style.transform = `translate3d(${mouse.x - dotSize / 2}px, ${mouse.y - dotSize / 2}px, 0)`;

        brackets.style.opacity = isTextInput ? '0' : '1';
        dot.style.opacity = isTextInput ? '0' : '1';
      }

      rafId = requestAnimationFrame(updateSpring);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);

    rafId = requestAnimationFrame(updateSpring);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (styleTag && styleTag.parentNode) styleTag.parentNode.removeChild(styleTag);
      if (root && root.parentNode) root.parentNode.removeChild(root);
    };
  }, [color, shell, size, bracket, stiffness, burst, hideNative]);

  return null;
}
