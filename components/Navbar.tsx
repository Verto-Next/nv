'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                NextAuth App
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <Link href="/" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/') 
                    ? 'bg-gray-100 text-black font-bold' 
                    : 'text-gray-800 hover:bg-gray-50'
                }`}>
                Home
              </Link>
              
              {status === 'authenticated' && (
                <>
                  <Link href="/dashboard" 
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      isActive('/dashboard') 
                        ? 'bg-gray-100 text-black font-bold' 
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}>
                    Dashboard
                  </Link>
                  <Link href="/myusers" 
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      isActive('/myusers') 
                        ? 'bg-gray-100 text-black font-bold' 
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}>
                    Users
                  </Link>
                </>
              )}
              
              <Link href="/test-users" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/test-users') 
                    ? 'bg-gray-100 text-black font-bold' 
                    : 'text-gray-800 hover:bg-gray-50'
                }`}>
                Test DB
              </Link>
              
              <Link href="/api-test" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/api-test') 
                    ? 'bg-gray-100 text-black font-bold' 
                    : 'text-gray-800 hover:bg-gray-50'
                }`}>
                API Test
              </Link>

              <Link href="/contact" 
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/contac') 
                    ? 'bg-gray-100 text-black font-bold' 
                    : 'text-gray-800 hover:bg-gray-50'
                }`}>
                Contact
              </Link>              
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {/* Dark mode toggle - positioned to the left of sign in/out */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {status === 'loading' ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : status === 'authenticated' ? (
              <button
                onClick={() => signOut()}
                className="px-3 py-2 rounded-md text-sm font-medium text-black bg-gray-100 hover:bg-gray-200"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => signIn('azure-ad')}
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign in
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            {/* Dark mode toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 mr-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-800 hover:bg-gray-100"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" 
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/') 
                  ? 'bg-gray-100 text-black font-bold' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            
            {status === 'authenticated' && (
              <>
                <Link href="/dashboard" 
                  className={`block px-3 py-2 text-base font-medium ${
                    isActive('/dashboard') 
                      ? 'bg-gray-100 text-black font-bold' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/myusers" 
                  className={`block px-3 py-2 text-base font-medium ${
                    isActive('/myusers') 
                      ? 'bg-gray-100 text-black font-bold' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}>
                  Users
                </Link>
              </>
            )}
            
            <Link href="/test-users" 
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/test-users') 
                  ? 'bg-gray-100 text-black font-bold' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}>
              Test DB
            </Link>
            
            <Link href="/api-test" 
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/api-test') 
                  ? 'bg-gray-100 text-black font-bold' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}>
              API Test
            </Link>

            <Link href="/contact" 
              className={`block px-3 py-2 text-base font-medium ${
                isActive('/contact') 
                  ? 'bg-gray-100 text-black font-bold' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>            
            
            {status === 'authenticated' ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-black bg-gray-100 hover:bg-gray-200"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => {
                  signIn('azure-ad');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}