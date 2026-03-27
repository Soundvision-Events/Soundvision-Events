import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db functions
vi.mock("./db", () => ({
  createContactSubmission: vi.fn().mockResolvedValue(undefined),
  getContactSubmissions: vi.fn().mockResolvedValue([]),
  updateContactStatus: vi.fn().mockResolvedValue(undefined),
  createFileRecord: vi.fn().mockResolvedValue(undefined),
  getFiles: vi.fn().mockResolvedValue([]),
  deleteFileRecord: vi.fn().mockResolvedValue(undefined),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock storage
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://cdn.test/file.png" }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("accepts a valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Jan de Vries",
      email: "jan@example.nl",
      phone: "+31612345678",
      eventType: "Bruiloft",
      eventDate: "2026-06-15",
      location: "Groningen",
      packageType: "Medium",
      message: "Wij willen graag een DJ voor onze bruiloft.",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Test",
        email: "invalid-email",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "",
        email: "test@test.nl",
      })
    ).rejects.toThrow();
  });
});

describe("contact.list", () => {
  it("requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.contact.list()).rejects.toThrow();
  });

  it("returns submissions for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("files.list", () => {
  it("returns files without authentication (public)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.files.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("files.upload", () => {
  it("requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.files.upload({
        filename: "test.png",
        mimeType: "image/png",
        base64Data: "dGVzdA==",
        category: "gallery",
      })
    ).rejects.toThrow();
  });

  it("uploads file for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.files.upload({
      filename: "test.png",
      mimeType: "image/png",
      base64Data: "dGVzdA==",
      category: "gallery",
    });

    expect(result.url).toBeDefined();
    expect(result.fileKey).toBeDefined();
  });
});
