const nodemailer = require('nodemailer');
const SibApiV3Sdk = require('@getbrevo/brevo');

class BrevoService {
  constructor() {
    // Initialize SMTP settings
    this.smtpTransport = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: process.env.BREVO_SMTP_PORT,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    // Initialize Brevo API
    this.apiKey = process.env.BREVO_API_KEY;
    this.brevoApi = new SibApiV3Sdk.TransactionalEmailsApi();
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = this.apiKey;

    // Default sender
    this.defaultSender = {
      email: process.env.FROM_EMAIL,
      name: process.env.FROM_NAME,
    };
  }

  /**
   * Send transaction email
   * Usage: await brevoService.sendEmail({...})
   */
  async sendEmail({ to, subject, html, text, from = this.defaultSender, attachments = [] }) {
    const mailOptions = {
      from: from.email,
      to,
      subject,
      html,
      text,
      attachments,
    };

    try {
      const info = await this.smtpTransport.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return { success: true, info };
    } catch (error) {
      console.error('SMTP Email Sending Error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send marketing email using Brevo API
   * Usage: await brevoService.sendMarketingEmail({...})
   */
  async sendMarketingEmail({ to, subject, htmlContent, textContent, sender = this.defaultSender }) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = to;
    sendSmtpEmail.sender = sender;
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent; 

    try {
      const data = await this.brevoApi.sendTransacEmail(sendSmtpEmail);
      console.log('Transactional email sent:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Brevo API Error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new BrevoService();

