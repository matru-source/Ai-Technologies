import React, { useEffect, useState } from 'react';

/**
 * ScrollBackground provides subtle background atmospheric lighting
 * that activates as the user scrolls through the chapters, while keeping
 * the Hero section pure, crisp obsidian black matching the Framer site.
 */
export default function ScrollBackground() {
  const [scrollState, setScrollState] = useState({
    progress: 0,
    velocity: 0,
    activeChapter: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;
    let rafId = null;

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(0.01, (now - lastTime) / 1000);
      lastTime = now;

      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      velocity = Math.min(1, velocity * 0.85 + (deltaY / (dt * 2000)) * 0.15);

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));
      const chapter = Math.min(5, Math.floor(progress * 6));

      setScrollState({
        progress,
        velocity,
        activeChapter: chapter,
      });
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Atmospheric auras for subsequent chapters (Chapter 0 is crisp dark space)
  const chapterAuras = [
    // 0: Hero - Pure Deep Obsidian Space
    {
      primary: 'rgba(0, 0, 0, 0)',
      secondary: 'rgba(0, 0, 0, 0)',
      pos1: '50% 50%',
      pos2: '50% 50%',
      opacity: 0,
    },
    // 1: Digital Development - Electric Cyan / Lime split
    {
      primary: 'rgba(61, 243, 255, 0.08)',
      secondary: 'rgba(200, 255, 61, 0.06)',
      pos1: '80% 25%',
      pos2: '15% 70%',
      opacity: 0.8,
    },
    // 2: Services - Subtle Lime core spotlight
    {
      primary: 'rgba(200, 255, 61, 0.08)',
      secondary: 'rgba(157, 61, 255, 0.04)',
      pos1: '30% 50%',
      pos2: '70% 30%',
      opacity: 0.75,
    },
    // 3: AI Integration & Scope - Tech Violet / Lime nebula
    {
      primary: 'rgba(157, 61, 255, 0.08)',
      secondary: 'rgba(200, 255, 61, 0.07)',
      pos1: '60% 45%',
      pos2: '25% 65%',
      opacity: 0.8,
    },
    // 4: Business Apps & Process - Emerald Cyber glow
    {
      primary: 'rgba(200, 255, 61, 0.08)',
      secondary: 'rgba(61, 243, 255, 0.05)',
      pos1: '40% 60%',
      pos2: '80% 80%',
      opacity: 0.75,
    },
    // 5: Global Reach, FAQ & Contact - Global Azure & Terminal Beacon
    {
      primary: 'rgba(61, 243, 255, 0.09)',
      secondary: 'rgba(200, 255, 61, 0.11)',
      pos1: '50% 50%',
      pos2: '50% 88%',
      opacity: 0.85,
    },
  ];

  const currentAura = chapterAuras[scrollState.activeChapter] || chapterAuras[0];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      {/* Dynamic Radial Gradient Aura 1 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 800px at ${currentAura.pos1}, ${currentAura.primary}, transparent 70%)`,
          opacity: currentAura.opacity,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Dynamic Radial Gradient Aura 2 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 600px at ${currentAura.pos2}, ${currentAura.secondary}, transparent 75%)`,
          opacity: currentAura.opacity,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}
