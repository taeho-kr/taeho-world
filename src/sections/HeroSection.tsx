import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRobotScene } from '../hooks/useRobotScene';
import { projects } from '@/pages/CareerPage/data';

const HeroSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  useRobotScene(containerRef);

  return (
    <section id="hero" className="hero" aria-labelledby="hero-name">
      {/* Status strip */}
      <div className="hero-top">
        <span>{t('ui.hero.tag')}</span>
        <span className="live">
          <span className="dot" aria-hidden="true" />
          {t('ui.hero.status')}
        </span>
        <span className="tnum">REV 2026.06.29</span>
      </div>

      <div className="hero-grid">
        <div className="hero-left">
          <p className="hero-eyebrow">{t('ui.hero.eyebrow')}</p>

          {/* Name kept presentational; clip-reveal animation preserved */}
          <h1 className="hero-name opsz-masthead" id="hero-name">
            <span className="block overflow-hidden">
              <span className="hero-line hero-stagger-1">TAEHO</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line hero-stagger-2">KIM</span>
            </span>
          </h1>

          <p className="hero-role">
            <b>{t('header.subtitle')}</b> · {t('header.formerRole')}
          </p>

          {/* Spec grid */}
          <dl className="hero-spec">
            <div>
              <dt className="label">{t('ui.hero.discipline')}</dt>
              <dd>{t('ui.hero.fde')}</dd>
            </div>
            <div>
              <dt className="label">{t('ui.hero.domains')}</dt>
              <dd>{t('ui.hero.verticals', { n: 5 })}</dd>
            </div>
            <div>
              <dt className="label">{t('ui.hero.projects')}</dt>
              <dd className="tnum">
                {t('ui.hero.shipped', { n: String(projects.length).padStart(2, '0') })}
              </dd>
            </div>
          </dl>

          <div className="cta-row">
            <a className="btn btn--primary" href="#projects">
              {t('header.viewWork')}
              <span className="arr" aria-hidden="true">
                ↓
              </span>
            </a>
            <a className="btn btn--ghost" href="#contact">
              {t('header.getInTouch')}
              <span className="arr" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Robot canvas lives inside the framed dossier visual panel */}
        <div className="hero-visual">
          <div className="backlight" aria-hidden="true" />
          <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
