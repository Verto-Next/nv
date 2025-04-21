import React from 'react';
import TestUsersList from '@/components/TestUsersList';

export default function TestUsersPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>
        <p className="mb-6">This page tests if your MySQL database connection is working properly without AD authentication.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TestUsersList />
        </div>
      </div>
    </div>
  );
}