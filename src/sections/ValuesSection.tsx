import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';

const itemKeys = ['intent', 'ease', 'transparency'] as const;

const ValuesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="values" className="py-24 border-t border-[#1f1f1f]">
      <Reveal>
        <p className="text-xs tracking-widest uppercase text-[#525252] mb-12">
          {t('values.label')}
        </p>
      </Reveal>
      <ul className="flex flex-col gap-5 max-w-2xl">
        {itemKeys.map((key, i) => (
          <Reveal key={key} delay={i * 80}>
            <li className="border-l border-[#1f1f1f] pl-5 text-[#a3a3a3] leading-relaxed">
              {t(`values.items.${key}`)}
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};

export default ValuesSection;
