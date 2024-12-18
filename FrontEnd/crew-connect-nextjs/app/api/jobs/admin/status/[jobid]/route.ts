import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { jobid: string } }  // Changed to lowercase 'jobid'
) {
  try {
     // Changed to lowercase
    const body = await request.json();
    const response = await fetch(`http://localhost:4500/api/v1/admin/status/${params.jobid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      return NextResponse.json(
        { message: 'Job status updated successfully' },
        { status: 200 }
      );
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to update job status' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error in PUT request:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}