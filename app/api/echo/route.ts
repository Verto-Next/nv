import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const text = searchParams.get('text') || 'No input provided';
  
  return NextResponse.json({ 
    input: text,
    timestamp: new Date().toISOString(),
    echo: `You said: ${text}`
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = body.text || 'No input provided';
    
    return NextResponse.json({ 
      input: text,
      timestamp: new Date().toISOString(),
      echo: `You said: ${text}`
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Invalid JSON body',
      message: 'Please provide a valid JSON body with a "text" field'
    }, { status: 400 });
  }
}