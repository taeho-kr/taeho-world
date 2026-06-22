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
    <section id="about" className="py-24 border-t border-[#1f1f1f]">
      <Reveal>
        <p className="text-xs tracking-widest uppercase text-[#525252] mb-12">
          {t('About')}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <Reveal className="md:col-span-2">
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight tracking-tight mb-8">
            {t('about.headline')}
          </h2>
          <p className="text-[#a3a3a3] leading-relaxed mb-4">{t('about.paragraph1')}</p>
          <p className="text-[#a3a3a3] leading-relaxed">{t('about.paragraph2')}</p>
        </Reveal>

        <Reveal delay={120}>
          <dl className="md:border-l md:border-[#1f1f1f] md:pl-6 flex flex-col gap-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[#525252] text-xs tracking-widest uppercase mb-1">
                  {f.label}
                </dt>
                <dd className="text-sm text-[#d4d4d4] leading-relaxed">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
