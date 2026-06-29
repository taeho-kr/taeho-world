import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

const itemKeys = ['intent', 'ease', 'transparency'] as const;

const ValuesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="values" aria-labelledby="values-t">
      <div className="sec-head">
        <h2 className="sec-title" id="values-t">
          <span className="ord">07</span> {t('values.label')}
        </h2>
        <div className="sec-meta">{t('ui.principles')}</div>
      </div>
      <Reveal variant="right">
        <div className="two-col">
          <div className="col">
            {itemKeys.map((key, i) => {
              const text = t(`values.items.${key}`);
              const at = text.indexOf(' — ');
              const lead = at >= 0 ? text.slice(0, at) : '';
              const body = at >= 0 ? text.slice(at + 3) : text;
              return (
                <div className="stmt" key={key}>
                  <span className="s-no">C.{i + 1}</span>
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

export default ValuesSection;
