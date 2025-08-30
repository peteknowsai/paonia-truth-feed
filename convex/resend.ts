import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendFeedbackEmail = action({
  args: {
    type: v.string(),
    message: v.string(),
    contactInfo: v.optional(v.string()),
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return { success: false, error: 'Email service not configured' };
    }
    
    const typeLabel = 
      args.type === 'feedback' ? 'Feedback' :
      args.type === 'question' ? 'Question' :
      'Story Idea';
    
    const emailHtml = `
      <div style="font-family: monospace; max-width: 600px;">
        <h2>New ${typeLabel} from Paonia Truth Nuggets</h2>
        
        <p><strong>From:</strong> ${args.username}</p>
        ${args.contactInfo ? `<p><strong>Contact:</strong> ${args.contactInfo}</p>` : ''}
        <p><strong>Type:</strong> ${typeLabel}</p>
        
        <hr style="border: 1px solid #ccc; margin: 20px 0;" />
        
        <div style="background: #f5f5f5; padding: 15px; white-space: pre-wrap;">
${args.message}
        </div>
      </div>
    `;
    
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Paonia Truth Nuggets <onboarding@resend.dev>',
          to: ['petefromsf@gmail.com'],
          subject: `[Paonia Truth] New ${typeLabel}: ${args.message.substring(0, 50)}...`,
          html: emailHtml,
          text: `New ${typeLabel} from ${args.username}\n\nContact: ${args.contactInfo || 'Not provided'}\n\nMessage:\n${args.message}`,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error('Resend error:', result);
        return { success: false, error: result.message || 'Failed to send email' };
      }
      
      return { success: true, emailId: result.id };
    } catch (error) {
      console.error('Failed to send email:', error);
      return { success: false, error: 'Failed to send email' };
    }
  },
});