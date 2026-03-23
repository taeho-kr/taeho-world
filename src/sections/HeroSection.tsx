import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRobotScene } from '../hooks/useRobotScene';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  useRobotScene(containerRef);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Robot canvas — right side on desktop, full bg on mobile */}
      <div
        ref={containerRef}
        className="absolute right-0 top-0 h-full w-full md:w-1/2 z-0 opacity-95"
      />
      {/* Text — left side */}
      <div className="relative z-10 max-w-lg py-32">
        <p className="text-[#525252] text-xs tracking-widest uppercase mb-6">Portfolio</p>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-4 leading-none">
          Taeho<br/>Kim
        </h1>
        <p className="text-xl text-[#525252] font-light">{t('header.subtitle')}</p>
      </div>
    </section>
  );
};

export default HeroSection;
