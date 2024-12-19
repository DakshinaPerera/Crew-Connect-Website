// route.ts
import { NextResponse } from 'next/server';

async function validateReCaptcha(token: string) {
    const secret = process.env.CAPTCHA_SECRET_KEY;
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score >= 0.5; // Adjust threshold as needed
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { recaptchaToken, ...formData } = body;

        // Validate reCAPTCHA
        const isValidReCaptcha = await validateReCaptcha(recaptchaToken);
        if (!isValidReCaptcha) {
            return NextResponse.json(
                { error: 'reCAPTCHA validation failed' },
                { status: 400 }
            );
        }

        const response = await fetch('http://localhost:4500/api/v1/c/sendcontact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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