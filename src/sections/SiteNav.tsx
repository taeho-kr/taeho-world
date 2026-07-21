import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

/**
 * Ordinal index of the dossier sections. `id` MUST match the section's
 * DOM id (and the scroll-spy IntersectionObserver targets). The order
 * here is the visual order of the rail ticks, top → bottom.
 */
const RAIL_ITEMS = [
  { id: 'about', ord: '01', i18nKey: 'About' },
  { id: 'build-log', ord: '02', i18nKey: 'Build Log' },
  { id: 'projects', ord: '03', i18nKey: 'Projects' },
  { id: 'stack', ord: '04', i18nKey: 'projectPreview.techStack' },
  { id: 'side-projects', ord: '05', i18nKey: 'Side Projects' },
  { id: 'expertise', ord: '06', i18nKey: 'Expertise' },
  { id: 'values', ord: '07', i18nKey: 'values.label' },
  { id: 'honestly', ord: '08', i18nKey: 'weaknesses.label' },
  { id: 'contact', ord: '09', i18nKey: 'Contact' },
] as const;

const SiteNav = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ko') ? 'ko' : 'en';
  const [active, setActive] = useState<string>('about');

  const toggleLang = () => {
    i18n.changeLanguage(currentLang === 'ko' ? 'en' : 'ko');
  };

  // Scroll-spy: highlight the rail tick for the section in the viewport band.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const els = RAIL_ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="rail" aria-label="Section index">
      <div className="rail-logo">
        <a href="#hero" aria-label="Taeho Kim, back to top" className="text-[#fafafa]">
          <Logo className="h-[18px] w-auto" />
        </a>
      </div>

      <div className="rail-nav">
        {RAIL_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(active === item.id && 'active')}
            aria-current={active === item.id ? 'location' : undefined}
            aria-label={`${item.ord}. ${t(item.i18nKey)}`}
          >
            <span className="ord">{item.ord}</span>
            <span className="tick" aria-hidden="true" />
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleLang}
        className="rail-lang"
        aria-label={currentLang === 'ko' ? 'Switch to English' : 'Switch to Korean'}
      >
        {currentLang === 'ko' ? 'EN' : 'KO'}
      </button>
    </nav>
  );
};

export default SiteNav;
