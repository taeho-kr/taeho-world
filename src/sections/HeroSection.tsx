import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRobotScene } from '../hooks/useRobotScene';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  useRobotScene(containerRef);

  return (
    <section id="hero" className="min-h-screen flex items-center">
      {/* Left: text — always takes left half */}
      <div className="w-1/2 py-32 flex-shrink-0">
        <p className="text-[#525252] text-xs tracking-widest uppercase mb-6">Portfolio</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-none">
          Taeho<br />Kim
        </h1>
        <p className="text-lg md:text-xl text-[#525252] font-light">{t('header.subtitle')}</p>
      </div>

      {/* Right: robot canvas — always right half, never overlaps text */}
      <div
        ref={containerRef}
        className="w-1/2 flex-shrink-0"
        style={{ height: '100vh' }}
      />
    </section>
  );
};

export default HeroSection;
