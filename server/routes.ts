import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContentSchema, updateContentSchema, updateContentWithoutTypeSchema } from "@shared/schema";
import { z } from "zod";

// Authentication middleware for admin routes
function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const adminToken = process.env.ADMIN_TOKEN;
  
  if (!adminToken) {
    console.error("ADMIN_TOKEN environment variable not set");
    return res.status(500).json({ error: "Server configuration error" });
  }
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authorization header with Bearer token required" });
  }
  
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  if (token !== adminToken) {
    return res.status(403).json({ error: "Invalid admin token" });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Content API Routes
  
  // Public routes for getting content
  app.get("/api/content", async (req, res) => {
    try {
      const { type, category, tag, limit, offset } = req.query;
      
      const filters = {
        type: type as string | undefined,
        category: category as string | undefined,
        tag: tag as string | undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      };
      
      const content = await storage.listContent(filters);
      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.get("/api/content/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const content = await storage.getContentBySlug(slug);
      
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  // Get latest weekly analysis for homepage hero
  app.get("/api/content/weekly-analysis/latest", async (req, res) => {
    try {
      const latestAnalysis = await storage.getLatestWeeklyAnalysis();
      
      if (!latestAnalysis) {
        return res.status(404).json({ error: "No weekly analysis found" });
      }
      
      res.json(latestAnalysis);
    } catch (error) {
      console.error("Error fetching latest weekly analysis:", error);
      res.status(500).json({ error: "Failed to fetch latest weekly analysis" });
    }
  });

  // Admin routes for content management
  app.post("/api/content", authenticateAdmin, async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContentSchema.parse(req.body);
      
      // Check if slug already exists
      const existingContent = await storage.getContentBySlug(validatedData.slug);
      if (existingContent) {
        return res.status(400).json({ error: "Content with this slug already exists" });
      }
      
      const newContent = await storage.createContent(validatedData);
      res.status(201).json(newContent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      console.error("Error creating content:", error);
      res.status(500).json({ error: "Failed to create content" });
    }
  });

  app.patch("/api/content/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      // First, fetch the existing record to understand current type
      const existingContent = await storage.getContentById(id);
      if (!existingContent) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      // Determine the effective type (existing type or new type if changing)
      const requestType = req.body.type;
      const effectiveType = requestType || existingContent.type;
      
      let validatedData: any;
      
      if (requestType) {
        // Type is being specified/changed - use full discriminated union validation
        try {
          validatedData = updateContentSchema.parse(req.body);
        } catch (parseError) {
          if (parseError instanceof z.ZodError) {
            return res.status(400).json({ 
              error: "Validation failed", 
              details: parseError.errors 
            });
          }
          throw parseError;
        }
        
        // Note: Forbidden fields will be handled after validation passes
      } else {
        // Type is not being changed - validate common fields only
        try {
          validatedData = updateContentWithoutTypeSchema.parse(req.body);
        } catch (parseError) {
          if (parseError instanceof z.ZodError) {
            return res.status(400).json({ 
              error: "Validation failed", 
              details: parseError.errors 
            });
          }
          throw parseError;
        }
        
        // Ensure no type-specific fields are being set for the wrong type
        if (existingContent.type === "external") {
          if ("body" in req.body) {
            return res.status(400).json({ 
              error: "Cannot set body field on external content. Change type to 'op-ed' first." 
            });
          }
        } else if (existingContent.type === "weekly-analysis") {
          if ("externalUrl" in req.body || "source" in req.body) {
            return res.status(400).json({ 
              error: "Cannot set externalUrl or source fields on weekly-analysis content. Change type to 'external' first." 
            });
          }
        }
      }
      
      // If slug is being updated, check it doesn't exist
      if (validatedData.slug) {
        const existingSlugContent = await storage.getContentBySlug(validatedData.slug);
        if (existingSlugContent && existingSlugContent.id !== id) {
          return res.status(400).json({ error: "Content with this slug already exists" });
        }
      }
      
      // If type is changing, validate that the final merged result has all required fields for the target type
      if (requestType && requestType !== existingContent.type) {
        // Create the final merged object to validate
        const finalContent = {
          ...existingContent,
          ...validatedData,
          type: requestType, // Ensure type is set for validation
        };
        
        // Remove fields that shouldn't be included in validation
        const { id, publishedAt, commentsCount, ...contentForValidation } = finalContent;
        
        // Remove forbidden fields entirely from validation object based on target type
        // (don't set to null - delete them completely so z.never() validation passes)
        if (requestType === "external") {
          delete contentForValidation.body;
        } else if (requestType === "weekly-analysis") {
          delete contentForValidation.externalUrl;
          delete contentForValidation.source;
        }
        
        // Validate against insertContentSchema to ensure all required fields are present
        try {
          insertContentSchema.parse(contentForValidation);
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            // Extract missing required fields for clearer error messages
            const missingFields = validationError.errors
              .filter(error => error.code === 'invalid_type' && error.received === 'undefined')
              .map(error => error.path.join('.'));
            
            if (missingFields.length > 0) {
              return res.status(400).json({
                error: `Type change to '${requestType}' requires the following fields: ${missingFields.join(', ')}`,
                details: validationError.errors
              });
            }
            
            return res.status(400).json({ 
              error: "Final content validation failed after type change", 
              details: validationError.errors 
            });
          }
          throw validationError;
        }
        
        // After validation passes, ensure forbidden fields are set to null for storage update
        if (requestType === "external") {
          validatedData.body = null;
        } else if (requestType === "weekly-analysis") {
          validatedData.externalUrl = null;
          validatedData.source = null;
        }
      }
      
      const updatedContent = await storage.updateContent(id, validatedData);
      
      if (!updatedContent) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      res.json(updatedContent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      console.error("Error updating content:", error);
      res.status(500).json({ error: "Failed to update content" });
    }
  });

  app.delete("/api/content/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteContent(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting content:", error);
      res.status(500).json({ error: "Failed to delete content" });
    }
  });

  app.post("/api/content/:id/publish", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { publishedAt } = req.body;
      
      // Validate publishedAt if provided
      let publishDate: Date | undefined;
      if (publishedAt) {
        if (typeof publishedAt !== 'string') {
          return res.status(400).json({ error: "publishedAt must be a valid ISO date string" });
        }
        
        publishDate = new Date(publishedAt);
        if (isNaN(publishDate.getTime())) {
          return res.status(400).json({ error: "publishedAt must be a valid ISO date string" });
        }
        
        // Validate that publishedAt is not in the future
        if (publishDate > new Date()) {
          return res.status(400).json({ error: "publishedAt cannot be in the future" });
        }
      }
      
      const publishedContent = await storage.publishContent(id, publishDate);
      
      if (!publishedContent) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      res.json(publishedContent);
    } catch (error) {
      console.error("Error publishing content:", error);
      res.status(500).json({ error: "Failed to publish content" });
    }
  });

  // Increment comments count
  app.post("/api/content/:id/comments", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updatedContent = await storage.incrementComments(id);
      
      if (!updatedContent) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      res.json(updatedContent);
    } catch (error) {
      console.error("Error incrementing comments:", error);
      res.status(500).json({ error: "Failed to increment comments" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
