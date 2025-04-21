import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const { endpoint, method, requestData, responseData, statusCode, executionTimeMs } = await request.json();
    
    // Get the user session
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || null;
    
    // Connect to database
    const connection = await getConnection();
    
    // Insert log record
    const [result] = await connection.execute(
      `INSERT INTO api_logs 
       (endpoint, method, request_data, response_data, status_code, user_email, execution_time_ms) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        endpoint, 
        method, 
        JSON.stringify(requestData), 
        JSON.stringify(responseData), 
        statusCode,
        userEmail,
        executionTimeMs
      ]
    );
    
    await connection.end();
    
    return NextResponse.json({ success: true, logId: (result as any).insertId });
  } catch (error: any) {
    console.error('Error logging API call:', error);
    return NextResponse.json(
      { error: 'Failed to log API call', details: error.message },
      { status: 500 }
    );
  }
}