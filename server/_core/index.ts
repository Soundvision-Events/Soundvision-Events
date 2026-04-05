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
  // Video proxy — serves CDN videos with correct Content-Type: video/mp4
  // Needed because the CDN returns application/octet-stream which browsers refuse to play
  app.get("/api/video-proxy", async (req, res) => {
    const allowed = [
      "hero-loop-new_3c2c71bc.mp4",
      "backdrop-v3-hd_d354f7b7.mp4",
    ];
    const file = req.query.file as string;
    if (!file || !allowed.includes(file)) {
      return res.status(400).send("Invalid video file");
    }
    const cdnBase = "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/";
    const url = cdnBase + file;
    try {
      const upstream = await fetch(url, {
        headers: req.headers.range ? { Range: req.headers.range as string } : {},
      });
      const contentLength = upstream.headers.get("content-length");
      const status = upstream.status === 206 ? 206 : 200;
      res.status(status);
      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Accept-Ranges", "bytes");
      if (contentLength) res.setHeader("Content-Length", contentLength);
      if (upstream.headers.get("content-range")) {
        res.setHeader("Content-Range", upstream.headers.get("content-range")!);
      }
      res.setHeader("Cache-Control", "public, max-age=86400");
      if (!upstream.body) return res.end();
      const reader = upstream.body.getReader();
      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) { res.end(); return; }
        res.write(Buffer.from(value));
        pump();
      };
      pump();
    } catch (e) {
      res.status(502).send("Video proxy error");
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
