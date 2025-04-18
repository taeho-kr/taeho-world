import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import kr from './kr';

i18n.use(initReactI18next).init({
	resources: {
		kr: kr,
		en: en,
	},
	lng: 'en',
	fallbackLng: 'en',
});
