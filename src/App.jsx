import React, { useState, useEffect, Suspense, lazy } from 'react';
import BracketCursor from './components/BracketCursor';
import Fluxor3D from './components/Fluxor3D';
import ScrollBackground from './components/ScrollBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DigitalDevelopment from './components/DigitalDevelopment';
import AboutAgency from './components/AboutAgency';
import StackStrip from './components/StackStrip';
import Services from './components/Services';
import AiIntegration from './components/AiIntegration';
import ScopeExplorer from './components/ScopeExplorer';
import BusinessApps from './components/BusinessApps';
import CapabilitiesMatrix from './components/CapabilitiesMatrix';
import Process from './components/Process';
import FeatureCards from './components/FeatureCards';
import GlobalReach from './components/GlobalReach';
import SolutionGuides from './components/SolutionGuides';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loaded page components for bundle optimization & code splitting
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));

function PageLoadingFallback() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c8ff3d',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#c8ff3d',
            boxShadow: '0 0 8px #c8ff3d',
          }}
        />
        Loading...
      </span>
    </div>
  );
}

export default function App() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedScope, setSelectedScope] = useState(null);
  const [isDedicatedContactOpen, setIsDedicatedContactOpen] = useState(false);

  // Helper to determine active view based on current path and hash
  const resolveViewFromLocation = () => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const hash = window.location.hash;

    // Check for legal pages
    if (hash === '#privacy' || path === '/privacy') {
      return 'privacy';
    }
    if (hash === '#terms' || path === '/terms') {
      return 'terms';
    }

    // Check for services page route
    if (hash === '#services-page' || hash === '#services-view' || hash === '#features' || path === '/services') {
      return 'services';
    }

    // Check for explicit 404 or unrecognized path
    if (hash === '#404' || (path !== '/' && path !== '/index.html')) {
      return '404';
    }

    return 'home';
  };

  const [currentView, setCurrentView] = useState(resolveViewFromLocation);

  useEffect(() => {
    const handleRouteSync = () => {
      const nextView = resolveViewFromLocation();
      setCurrentView(nextView);
      if (nextView === 'services' || nextView === '404' || nextView === 'privacy' || nextView === 'terms') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleRouteSync);
    window.addEventListener('popstate', handleRouteSync);
    return () => {
      window.removeEventListener('hashchange', handleRouteSync);
      window.removeEventListener('popstate', handleRouteSync);
    };
  }, []);

  const handleNavigateServices = () => {
    setCurrentView('services');
    window.location.hash = '#services-page';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (targetAnchor) => {
    setCurrentView('home');
    if (
      window.location.hash.startsWith('#services') ||
      window.location.hash === '#404' ||
      window.location.hash === '#privacy' ||
      window.location.hash === '#terms' ||
      (window.location.pathname !== '/' && window.location.pathname !== '/index.html')
    ) {
      window.history.pushState(null, '', '/');
    }
    if (targetAnchor) {
      setTimeout(() => {
        const el = document.getElementById(targetAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyScope = (scopeData) => {
    setSelectedScope(scopeData);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    setIsDedicatedContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsDedicatedContactOpen(false);
  };

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* 1. Custom Bracket Cursor with Spring Physics */}
        <BracketCursor />

        {/* 2. Three.js 3D Emblem & Particle Swarm Background with WebGL Crash Protection */}
        <ErrorBoundary fallback={null}>
          <Fluxor3D />
        </ErrorBoundary>

        {/* 3. Reactive Scroll Background Lighting Shifts & Coordinate Grid */}
        <ScrollBackground />

        {/* 4. Top Sticky Navigation with Dynamic Dropdowns */}
        <Navbar
          onOpenContact={handleOpenContact}
          onNavigateServices={handleNavigateServices}
          onNavigateHome={handleNavigateHome}
          currentView={currentView}
        />

        {/* 5. Main Content: Services Page, Privacy Policy, Terms of Service, 404 Error Page, or Homepage Chapters */}
        {currentView === 'services' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <ServicesPage
              onOpenContact={handleOpenContact}
              onNavigateHome={handleNavigateHome}
            />
          </Suspense>
        ) : currentView === 'privacy' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <PrivacyPolicy onNavigateHome={handleNavigateHome} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Footer
                onOpenContact={handleOpenContact}
                onNavigateServices={handleNavigateServices}
                onNavigateHome={handleNavigateHome}
              />
            </div>
          </Suspense>
        ) : currentView === 'terms' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <TermsOfService onNavigateHome={handleNavigateHome} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Footer
                onOpenContact={handleOpenContact}
                onNavigateServices={handleNavigateServices}
                onNavigateHome={handleNavigateHome}
              />
            </div>
          </Suspense>
        ) : currentView === '404' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <NotFoundPage
              onNavigateHome={handleNavigateHome}
              onNavigateServices={handleNavigateServices}
              onOpenContact={handleOpenContact}
            />
          </Suspense>
        ) : (
          <>
            <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <Hero onOpenContact={handleOpenContact} />
              <DigitalDevelopment />
              <AboutAgency onOpenContact={handleOpenContact} />
              <StackStrip />
              <Services onSelectService={handleSelectService} />
              <AiIntegration />
              <ScopeExplorer onApplyScope={handleApplyScope} />
              <BusinessApps onSelectTopic={handleSelectService} />
              <CapabilitiesMatrix onOpenContact={handleOpenContact} />
              <Process />
              <FeatureCards onOpenContact={handleOpenContact} />
              <GlobalReach />
              <SolutionGuides />
              <FAQ />
              <ContactForm
                initialService={selectedService}
                initialScope={selectedScope}
              />
            </main>

            {/* 6. Footer */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Footer
                onOpenContact={handleOpenContact}
                onNavigateServices={handleNavigateServices}
                onNavigateHome={handleNavigateHome}
              />
            </div>
          </>
        )}

        {/* 7. Dedicated Contact Page Modal */}
        {isDedicatedContactOpen && (
          <ContactForm
            isDedicated={true}
            onCloseDedicated={handleCloseContact}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
