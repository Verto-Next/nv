import { getConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT id, username FROM users');
    await connection.end();
    
    return NextResponse.json({ users: rows });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
  }
}