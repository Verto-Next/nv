import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function GET(request: Request) {
  // Get locale and namespace from query parameters
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'tr';
  const namespace = searchParams.get('namespace') || 'common';
  
  try {
    const connection = await getConnection();
    
    // Fetch translations for the specified locale and namespace
    const [rows] = await connection.execute(
      'SELECT key_path, value FROM translations WHERE locale = ? AND namespace = ?',
      [locale, namespace]
    );
    
    await connection.end();
    
    // Transform flat array into nested structure
    const translations = (rows as any[]).reduce((result, item) => {
      // Split key_path (e.g., 'navbar.home') into parts
      const parts = item.key_path.split('.');
      let current = result;
      
      // Build nested object structure
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      // Set the value at the final key
      current[parts[parts.length - 1]] = item.value;
      
      return result;
    }, {});
    
    return NextResponse.json(translations);
  } catch (error: any) {
    console.error('Error fetching translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translations', details: error.message },
      { status: 500 }
    );
  }
}