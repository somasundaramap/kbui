import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('./locales/en.json')
    },
    es: {
      translations: require('./locales/es.json')
    },
    ta: {
      translations: require('./locales/ta.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en', 'es', 'ta'];

export default i18n;