import { useTranslation } from 'react-i18next';

const expertiseKeys = ['frontend', 'software', 'business', 'ux'] as const;

const ExpertiseSection = () => {
  const { t } = useTranslation();

  return (
    <section id="expertise" className="py-24 border-t border-[#1f1f1f]">
      <p className="text-xs tracking-widest uppercase text-[#525252] mb-12">
        {t('Expertise')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1f1f1f]">
        {expertiseKeys.map((key) => (
          <div key={key} className="bg-[#0a0a0a] p-8">
            <p className="text-[#525252] text-xs tracking-widest uppercase mb-2">
              {t(`expertise.${key}.subtitle`)}
            </p>
            <h3 className="text-xl font-semibold mb-4">{t(`expertise.${key}.title`)}</h3>
            <p className="text-[#525252] text-sm leading-relaxed">
              {t(`expertise.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;
