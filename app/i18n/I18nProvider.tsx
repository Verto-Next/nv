'use client';

import { ReactNode, useEffect } from 'react';
import i18next from './client';
import { I18nextProvider } from 'react-i18next';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Optional: Initialize with saved language from localStorage
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && ['tr', 'en'].includes(savedLanguage)) {
      i18next.changeLanguage(savedLanguage);
    }
  }, []);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}