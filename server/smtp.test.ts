/**
 * Test: Verify Zoho SMTP connection and email sending
 * This test validates that the SMTP credentials are correct and the connection works.
 */
import { describe, it, expect } from "vitest";
import { verifySmtpConnection } from "./_core/gmailNotification";

describe("SMTP Email Integration", () => {
  it("should successfully connect to Zoho SMTP server", async () => {
    const result = await verifySmtpConnection();
    expect(result).toBe(true);
  }, 15000); // 15 second timeout for network connection
});
