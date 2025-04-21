import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', marginBottom: '40px' }}>
          {/* You can use an image here */}
          <div style={{ width: 200, height: 200, background: '#3b82f6', borderRadius: '50%' }}></div>
        </div>
        <div style={{ display: 'flex' }}>Your App Name</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}