// app/api/send-email.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(req: NextRequest) {
  const { to, text } = await req.json();
  const subject = 'Welcome to Resend!';
  try {
    const response = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
