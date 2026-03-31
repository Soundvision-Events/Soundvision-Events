import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactSubmission, getContactSubmissions, updateContactStatus, createFileRecord, getFiles, deleteFileRecord } from "./db";
import { storagePut } from "./storage";
import { notifyOwner } from "./_core/notification";
import { sendGmailNotification } from "./_core/gmailNotification";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Contact Form ───
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Naam is verplicht"),
        email: z.string().email("Ongeldig e-mailadres"),
        phone: z.string().optional(),
        eventType: z.string().optional(),
        eventDate: z.string().optional(),
        location: z.string().optional(),
        packageType: z.string().optional(),
        guestCount: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createContactSubmission(input);
        // Notify owner of new booking request
        await notifyOwner({
          title: `Nieuwe boeking van ${input.name}`,
          content: `Type: ${input.eventType || "Niet opgegeven"}\nDatum: ${input.eventDate || "Niet opgegeven"}\nLocatie: ${input.location || "Niet opgegeven"}\nPakket: ${input.packageType || "Niet opgegeven"}\nE-mail: ${input.email}\nTelefoon: ${input.phone || "Niet opgegeven"}\nBericht: ${input.message || "-"}`,
        });
        // Also send Gmail email notification
        await sendGmailNotification(input);
        return { success: true };
      }),

    list: protectedProcedure.query(async () => {
      return getContactSubmissions();
    }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "in_progress", "confirmed", "completed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        await updateContactStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // ─── File Storage ───
  files: router({
    upload: protectedProcedure
      .input(z.object({
        filename: z.string(),
        mimeType: z.string(),
        base64Data: z.string(),
        category: z.string().optional(),
        caption: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const buffer = Buffer.from(input.base64Data, "base64");
        const suffix = nanoid(8);
        const ext = input.filename.split(".").pop() || "bin";
        const fileKey = `uploads/${ctx.user.id}/${suffix}.${ext}`;

        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        await createFileRecord({
          url,
          fileKey,
          filename: input.filename,
          mimeType: input.mimeType,
          size: buffer.length,
          category: input.category || "general",
          caption: input.caption || null,
          uploadedBy: ctx.user.id,
        });

        return { url, fileKey };
      }),

    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return getFiles(input?.category);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteFileRecord(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
