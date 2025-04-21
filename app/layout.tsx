import React from 'react';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'LyncFirm',
    template: '%s | LyncFirm',
  },
  description: 'A modern Next.js application with Microsoft Active Directory integration and MySQL database connectivity',
  keywords: ['Next.js', 'React', 'Active Directory', 'MySQL', 'Web Application'],
  authors: [{ name: 'Verto Next', url: 'https://www.vertonext.com' }],
  creator: 'Verto Next',
  publisher: 'Verto Next',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}