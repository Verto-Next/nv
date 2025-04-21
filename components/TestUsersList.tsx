'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@/types/data';

export default function TestUsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/test-users');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading users data...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500 p-4 border border-red-300 bg-red-50 rounded">
          <h2 className="text-xl font-bold mb-2">Error Loading Users</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Users List</h1>
      
      {users.length === 0 ? (
        <p>No users found in the database</p>
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
                  <td className="border-b p-3">{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}