import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch('http://localhost:4500/api/v1/c/sendcontact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Backend API call failed');
        }

        const data = await response.text();
        return NextResponse.json({ message: data }, { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to send contact form' },
            { status: 500 }
        );
    }
}