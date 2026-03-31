/**
 * Unit tests for SoundVision Events notification systems
 * Tests: gmailNotification helper, notifyOwner wrapper, and component exports
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock fetch globally ────────────────────────────────────────────────────
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// ─── Mock ENV ───────────────────────────────────────────────────────────────
vi.mock("./_core/env", () => ({
  ENV: {
    forgeApiUrl: "https://mock-forge.example.com",
    forgeApiKey: "mock-api-key",
    appId: "test",
    cookieSecret: "test",
    databaseUrl: "test",
    oAuthServerUrl: "test",
    ownerOpenId: "test",
    isProduction: false,
  },
}));

import { sendGmailNotification } from "./_core/gmailNotification";

describe("sendGmailNotification", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("sends a POST request to the Forge email endpoint", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    const result = await sendGmailNotification({
      name: "Jan de Vries",
      email: "jan@example.com",
      phone: "+31612345678",
      eventType: "bruiloft",
      eventDate: "2025-08-15",
      location: "Groningen",
      packageType: "Elite",
      guestCount: "120",
      message: "Graag een offerte",
    });

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledOnce();

    const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/notification/email");
    expect(options.method).toBe("POST");

    const body = JSON.parse(options.body as string);
    expect(body.to).toBe("bertdb92@gmail.com");
    expect(body.subject).toContain("Jan de Vries");
    expect(body.subject).toContain("bruiloft");
    expect(body.text).toContain("Groningen");
    expect(body.text).toContain("Elite");
  });

  it("returns false when the API responds with an error status", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    const result = await sendGmailNotification({
      name: "Test",
      email: "test@example.com",
    });

    expect(result).toBe(false);
  });

  it("returns false when fetch throws an exception", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await sendGmailNotification({
      name: "Test",
      email: "test@example.com",
    });

    expect(result).toBe(false);
  });

  it("handles missing optional fields gracefully", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 });

    const result = await sendGmailNotification({
      name: "Minimaal",
      email: "min@example.com",
    });

    expect(result).toBe(true);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.text).toContain("Niet opgegeven");
  });
});
