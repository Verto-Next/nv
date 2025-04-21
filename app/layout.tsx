import React from 'react';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

export const metadata = {
  title: 'Next.js with AD Auth',
  description: 'A Next.js application with Microsoft Active Directory authentication and MySQL',
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