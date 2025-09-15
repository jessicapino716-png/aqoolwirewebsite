import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContentSchema, updateContentSchema, updateContentWithoutTypeSchema, insertNewsletterSubscriberSchema } from "@shared/schema";
// Note: SendGrid functions are imported dynamically to avoid startup crashes
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
        } else if (existingContent.type === "op-ed") {
          if ("externalUrl" in req.body || "source" in req.body) {
            return res.status(400).json({ 
              error: "Cannot set externalUrl or source fields on op-ed content. Change type to 'external' first." 
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
        } else if (requestType === "op-ed") {
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
        } else if (requestType === "op-ed") {
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

  // Newsletter subscription endpoint with ConvertKit and local storage fallback
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      const { email } = validatedData;
      
      // Check if subscriber already exists locally (normalize email)
      const normalizedEmail = email.toLowerCase();
      const existingSubscriber = await storage.getNewsletterSubscriberByEmail(normalizedEmail);
      if (existingSubscriber) {
        return res.status(409).json({ error: "Email is already subscribed" });
      }

      let convertKitSuccess = false;
      let convertKitResult = null;

      // Try ConvertKit first
      try {
        const { convertKit } = await import("./convertkit");
        convertKitResult = await convertKit.addSubscriber(normalizedEmail);
        if (convertKitResult) {
          console.log('Successfully added subscriber to ConvertKit');
          convertKitSuccess = true;
        }
      } catch (convertKitError: any) {
        console.log('ConvertKit failed, using local storage fallback:', convertKitError.message);
      }

      // Always store locally as backup/primary record
      const localSubscriber = await storage.createNewsletterSubscriber({
        email: normalizedEmail,
        subscribedAt: new Date(),
        isActive: 'true', // Use string to match database schema
        source: convertKitSuccess ? 'convertkit' : 'local',
        convertKitId: convertKitResult?.id?.toString() || null
      });

      console.log('Newsletter subscriber created:', localSubscriber);

      res.json({ 
        success: true, 
        message: "Successfully subscribed to newsletter",
        provider: convertKitSuccess ? 'convertkit' : 'local',
        backup: true,
        subscriber: { 
          id: localSubscriber.id,
          email: localSubscriber.email
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid email format",
          details: error.errors 
        });
      }
      
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });

  // Newsletter Campaigns API
  app.post("/api/newsletter/campaigns", authenticateAdmin, async (req, res) => {
    try {
      const { insertNewsletterCampaignSchema } = await import("@shared/schema");
      const validatedData = insertNewsletterCampaignSchema.parse(req.body);
      
      const campaign = await storage.createNewsletterCampaign(validatedData);
      
      res.json({ 
        success: true, 
        message: "Newsletter campaign created successfully",
        campaign 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed",
          details: error.errors 
        });
      }
      
      console.error("Error creating newsletter campaign:", error);
      res.status(500).json({ error: "Failed to create newsletter campaign" });
    }
  });

  app.get("/api/newsletter/campaigns", authenticateAdmin, async (req, res) => {
    try {
      const campaigns = await storage.getNewsletterCampaigns();
      res.json(campaigns);
    } catch (error) {
      console.error("Error fetching newsletter campaigns:", error);
      res.status(500).json({ error: "Failed to fetch newsletter campaigns" });
    }
  });

  app.get("/api/newsletter/campaigns/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const campaign = await storage.getNewsletterCampaignById(id);
      
      if (!campaign) {
        return res.status(404).json({ error: "Newsletter campaign not found" });
      }
      
      res.json(campaign);
    } catch (error) {
      console.error("Error fetching newsletter campaign:", error);
      res.status(500).json({ error: "Failed to fetch newsletter campaign" });
    }
  });

  app.patch("/api/newsletter/campaigns/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { updateNewsletterCampaignSchema } = await import("@shared/schema");
      const validatedData = updateNewsletterCampaignSchema.parse(req.body);
      
      const updatedCampaign = await storage.updateNewsletterCampaign(id, validatedData);
      
      if (!updatedCampaign) {
        return res.status(404).json({ error: "Newsletter campaign not found" });
      }
      
      res.json({ 
        success: true, 
        message: "Newsletter campaign updated successfully",
        campaign: updatedCampaign 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Validation failed",
          details: error.errors 
        });
      }
      
      console.error("Error updating newsletter campaign:", error);
      res.status(500).json({ error: "Failed to update newsletter campaign" });
    }
  });

  app.delete("/api/newsletter/campaigns/:id", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteNewsletterCampaign(id);
      
      if (!success) {
        return res.status(404).json({ error: "Newsletter campaign not found" });
      }
      
      res.json({ 
        success: true, 
        message: "Newsletter campaign deleted successfully" 
      });
    } catch (error) {
      console.error("Error deleting newsletter campaign:", error);
      res.status(500).json({ error: "Failed to delete newsletter campaign" });
    }
  });

  app.post("/api/newsletter/campaigns/:id/send", authenticateAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { sendNewsletterToAll } = await import("./sendgrid");
      
      // Get campaign
      const campaign = await storage.getNewsletterCampaignById(id);
      if (!campaign) {
        return res.status(404).json({ error: "Newsletter campaign not found" });
      }
      
      if (campaign.status === "sent") {
        return res.status(400).json({ error: "Campaign has already been sent" });
      }
      
      // Get all active subscribers
      const subscribers = await storage.getAllActiveSubscribers();
      
      if (subscribers.length === 0) {
        return res.status(400).json({ error: "No active subscribers found" });
      }
      
      // Send newsletter to all subscribers
      const success = await sendNewsletterToAll(campaign, subscribers);
      
      if (success) {
        // Mark campaign as sent
        const updatedCampaign = await storage.markCampaignAsSent(id, subscribers.length);
        res.json({ 
          success: true, 
          message: `Newsletter sent to ${subscribers.length} subscribers`,
          campaign: updatedCampaign,
          subscriberCount: subscribers.length
        });
      } else {
        res.status(500).json({ error: "Failed to send newsletter" });
      }
    } catch (error) {
      console.error("Error sending newsletter:", error);
      res.status(500).json({ error: "Failed to send newsletter campaign" });
    }
  });

  app.get("/api/newsletter/subscribers", authenticateAdmin, async (req, res) => {
    try {
      const { convertKit } = await import("./convertkit");
      const page = parseInt(req.query.page as string) || 1;
      
      // Try ConvertKit first
      try {
        const result = await convertKit.getSubscribers(page);
        res.json(result);
        return;
      } catch (convertKitError: any) {
        console.log("ConvertKit unavailable, falling back to local storage:", convertKitError.message);
      }
      
      // Fallback to local storage
      const localSubscribers = await storage.getNewsletterSubscribers();
      const pageSize = 25;
      const offset = (page - 1) * pageSize;
      const paginatedSubscribers = localSubscribers.slice(offset, offset + pageSize);
      
      res.json({
        subscribers: paginatedSubscribers.map(sub => ({
          id: parseInt(sub.id) || 0,
          email_address: sub.email,
          state: sub.isActive === 'true' ? 'active' : 'unsubscribed',
          created_at: sub.subscribedAt.toISOString(),
          source: sub.source || 'local'
        })),
        total: localSubscribers.length,
        page: page,
        total_pages: Math.ceil(localSubscribers.length / pageSize)
      });
    } catch (error) {
      console.error("Error fetching newsletter subscribers:", error);
      res.status(500).json({ error: "Failed to fetch newsletter subscribers" });
    }
  });

  app.get("/api/newsletter/subscribers/count", async (req, res) => {
    try {
      // For hybrid approach, always show local count as the authoritative source
      // since all subscribers are stored locally regardless of ConvertKit status
      const localSubscribers = await storage.getNewsletterSubscribers();
      console.log("Local subscribers count:", localSubscribers.length);
      res.json({ count: localSubscribers.length });
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
      res.status(500).json({ error: "Failed to fetch subscriber count" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Send email using SendGrid
      const sgMailModule = await import("@sendgrid/mail");
      const sgMail = sgMailModule.default;
      const apiKey = process.env.SENDGRID_API_KEY;
      
      if (!apiKey) {
        console.error("SendGrid API key not found");
        return res.status(500).json({ error: "Email service not configured" });
      }

      sgMail.setApiKey(apiKey);

      const msg = {
        to: 'jessicapino@aqoolai.com', // Send contact messages to Jessica
        from: 'jessicapino@aqoolai.com', // Use the same email as sender for now
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #2dd4bf; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <div style="background-color: #fff; padding: 15px; border-left: 4px solid #2dd4bf; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This message was sent through the contact form on The Aqool AI website.</p>
              <p>Reply directly to this email to respond to ${name}.</p>
            </div>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log('Contact form email sent successfully');

      res.json({ 
        success: true, 
        message: "Message sent successfully! We'll get back to you soon." 
      });

    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: "Failed to send message. Please try again." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
