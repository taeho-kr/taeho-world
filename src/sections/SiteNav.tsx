import { useTranslation } from 'react-i18next';

const SiteNav = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('ko') ? 'ko' : 'en';

  const toggleLang = () => {
    i18n.changeLanguage(currentLang === 'ko' ? 'en' : 'ko');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#1f1f1f]">
      <div className="max-w-5xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-widest">TK</span>
        <div className="flex items-center gap-4 sm:gap-6 text-sm text-[#525252]">
          <a href="#about" className="hidden sm:inline-block hover:text-[#fafafa] transition-colors">
            {t('About')}
          </a>
          <a href="#projects" className="hover:text-[#fafafa] transition-colors">
            {t('Projects')}
          </a>
          <a href="#expertise" className="hidden sm:inline-block hover:text-[#fafafa] transition-colors">
            {t('Expertise')}
          </a>
          <a href="#contact" className="hover:text-[#fafafa] transition-colors">
            {t('Contact')}
          </a>
          <button
            onClick={toggleLang}
            className="text-xs tracking-widest border border-[#2a2a2a] px-2.5 py-1 rounded-sm hover:border-[#444444] hover:text-[#fafafa] transition-colors"
          >
            {currentLang === 'ko' ? 'EN' : 'KO'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
