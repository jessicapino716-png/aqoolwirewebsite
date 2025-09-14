// SendGrid integration based on javascript_sendgrid blueprint
import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string): Promise<boolean> {
  const welcomeEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to The Aqool AI Newsletter</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2dd4bf; font-size: 32px; margin: 0;">The Aqool <span style="color: #ffd700;">(ai)</span></h1>
                <p style="color: #666; margin: 10px 0 0 0;">AI Policy & Regulation News</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #333; margin-top: 0;">Welcome to our newsletter!</h2>
                <p>Thank you for subscribing to The Aqool AI newsletter. You'll now receive weekly insights on AI policy and regulation developments in Saudi Arabia and the GCC region.</p>
                
                <h3 style="color: #2dd4bf; margin-top: 25px;">What to expect:</h3>
                <ul style="padding-left: 20px;">
                    <li>Weekly analysis of AI policy developments</li>
                    <li>Regulatory updates from Saudi Arabia and the GCC</li>
                    <li>Expert insights on AI governance</li>
                    <li>Coverage of Vision 2030 AI initiatives</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px; margin: 0;">
                    Straight from Riyadh • AI Policy & Regulation News<br>
                    <a href="mailto:newsletter@aqoolai.com" style="color: #2dd4bf;">newsletter@aqoolai.com</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;

  const welcomeEmailText = `
Welcome to The Aqool AI Newsletter!

Thank you for subscribing to our newsletter. You'll now receive weekly insights on AI policy and regulation developments in Saudi Arabia and the GCC region.

What to expect:
• Weekly analysis of AI policy developments
• Regulatory updates from Saudi Arabia and the GCC  
• Expert insights on AI governance
• Coverage of Vision 2030 AI initiatives

---
Straight from Riyadh • AI Policy & Regulation News
newsletter@aqoolai.com
  `;

  return await sendEmail({
    to: email,
    from: 'newsletter@aqoolai.com', // You may need to verify this domain in SendGrid
    subject: 'Welcome to The Aqool AI Newsletter',
    text: welcomeEmailText,
    html: welcomeEmailHtml,
  });
}