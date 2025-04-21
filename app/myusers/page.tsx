import React from 'react';
import { getConnection } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import UserClient from '@/components/UserClient';
import { User } from '@/types/data';

export default async function MyUsersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/');
  }
  
  let users: User[] = [];
  let error: string | null = null;
  
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT id, name FROM users');
    await connection.end();
    users = rows as User[];
  } catch (err: any) {
    error = err.message;
    console.error('Database error:', err);
  }

  return <UserClient users={users} error={error} />;
}