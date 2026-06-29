import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

const AboutSection = () => {
  const { t } = useTranslation();

  const facts = [
    { label: t('about.nowLabel'), value: t('about.now') },
    { label: t('about.focusLabel'), value: t('about.focus') },
    { label: t('about.stackLabel'), value: t('about.stack') },
  ];

  return (
    <section id="about" aria-labelledby="about-t">
      <div className="sec-head">
        <h2 className="sec-title" id="about-t">
          <span className="ord">01</span> {t('About')}
        </h2>
        <div className="sec-meta">{t('ui.profileMeta')}</div>
      </div>

      <div className="sec-body">
        <div className="about-grid">
          <Reveal variant="up" className="about-main">
            <p className="about-head">{t('about.headline')}</p>
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <dl className="about-facts">
              {facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
