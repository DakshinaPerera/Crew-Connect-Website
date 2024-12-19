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
    return data.success && data.score >= 0.5;
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
        
        const response = await fetch(`http://localhost:4500/api/v1/emp/addjob`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: formData.fullName,
                work_email_address: formData.workEmail,
                phone_number: formData.phoneNumber,
                company_name: formData.companyName,
                job_industry: formData.jobIndustry,
                job_type: formData.jobType,
                job_location: formData.jobLocation,
                salary: formData.salary,
                job_description: formData.jobDescription,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to post job');
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error posting job:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: error?.message || 'Failed to post job' 
            },
            { status: 500 }
        );
    }
}