import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

const expertiseKeys = ['frontend', 'software', 'business', 'ux'] as const;

const ExpertiseSection = () => {
  const { t } = useTranslation();

  return (
    <section id="expertise" className="py-24 border-t border-[#1f1f1f]">
      <Reveal>
        <p className="text-xs tracking-widest uppercase text-[#525252] mb-12">
          {t('Expertise')}
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1f1f1f]">
        {expertiseKeys.map((key, i) => (
          <Reveal key={key} delay={(i % 2) * 80} className="bg-[#0a0a0a] h-full group">
            <div className="p-8 h-full transition-colors group-hover:bg-[#0d0d0d]">
              <p className="text-[#525252] text-xs tracking-widest uppercase mb-2">
                {t(`expertise.${key}.subtitle`)}
              </p>
              <h3 className="text-xl font-semibold mb-4">{t(`expertise.${key}.title`)}</h3>
              <p className="text-[#525252] text-sm leading-relaxed">
                {t(`expertise.${key}.description`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;
