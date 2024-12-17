import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://localhost:4500/api/v1/admin/deletejob/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      return NextResponse.json(
        { message: 'Job deleted successfully' },
        { status: 200 }
      );
    } else {
      // Handle non-200 statuses with a descriptive error
      const errorText = await response.text(); // Try to read the error message
      return NextResponse.json(
        { error: errorText || 'Failed to delete job' },
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