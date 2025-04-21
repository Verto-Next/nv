import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Connect to database
    const connection = await getConnection();
    
    // Get logs with pagination
    const [rows] = await connection.execute(
      `SELECT * FROM api_logs ORDER BY created_at DESC LIMIT ?`,
      [limit]
    );
    
    await connection.end();
    
    // Parse JSON fields
    const logs = (rows as any[]).map(row => ({
      ...row,
      request_data: typeof row.request_data === 'string' ? JSON.parse(row.request_data) : row.request_data,
      response_data: typeof row.response_data === 'string' ? JSON.parse(row.response_data) : row.response_data
    }));
    
    return NextResponse.json({ logs });
  } catch (error: any) {
    console.error('Error fetching API logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API logs', details: error.message },
      { status: 500 }
    );
  }
}