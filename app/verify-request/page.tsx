'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function VerifyRequest() {
  const { t, ready } = useTranslation('common');

  if (!ready) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Check your email</h1>
          <p className="mt-2 text-gray-600">
            A sign in link has been sent to your email address.
          </p>
          <p className="mt-1 text-gray-600">
            Please check your inbox and spam folder.
          </p>
        </div>
        
        <div className="mt-8">
          <Link href="/signin" className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}