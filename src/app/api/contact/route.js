import { NextResponse } from 'next/server';
import { sendMail } from '@/utils/mailer';

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'pawan@exceltechnologies.in';

export async function POST(req) {
  try {
    const { name, email, phone, message, hp_field } = await req.json();
    if (hp_field) {
      return NextResponse.json({ error: 'Spam detected.' }, { status: 400 });
    }
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    // Basic email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    // Compose email
    const html = `
      <h2>Appointment Form Submission</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b><br/>${message ? message.replace(/\n/g, '<br/>') : ''}</p>
    `;
    await sendMail({
      to: RECIPIENT_EMAIL,
      subject: 'Appointment Form Submission',
      html,
    });
    return NextResponse.json({ message: 'Message sent successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
} 