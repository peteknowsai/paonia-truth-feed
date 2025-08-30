# Email Setup Instructions

To enable email notifications for feedback submissions:

## 1. Add your Resend API key to .env.local

Replace `YOUR_RESEND_API_KEY_HERE` in `.env.local` with your actual Resend API key.

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

## 2. Set the Convex environment variable

Run this command with your actual API key:

```bash
npx convex env set RESEND_API_KEY "re_xxxxxxxxxxxxx"
```

## 3. Configure Resend domain (if using custom domain)

In `convex/resend.ts`, update the `from` email address:
- Current: `feedback@paoniatruth.site`
- Change to your verified domain in Resend

## 4. Test the setup

1. Sign in to the website
2. Click "Questions or Feedback?" at the bottom
3. Submit a test message
4. Check your email at petefromsf@gmail.com

## Email Features

- Sends to: petefromsf@gmail.com
- Subject includes type (Feedback/Question/Story Idea)
- Shows username and optional contact info
- Full message in both HTML and plain text formats

## Troubleshooting

If emails aren't sending:
1. Check the Convex logs: `npx convex logs`
2. Verify API key is set: `npx convex env get RESEND_API_KEY`
3. Ensure domain is verified in Resend dashboard