import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendAccessEmailParams {
  email: string;
  accessLink: string;
}

/**
 * Sends an email with the secure access link to the user.
 * 
 * @param params Object containing email and accessLink
 * @returns Result of the email sending operation
 */
export async function sendAccessEmail({ email, accessLink }: SendAccessEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not defined');
  }

  const fromEmail = process.env.NODE_ENV === 'development' 
    ? 'onboarding@resend.dev' 
    : 'Casp Education <noreply@centerarabic.com>'; // Using the domain from layout metadata

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your Secure PDF Access Link - Casp Education',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1a1a1a; text-align: center;">Your Book Access</h2>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5;">
            You requested access to a private book. Click the button below to view it securely.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${accessLink}" style="background-color: #D4AF37; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
              Access Book
            </a>
          </div>
          <p style="color: #666; font-size: 14px; text-align: center;">
            <strong>Note:</strong> This link is private and will expire in 24 hours.
          </p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
