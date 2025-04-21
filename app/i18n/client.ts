'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en'],
    defaultNS: 'common',
    fallbackNS: 'common',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/api/translations?locale={{lng}}&namespace={{ns}}',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;