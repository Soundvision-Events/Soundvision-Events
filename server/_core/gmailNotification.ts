/**
 * SoundVision Events — Gmail Notification Helper
 * Sends an email notification to the owner (bertdb92@gmail.com)
 * whenever a contact form is submitted.
 *
 * Uses the Manus built-in Forge API (no external SMTP credentials needed).
 * Falls back gracefully if the API is unavailable.
 */
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

export async function sendGmailNotification(data: ContactData): Promise<boolean> {
  try {
    const subject = `🎵 Nieuwe boeking: ${data.name} — ${data.eventType || "Evenement"}`;

    const body = `
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

    // Use Manus built-in notification API (email channel)
    const response = await fetch(`${ENV.forgeApiUrl}/notification/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        to: "bertdb92@gmail.com",
        subject,
        text: body,
      }),
    });

    if (!response.ok) {
      console.warn("[gmailNotification] Email API responded with", response.status);
      return false;
    }

    console.log("[gmailNotification] Email notification sent for", data.name);
    return true;
  } catch (err) {
    console.error("[gmailNotification] Failed to send email notification:", err);
    return false;
  }
}
