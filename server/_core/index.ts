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
  // Desktop browsers (Chrome/Edge/Firefox) require:
  //   1) Content-Type: video/mp4 (CDN returns application/octet-stream)
  //   2) Accept-Ranges: bytes header
  //   3) Proper 206 Partial Content response with Content-Range for Range requests
  // Strategy: buffer the full file on first request, cache in memory, slice for Range requests.
  const videoCache = new Map<string, Buffer>();
  app.get("/api/video-proxy", async (req, res) => {
    const allowed = [
      "hero-loop-new_3c2c71bc.mp4",
      "hero-loop-new_89edd0d5.mp4",
      "hero-loop-new_c8751ab6.mp4",
      "backdrop-v3-hd_d354f7b7.mp4",
    ];
    const file = req.query.file as string;
    if (!file || !allowed.includes(file)) {
      return res.status(400).send("Invalid video file");
    }
    const cdnBase = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/";
    const url = cdnBase + file;
    try {
      // Get or fetch the full video buffer (cached in memory)
      let buffer = videoCache.get(file);
      if (!buffer) {
        const resp = await fetch(url);
        if (!resp.ok) return res.status(502).send("Failed to fetch video from CDN");
        buffer = Buffer.from(await resp.arrayBuffer());
        videoCache.set(file, buffer);
      }
      const totalSize = buffer.length;

      // Common headers
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("Access-Control-Allow-Origin", "*");

      const rangeHeader = req.headers.range as string | undefined;
      if (rangeHeader) {
        const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
        if (!match) {
          res.status(416).setHeader("Content-Range", `bytes */${totalSize}`);
          return res.end();
        }
        const start = parseInt(match[1], 10);
        const end = match[2] ? Math.min(parseInt(match[2], 10), totalSize - 1) : totalSize - 1;
        const slice = buffer.subarray(start, end + 1);
        res.status(206);
        res.setHeader("Content-Range", `bytes ${start}-${end}/${totalSize}`);
        res.setHeader("Content-Length", String(slice.length));
        return res.end(slice);
      } else {
        res.status(200);
        res.setHeader("Content-Length", String(totalSize));
        return res.end(buffer);
      }
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
