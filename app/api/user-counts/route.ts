import { getConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const connection = await getConnection();
    
    // Query to count occurrences of each username
    // Adjust the SQL based on your actual users table structure
    const [rows] = await connection.execute(`
      SELECT username, COUNT(*) as count 
      FROM users 
      GROUP BY username 
      ORDER BY count DESC
    `);
    
    await connection.end();
    
    return NextResponse.json({ data: rows });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user counts', details: error.message },
      { status: 500 }
    );
  }
}