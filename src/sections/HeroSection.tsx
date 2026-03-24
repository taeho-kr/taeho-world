import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRobotScene } from '../hooks/useRobotScene';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  useRobotScene(containerRef);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Text — left side, above canvas */}
      <div className="relative z-10 w-1/2 py-32 flex-shrink-0">
        <p className="text-[#525252] text-xs tracking-widest uppercase mb-6">Portfolio</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-none">
          Taeho<br />Kim
        </h1>
        <p className="text-lg md:text-xl text-[#525252] font-light">{t('header.subtitle')}</p>
        <p className="text-xs text-[#3a3a3a] font-light mt-1">{t('header.formerRole')}</p>
      </div>

      {/* Robot canvas — right side */}
      <div
        ref={containerRef}
        className="absolute inset-y-0 right-0 w-1/2 z-0"
      />
    </section>
  );
};

export default HeroSection;
