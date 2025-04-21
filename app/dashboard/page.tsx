import React from 'react';
import { getConnection } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import DashboardClient from '@/components/DashboardClient';
import { DataItem } from '@/types/data';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/');
  }
  
  let data: DataItem[] = [];
  let error: string | null = null;
  
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM your_table_name');
    await connection.end();
    data = rows as DataItem[];
  } catch (err: any) {
    error = err.message;
    console.error('Database error:', err);
  }

  return <DashboardClient data={data} error={error} />;
}