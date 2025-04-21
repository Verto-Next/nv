'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Modern Next.js App with</span>
              <span className="block text-blue-600 dark:text-blue-400">Azure AD Authentication</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Securely connect to your Active Directory and MySQL database using Next.js, TypeScript, and Tailwind CSS.
            </p>
            <div className="mt-8 flex justify-center">
              {status === 'authenticated' ? (
                <Link href="/dashboard" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/signin" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to get started
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              A complete solution for applications requiring secure authentication and database integration.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'Azure AD Authentication',
                  description: 'Secure your application with enterprise-grade Microsoft Active Directory authentication.',
                },
                {
                  title: 'MySQL Database',
                  description: 'Connect to your MySQL database to store and retrieve data with type safety.',
                },
                {
                  title: 'Next.js App Router',
                  description: 'Built with the latest Next.js App Router for optimal performance and SEO.',
                },
                {
                  title: 'Dark Mode Support',
                  description: 'Built-in dark mode toggle for better user experience and accessibility.',
                },
              ].map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-blue-200">Start building with our platform today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                {status === 'authenticated' ? (
                  <Link href="/dashboard" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link href="/signin" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
                    Get Started
                  </Link>
                )}
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link href="/api-test" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900">
                  Try API Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}