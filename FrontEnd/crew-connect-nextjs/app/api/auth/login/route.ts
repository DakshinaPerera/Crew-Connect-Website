import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Replace with your backend URL
    const backendUrl = 'http://localhost:4500/api/v1/auth/login';  // Adjust port as needed
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}