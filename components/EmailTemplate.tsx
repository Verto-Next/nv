import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    <h2 style={{ color: '#3b82f6' }}>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <div>
      <p><strong>Message:</strong></p>
      <p style={{ 
        backgroundColor: '#f9fafb', 
        padding: '15px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap'
      }}>
        {message}
      </p>
    </div>
    <div style={{ marginTop: '30px', fontSize: '12px', color: '#6b7280' }}>
      <p>This email was sent from your website contact form.</p>
    </div>
  </div>
);