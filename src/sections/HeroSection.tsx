import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';
import { useRobotScene } from '../hooks/useRobotScene';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  useRobotScene(containerRef);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Robot canvas — right half on desktop, full-bleed backdrop on mobile.
          pointer-events disabled on mobile so the canvas never hijacks scroll. */}
      <div
        ref={containerRef}
        className="absolute inset-y-0 right-0 w-full md:w-1/2 z-0 opacity-30 md:opacity-100 pointer-events-none md:pointer-events-auto"
      />
      {/* Legibility scrim over the canvas on mobile only */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent md:hidden" />

      {/* Text — full width on mobile, left half on desktop */}
      <div className="relative z-10 w-full md:w-1/2 py-32 animate-rise-in">
        <p className="text-[#525252] text-xs tracking-widest uppercase mb-6">Portfolio</p>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-none">
          Taeho<br />Kim
        </h1>
        <p className="text-lg md:text-xl text-[#a3a3a3] font-light">{t('header.subtitle')}</p>
        <p className="text-xs text-[#525252] font-light mt-1">{t('header.formerRole')}</p>

        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-sm bg-[#fafafa] text-[#0a0a0a] px-5 py-2.5 rounded-sm font-medium hover:bg-[#e5e5e5] transition-colors"
          >
            {t('header.viewWork')}
            <ArrowDown size={14} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm border border-[#2a2a2a] text-[#fafafa] px-5 py-2.5 rounded-sm hover:border-[#444444] transition-colors"
          >
            {t('header.getInTouch')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
