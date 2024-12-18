import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { jobid: string } }
) {
  try {
    const body = await request.json();
    const response = await fetch(`http://localhost:4500/api/v1/admin/editjob/${params.jobid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: 'Job updated successfully', job: data.job },
        { status: 200 }
      );
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to update job' },
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