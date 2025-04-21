'use client';

import React, { useState, useEffect } from 'react';
import { SessionProvider } from "next-auth/react";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

export default function ClientProviders({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // We can still use dark mode for backgrounds, but text will stay black
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  if (!mounted) {
    return (
      <SessionProvider>
        <div style={{ visibility: 'hidden' }}>
          <Navbar />
          {children}
        </div>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <Navbar />
      <main className="bg-gray-50 dark:bg-gray-100 min-h-screen transition-colors duration-200">
        {children}
      </main>
    </SessionProvider>
  );
}