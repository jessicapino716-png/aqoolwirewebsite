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

export async function sendNewsletterToAll(
  campaign: { title: string; subject: string; content: string; authorName: string },
  subscribers: { email: string }[]
): Promise<boolean> {
  try {
    console.log(`Sending newsletter "${campaign.title}" to ${subscribers.length} subscribers`);
    
    // Create newsletter HTML template
    const newsletterHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${campaign.subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
                  <h1 style="color: #2dd4bf; font-size: 32px; margin: 0;">The Aqool <span style="color: #ffd700;">(ai)</span></h1>
                  <p style="color: #666; margin: 10px 0 0 0;">AI Policy & Regulation News</p>
              </div>
              
              <div style="margin-bottom: 30px;">
                  <h1 style="color: #333; font-size: 28px; margin-bottom: 20px;">${campaign.title}</h1>
                  <div style="font-size: 16px; line-height: 1.8;">
                      ${campaign.content}
                  </div>
                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                      <p style="color: #666; font-style: italic; margin: 0;">
                          By ${campaign.authorName}
                      </p>
                  </div>
              </div>
              
              <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #666; font-size: 14px; margin: 0;">
                      Straight from Riyadh • AI Policy & Regulation News<br>
                      <a href="mailto:newsletter@aqoolai.com" style="color: #2dd4bf;">newsletter@aqoolai.com</a>
                  </p>
                  <p style="color: #999; font-size: 12px; margin-top: 15px;">
                      You're receiving this because you subscribed to The Aqool AI newsletter.<br>
                      <a href="#" style="color: #999;">Unsubscribe</a> | <a href="#" style="color: #999;">Update preferences</a>
                  </p>
              </div>
          </div>
      </body>
      </html>
    `;

    // Create plain text version
    const newsletterText = `
${campaign.title}

${campaign.content.replace(/<[^>]*>/g, '').trim()}

By ${campaign.authorName}

---
Straight from Riyadh • AI Policy & Regulation News
newsletter@aqoolai.com

You're receiving this because you subscribed to The Aqool AI newsletter.
    `;

    // Send to all subscribers
    const emailPromises = subscribers.map(subscriber => 
      sendEmail({
        to: subscriber.email,
        from: 'newsletter@aqoolai.com',
        subject: campaign.subject,
        text: newsletterText,
        html: newsletterHtml,
      })
    );

    // Wait for all emails to send
    const results = await Promise.allSettled(emailPromises);
    
    // Check if all emails were sent successfully
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;
    
    console.log(`Newsletter sending completed: ${successful} successful, ${failed} failed`);
    
    if (failed > 0) {
      console.warn(`${failed} emails failed to send`);
      // Log specific failures for debugging
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Failed to send to ${subscribers[index].email}:`, result.reason);
        }
      });
    }
    
    // Return true if at least 80% of emails were sent successfully
    return (successful / subscribers.length) >= 0.8;
    
  } catch (error) {
    console.error('Error sending newsletter to all subscribers:', error);
    return false;
  }
}