import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`http://localhost:4500/api/v1/emp/addjob`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: body.fullName,
        work_email_address: body.workEmail,
        phone_number: body.phoneNumber,
        company_name: body.companyName,
        job_industry: body.jobIndustry,
        job_type: body.jobType,
        job_location: body.jobLocation,
        salary: body.salary,
        job_description: body.jobDescription,
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