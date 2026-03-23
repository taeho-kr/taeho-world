import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
	const { i18n } = useTranslation();

	const toggleLanguage = () => {
		const newLang = i18n.language === 'en' ? 'ko' : 'en';
		i18n.changeLanguage(newLang);
	};

	return (
		<button
			onClick={toggleLanguage}
			className='flex items-center gap-2 px-3 py-2 rounded-md border border-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--background)] transition-colors cursor-pointer'
			title='Toggle Language'
		>
			<Globe className='w-4 h-4' />
			<span className='text-sm font-medium'>{i18n.language === 'en' ? 'KO' : 'EN'}</span>
		</button>
	);
};

export default LanguageSelector;
