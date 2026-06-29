import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

const expertiseKeys = ['frontend', 'software', 'business', 'ux'] as const;

const ExpertiseSection = () => {
  const { t } = useTranslation();

  return (
    <section id="expertise" aria-labelledby="expertise-t">
      <div className="sec-head">
        <h2 className="sec-title" id="expertise-t">
          <span className="ord">06</span> {t('Expertise')}
        </h2>
        <div className="sec-meta tnum">
          {t('ui.domainsMeta', { n: String(expertiseKeys.length).padStart(2, '0') })}
        </div>
      </div>
      <Reveal variant="up">
        <div className="sec-body" style={{ padding: 0 }}>
          <div className="exp-grid">
            {expertiseKeys.map((key, i) => (
              <div key={key} className="exp-cell">
                <div className="exp-idx">E.0{i + 1}</div>
                <h3>{t(`expertise.${key}.title`)}</h3>
                <div className="exp-sub">{t(`expertise.${key}.subtitle`)}</div>
                <p>{t(`expertise.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default ExpertiseSection;
