'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import DataTable from '@/components/DataTable';
import { DataItem } from '@/types/data';
import Link from 'next/link';

interface DashboardClientProps {
  data: DataItem[];
  error: string | null;
}

export default function DashboardClient({ data, error }: DashboardClientProps) {
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
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome, {session?.user?.name || session?.user?.email}</p>
      
      <div className="mb-6">
        <Link href="/myusers" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          View User List
        </Link>
      </div>
      
      <h2 className="text-2xl font-semibold mt-6 mb-3">Your Data</h2>
      
      {error ? (
        <div className="text-red-500 p-4 border border-red-300 bg-red-50 rounded">
          Error: {error}
        </div>
      ) : data.length === 0 ? (
        <p>No data found</p>
      ) : (
        <DataTable data={data} />
      )}
    </div>
  );
}