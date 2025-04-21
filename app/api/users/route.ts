import { getConnection } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET() {
  // Verify user is authenticated
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT id, name FROM users');
    await connection.end();
    
    return NextResponse.json({ users: rows });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}