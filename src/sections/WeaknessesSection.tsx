import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

const itemKeys = ['breadth', 'ai', 'coverage'] as const;

const WeaknessesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="honestly" aria-labelledby="honestly-t">
      <div className="sec-head">
        <h2 className="sec-title" id="honestly-t">
          <span className="ord">08</span> {t('weaknesses.label')}
        </h2>
        <div className="sec-meta">{t('ui.candid')}</div>
      </div>
      <Reveal variant="right">
        <div className="two-col">
          <div className="col honestly">
            {itemKeys.map((key, i) => {
              const text = t(`weaknesses.items.${key}`);
              const at = text.indexOf(' — ');
              const lead = at >= 0 ? text.slice(0, at) : '';
              const body = at >= 0 ? text.slice(at + 3) : text;
              return (
                <div className="stmt" key={key}>
                  <span className="s-no">H.{i + 1}</span>
                  <p>
                    {lead ? (
                      <>
                        <span className="lead">{lead}</span> — {body}
                      </>
                    ) : (
                      body
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default WeaknessesSection;
