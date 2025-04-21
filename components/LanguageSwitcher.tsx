'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
        aria-label="Change language"
      >
        {i18n.language === 'tr' ? (
          <span className="flex items-center">
            <img src="https://flagcdn.com/w20/tr.png" width="20" alt="Turkish flag" className="mr-1" />
            <span className="hidden md:inline-block">TR</span>
          </span>
        ) : (
          <span className="flex items-center">
            <img src="https://flagcdn.com/w20/gb.png" width="20" alt="UK flag" className="mr-1" />
            <span className="hidden md:inline-block">EN</span>
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => changeLanguage('tr')}
              className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                i18n.language === 'tr' ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              <img src="https://flagcdn.com/w20/tr.png" width="20" alt="Turkish flag" className="mr-2" />
              {t('languages.turkish')}
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                i18n.language === 'en' ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              <img src="https://flagcdn.com/w20/gb.png" width="20" alt="UK flag" className="mr-2" />
              {t('languages.english')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}