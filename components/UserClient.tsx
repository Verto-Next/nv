'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { User } from '@/types/data';
import Link from 'next/link';

interface UserClientProps {
  users: User[];
  error: string | null;
}

export default function UserClient({ users, error }: UserClientProps) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User List</h1>
        <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Back to Dashboard
        </Link>
      </div>
      
      {error ? (
        <div className="text-red-500 p-4 border border-red-300 bg-red-50 rounded">
          Error: {error}
        </div>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="overflow-x-auto border rounded shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b p-3 text-left">ID</th>
                <th className="border-b p-3 text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border-b p-3">{user.id}</td>
                  <td className="border-b p-3">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}