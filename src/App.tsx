import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import BuildLogSection from './sections/BuildLogSection';
import ProjectsSection from './sections/ProjectsSection';
import StackSection from './sections/StackSection';
import SideProjectsSection from './sections/SideProjectsSection';
import ExpertiseSection from './sections/ExpertiseSection';
import ValuesSection from './sections/ValuesSection';
import WeaknessesSection from './sections/WeaknessesSection';
import ContactSection from './sections/ContactSection';
import SiteNav from './sections/SiteNav';

function App() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ko') ? 'ko' : 'en';
  const year = new Date().getFullYear();

  // Keep the document language in sync with the active locale (a11y / SEO).
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  return (
    <>
      {/* fixed dot overlay on top of the hairline grid painted on <body> */}
      <div className="dossier-dotgrid" aria-hidden="true" />

      <a
        href="#about"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-2 focus-visible:top-2 focus-visible:z-[200] focus-visible:bg-white focus-visible:px-3.5 focus-visible:py-2 focus-visible:text-[#000] focus-visible:font-[var(--mono)]"
      >
        {t('ui.skip')}
      </a>

      <div className="shell">
        {/* ===== LEFT RAIL (SiteNav) ===== */}
        <SiteNav />

        {/* ===== MAIN ===== */}
        <main className="main">
          <HeroSection />
          <AboutSection />
          <BuildLogSection />
          <ProjectsSection />
          <StackSection />
          <SideProjectsSection />
          <ExpertiseSection />
          <ValuesSection />
          <WeaknessesSection />
          <ContactSection />

          <footer className="foot">
            <span>© {year} Taeho Kim</span>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
