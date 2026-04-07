/**
 * SoundVision Events — Email Notification Helper
 * Sends an email notification to the owner (bert_sv@icloud.com)
 * whenever a contact form is submitted.
 *
 * Uses Nodemailer with Zoho SMTP (info@soundvisionevents.nl).
 */
import nodemailer from "nodemailer";
import { ENV } from "./env";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  packageType?: string;
  guestCount?: string;
  message?: string;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: ENV.smtpHost,
    port: ENV.smtpPort,
    secure: ENV.smtpPort === 465, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: ENV.smtpUser,
      pass: ENV.smtpPass,
    },
  });
}

export async function sendGmailNotification(data: ContactData): Promise<boolean> {
  try {
    const subject = `🎵 Nieuwe boeking: ${data.name} — ${data.eventType || "Evenement"}`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #0a0a0f; color: #e0e0e0; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #12121a; border-radius: 12px; overflow: hidden; border: 1px solid #2a2a3a; }
    .header { background: linear-gradient(135deg, #1a0a2e, #0d1a3a); padding: 30px; text-align: center; }
    .header h1 { color: #00d4ff; font-size: 24px; margin: 0; letter-spacing: 2px; }
    .header p { color: #a0a0b0; margin: 8px 0 0; }
    .section { padding: 20px 30px; border-bottom: 1px solid #2a2a3a; }
    .section h2 { color: #00d4ff; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 15px; }
    .field { display: flex; margin-bottom: 10px; }
    .label { color: #8080a0; min-width: 120px; font-size: 13px; }
    .value { color: #e0e0e0; font-size: 13px; font-weight: bold; }
    .message-box { background: #0a0a14; border: 1px solid #2a2a3a; border-radius: 8px; padding: 15px; color: #c0c0d0; font-size: 13px; line-height: 1.6; }
    .footer { padding: 20px 30px; text-align: center; color: #606070; font-size: 12px; }
    .cta { display: inline-block; margin-top: 15px; padding: 10px 25px; background: linear-gradient(135deg, #00d4ff, #7b2fff); color: white; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎵 SOUNDVISION EVENTS</h1>
      <p>Nieuwe boekingsaanvraag ontvangen</p>
    </div>

    <div class="section">
      <h2>Contactgegevens</h2>
      <div class="field"><span class="label">Naam:</span><span class="value">${data.name}</span></div>
      <div class="field"><span class="label">E-mail:</span><span class="value"><a href="mailto:${data.email}" style="color:#00d4ff">${data.email}</a></span></div>
      <div class="field"><span class="label">Telefoon:</span><span class="value">${data.phone || "Niet opgegeven"}</span></div>
    </div>

    <div class="section">
      <h2>Evenement Details</h2>
      <div class="field"><span class="label">Type:</span><span class="value">${data.eventType || "Niet opgegeven"}</span></div>
      <div class="field"><span class="label">Datum:</span><span class="value">${data.eventDate || "Niet opgegeven"}</span></div>
      <div class="field"><span class="label">Locatie:</span><span class="value">${data.location || "Niet opgegeven"}</span></div>
      <div class="field"><span class="label">Pakket:</span><span class="value">${data.packageType || "Niet opgegeven"}</span></div>
      <div class="field"><span class="label">Gasten:</span><span class="value">${data.guestCount || "Niet opgegeven"}</span></div>
    </div>

    <div class="section">
      <h2>Bericht</h2>
      <div class="message-box">${data.message || "(geen bericht)"}</div>
    </div>

    <div class="footer">
      <p>Verzonden via <strong>soundvisionevents.nl</strong></p>
      <a href="mailto:${data.email}" class="cta">Direct Beantwoorden</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    const textBody = `
Nieuwe boekingsaanvraag via SoundVision Events

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACTGEGEVENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Naam:        ${data.name}
E-mail:      ${data.email}
Telefoon:    ${data.phone || "Niet opgegeven"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EVENEMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type:        ${data.eventType || "Niet opgegeven"}
Datum:       ${data.eventDate || "Niet opgegeven"}
Locatie:     ${data.location || "Niet opgegeven"}
Pakket:      ${data.packageType || "Niet opgegeven"}
Gasten:      ${data.guestCount || "Niet opgegeven"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BERICHT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.message || "(geen bericht)"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verzonden via SoundVision Events website
    `.trim();

    const transporter = createTransporter();

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"SoundVision Events" <${ENV.smtpUser}>`,
      to: ENV.smtpTo,
      replyTo: data.email,
      subject,
      text: textBody,
      html: htmlBody,
    };

    // Also send to CC address if configured (e.g. info@soundvisionevents.nl)
    if (ENV.smtpToCc && ENV.smtpToCc !== ENV.smtpTo) {
      mailOptions.cc = ENV.smtpToCc;
    }

    await transporter.sendMail(mailOptions);

    console.log("[emailNotification] Email sent to", ENV.smtpTo, "for booking from", data.name);
    return true;
  } catch (err) {
    console.error("[emailNotification] Failed to send email notification:", err);
    return false;
  }
}

export async function verifySmtpConnection(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("[emailNotification] SMTP connection verified successfully");
    return true;
  } catch (err) {
    console.error("[emailNotification] SMTP connection failed:", err);
    return false;
  }
}
