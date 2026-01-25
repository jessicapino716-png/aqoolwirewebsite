import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";

const app = express();

// Known static frontend routes that should return 200
const KNOWN_STATIC_ROUTES = [
  '/',
  '/about',
  '/insights',
  '/aiinvestmentobservatory',
  '/policy',
  '/regulation',
  '/analysis',
  '/tools',
  '/newsletter',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/disclaimers',
  '/admin',
  '/admin/login',
  '/admin/dashboard',
  '/admin/newsletter',
  '/admin/external',
  '/admin/op-ed',
  '/admin/content',
  '/admin/tool-videos',
];

// Check if a route is a known valid route (for 404 handling)
async function isKnownRoute(url: string): Promise<boolean> {
  // Remove query string and hash
  const cleanUrl = url.split('?')[0].split('#')[0];
  
  // Check static routes
  if (KNOWN_STATIC_ROUTES.includes(cleanUrl)) {
    return true;
  }
  
  // Check dynamic article routes - verify the article actually exists
  const articleMatch = cleanUrl.match(/^\/article\/([^/]+)$/);
  if (articleMatch) {
    const slug = articleMatch[1];
    try {
      const content = await storage.getContentBySlug(slug);
      return content !== null && content !== undefined;
    } catch {
      return false;
    }
  }
  
  // Static assets, API routes, and special routes are handled elsewhere
  if (cleanUrl.startsWith('/assets/') || 
      cleanUrl.startsWith('/api/') || 
      cleanUrl.startsWith('/objects/') ||
      cleanUrl.startsWith('/@') ||  // Vite HMR
      cleanUrl.startsWith('/node_modules/') ||  // Vite modules
      cleanUrl.startsWith('/src/') ||  // Vite source files in dev
      cleanUrl === '/robots.txt' ||
      cleanUrl === '/sitemap.xml' ||
      cleanUrl.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|ts|tsx)$/)) {
    return true;
  }
  
  return false;
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Store 404 status in request for later use
  // This middleware marks unknown routes as 404 before Vite handles them
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    // Skip for API routes (handled separately), static assets, and special routes
    const cleanUrl = req.path.split('?')[0].split('#')[0];
    
    // Let API routes, static files, and special Vite routes pass through without checking
    if (cleanUrl.startsWith('/api/') || 
        cleanUrl.startsWith('/objects/') ||
        cleanUrl.startsWith('/assets/') ||
        cleanUrl.startsWith('/@') ||
        cleanUrl.startsWith('/node_modules/') ||
        cleanUrl.startsWith('/src/') ||
        cleanUrl === '/robots.txt' ||
        cleanUrl === '/sitemap.xml' ||
        cleanUrl.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|ts|tsx|html)$/)) {
      return next();
    }
    
    // Check if this is a known valid route
    const isValid = await isKnownRoute(cleanUrl);
    
    if (!isValid) {
      log(`404 Not Found: ${cleanUrl}`);
      // Store the 404 flag on the request object
      (req as any).is404 = true;
    }
    
    next();
  });

  // Override res.end to ensure 404 pages get proper status code
  // This runs after Vite sets its status, restoring the 404 if needed
  app.use((req: Request, res: Response, next: NextFunction) => {
    if ((req as any).is404) {
      const originalEnd = res.end.bind(res);
      (res as any).end = function(chunk?: any, encoding?: BufferEncoding | (() => void), cb?: () => void) {
        res.statusCode = 404;
        if (typeof encoding === 'function') {
          return originalEnd(chunk, encoding);
        }
        return originalEnd(chunk, encoding as BufferEncoding, cb);
      };
    }
    next();
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
