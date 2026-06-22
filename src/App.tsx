import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ExpertiseSection from './sections/ExpertiseSection';
import ContactSection from './sections/ContactSection';
import SideProjectsSection from './sections/SideProjectsSection';
import SiteNav from './sections/SiteNav';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] font-sans">
      <SiteNav />
      <main className="max-w-5xl mx-auto px-6 md:px-12">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SideProjectsSection />
        <ExpertiseSection />
        <ContactSection />
      </main>
      <footer className="border-t border-[#1f1f1f] py-8 mt-24">
        <p className="text-center text-[#525252] text-sm">© {new Date().getFullYear()} Taeho Kim</p>
      </footer>
    </div>
  );
}

export default App;
