'use client';

import React, { useState, useEffect } from 'react';
import { SessionProvider } from "next-auth/react";
import Navbar from './Navbar';
import Footer from './Footer';
import I18nProvider from '@/app/i18n/I18nProvider';

export default function ClientProviders({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SessionProvider>
        <div style={{ visibility: 'hidden' }}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <I18nProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="bg-gray-50 dark:bg-gray-800 flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </I18nProvider>
    </SessionProvider>
  );
}