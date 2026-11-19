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
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const AdminPage = lazy(() => import('./components/AdminPage'));
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

    // Check for projects page route
    if (
      hash === '#projects-page' ||
      hash === '#projects' ||
      hash === '#portfolio' ||
      path === '/projects' ||
      path === '/portfolio'
    ) {
      return 'projects';
    }

    // Check for admin page route
    if (
      hash === '#admin' ||
      hash === '#admin-page' ||
      hash === '#dashboard' ||
      path === '/admin' ||
      path === '/dashboard'
    ) {
      return 'admin';
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
      if (
        nextView === 'services' ||
        nextView === 'projects' ||
        nextView === 'admin' ||
        nextView === '404' ||
        nextView === 'privacy' ||
        nextView === 'terms'
      ) {
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

  const handleNavigateProjects = () => {
    setCurrentView('projects');
    window.location.hash = '#projects-page';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdmin = () => {
    setCurrentView('admin');
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (targetAnchor) => {
    setCurrentView('home');
    if (
      window.location.hash.startsWith('#services') ||
      window.location.hash.startsWith('#projects') ||
      window.location.hash.startsWith('#admin') ||
      window.location.hash === '#portfolio' ||
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

        {/* 2. Three.js 3D Emblem & Particle Swarm Background with WebGL Crash Protection (Disabled in Admin for clean interface) */}
        {currentView !== 'admin' && (
          <ErrorBoundary fallback={null}>
            <Fluxor3D />
          </ErrorBoundary>
        )}

        {/* 3. Reactive Scroll Background Lighting Shifts & Coordinate Grid (Disabled in Admin) */}
        {currentView !== 'admin' && <ScrollBackground />}

        {/* 4. Top Sticky Navigation with Dynamic Dropdowns */}
        <Navbar
          onOpenContact={handleOpenContact}
          onNavigateServices={handleNavigateServices}
          onNavigateProjects={handleNavigateProjects}
          onNavigateAdmin={handleNavigateAdmin}
          onNavigateHome={handleNavigateHome}
          currentView={currentView}
        />

        {/* 5. Main Content: Services Page, Projects Page, Admin Portal, Privacy Policy, Terms of Service, 404 Error Page, or Homepage Chapters */}
        {currentView === 'services' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <ServicesPage
              onOpenContact={handleOpenContact}
              onNavigateHome={handleNavigateHome}
              onNavigateProjects={handleNavigateProjects}
            />
          </Suspense>
        ) : currentView === 'projects' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <ProjectsPage
              onOpenContact={handleOpenContact}
              onNavigateHome={handleNavigateHome}
              onNavigateServices={handleNavigateServices}
            />
          </Suspense>
        ) : currentView === 'admin' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <AdminPage
              onNavigateHome={handleNavigateHome}
              onNavigateProjects={handleNavigateProjects}
              onNavigateServices={handleNavigateServices}
              onOpenContact={handleOpenContact}
            />
          </Suspense>
        ) : currentView === 'privacy' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <PrivacyPolicy onNavigateHome={handleNavigateHome} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Footer
                onOpenContact={handleOpenContact}
                onNavigateServices={handleNavigateServices}
                onNavigateProjects={handleNavigateProjects}
                onNavigateAdmin={handleNavigateAdmin}
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
                onNavigateProjects={handleNavigateProjects}
                onNavigateAdmin={handleNavigateAdmin}
                onNavigateHome={handleNavigateHome}
              />
            </div>
          </Suspense>
        ) : currentView === '404' ? (
          <Suspense fallback={<PageLoadingFallback />}>
            <NotFoundPage
              onNavigateHome={handleNavigateHome}
              onNavigateServices={handleNavigateServices}
              onNavigateProjects={handleNavigateProjects}
              onOpenContact={handleOpenContact}
            />
          </Suspense>
        ) : (
          <>
            <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <Hero
                onOpenContact={handleOpenContact}
                onNavigateProjects={handleNavigateProjects}
                onNavigateServices={handleNavigateServices}
              />
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
                onNavigateProjects={handleNavigateProjects}
                onNavigateAdmin={handleNavigateAdmin}
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
