import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Log the API key (first few characters) for debugging
    console.log('Using Resend API key:', process.env.RESEND_API_KEY?.substring(0, 5) + '...');
    
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    console.log('Received form data:', { name, email, subject });
    
    // Validate inputs
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Attempt to send email
    console.log('Attempting to send email...');
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use Resend's test sender during development
      to: ['tayfure@gmail.com'], // Replace with your email
      subject: `Contact Form: ${subject}`,
      reply_to: email,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    });
    
    console.log('Resend API response:', data);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending email', details: error.message },
      { status: 500 }
    );
  }
}