import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:4500/api/v1/admin/alljobs', {
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
    try {
      const body = await request.json();
      
      const response = await fetch('http://localhost:4500/api/v1/admin/addjob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
  
      if (response.status === 201) {
        return NextResponse.json(
          { message: 'Job created successfully' },
          { status: 201 }
        );
      } else {
        // Handle non-201 statuses with a descriptive error
        const errorText = await response.text(); // Try to read the error message
        return NextResponse.json(
          { error: errorText || 'Failed to create job' },
          { status: response.status }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
}


