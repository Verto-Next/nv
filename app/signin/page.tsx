'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-600 mt-2">Access your dashboard using your company credentials</p>
        </div>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
            {error === 'CredentialsSignin' 
              ? 'Invalid credentials' 
              : 'An error occurred during sign in'}
          </div>
        )}

        <button
          onClick={() => signIn('azure-ad', { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23">
            <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
            <path fill="#f35325" d="M1 1h10v10H1z"/>
            <path fill="#81bc06" d="M12 1h10v10H12z"/>
            <path fill="#05a6f0" d="M1 12h10v10H1z"/>
            <path fill="#ffba08" d="M12 12h10v10H12z"/>
          </svg>
          Sign in with Microsoft
        </button>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>You will be redirected to Microsoft's login page</p>
          <p className="mt-2">Please use your Active Directory credentials</p>
        </div>
      </div>
    </div>
  );
}