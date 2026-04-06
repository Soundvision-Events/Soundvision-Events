import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Video proxy — serves CDN videos with correct Content-Type: video/mp4 and Range support.
  // Desktop browsers require Range/206 support and correct content-type to play video.
  app.get("/api/video-proxy", async (req, res) => {
    const allowed = [
      "hero-loop-new_3c2c71bc.mp4",
      "hero-loop-new_89edd0d5.mp4",
      "backdrop-v3-hd_d354f7b7.mp4",
    ];
    const file = req.query.file as string;
    if (!file || !allowed.includes(file)) {
      return res.status(400).send("Invalid video file");
    }
    const cdnBase = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/";
    const url = cdnBase + file;
    try {
      const rangeHeader = req.headers.range as string | undefined;
      const fetchHeaders: Record<string, string> = {};
      if (rangeHeader) fetchHeaders["Range"] = rangeHeader;

      const upstream = await fetch(url, { headers: fetchHeaders });
      const totalSize = upstream.headers.get("content-length");
      const contentRange = upstream.headers.get("content-range");
      const isPartial = upstream.status === 206 || (rangeHeader && upstream.status === 200);

      res.status(isPartial ? 206 : 200);
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Cache-Control", "public, max-age=86400");
      if (totalSize) res.setHeader("Content-Length", totalSize);
      if (contentRange) res.setHeader("Content-Range", contentRange);

      if (!upstream.body) return res.end();

      // Use Readable.fromWeb for proper Node.js stream piping
      const { Readable } = await import("stream");
      // @ts-ignore — fromWeb is available in Node 18+
      const nodeStream = Readable.fromWeb(upstream.body as any);
      nodeStream.pipe(res);
      nodeStream.on("error", () => { if (!res.writableEnded) res.end(); });
      req.on("close", () => { nodeStream.destroy(); });
    } catch (e) {
      console.error("[video-proxy] error:", e);
      if (!res.headersSent) res.status(502).send("Video proxy error");
    }
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
