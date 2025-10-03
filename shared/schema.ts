import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const content = pgTable("content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // "external" | "article" | "op-ed"
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  body: text("body"), // nullable - only for internal content (op-eds)
  source: text("source"), // nullable - only for external articles (e.g., "Wall Street Journal")
  externalUrl: text("external_url"), // nullable - only for external articles
  authorName: text("author_name").notNull(),
  authorId: varchar("author_id").references(() => users.id), // nullable - link to user who created it
  category: text("category").notNull(),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  commentsCount: integer("comments_count").notNull().default(0),
  isPopular: boolean("is_popular").notNull().default(false),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
  isActive: text("is_active").notNull().default("true"), // "true" | "false" for unsubscribed
  source: text("source").notNull().default("local"), // "convertkit" | "local"
  convertKitId: text("convertkit_id"), // ConvertKit subscriber ID
});

export const newsletterCampaigns = pgTable("newsletter_campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(), // HTML content
  status: text("status").notNull().default("draft"), // "draft" | "sent"
  createdAt: timestamp("created_at").notNull().defaultNow(),
  sentAt: timestamp("sent_at"),
  subscriberCount: integer("subscriber_count").default(0), // Number of subscribers when sent
  authorName: text("author_name").notNull(),
});

export const toolVideos = pgTable("tool_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  youtubeUrl: text("youtube_url").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Content type enum for validation
export const contentTypeEnum = z.enum(["external", "op-ed"]);

// Base content schema without type-specific validation
const baseContentSchema = createInsertSchema(content).omit({
  id: true,
  publishedAt: true,
  commentsCount: true,
  type: true, // We'll handle this with discriminated union
});

// Discriminated union for content types with proper validation
export const insertContentSchema = z.discriminatedUnion("type", [
  // External content type
  z.object({
    type: z.literal("external"),
    externalUrl: z.string().url("Must be a valid URL"),
    source: z.string().min(1, "Source is required for external content"),
    body: z.never().optional(), // Not allowed for external content
  }).merge(baseContentSchema.omit({ externalUrl: true, source: true, body: true })),
  
  // Op-ed content type - can have EITHER body OR externalUrl
  z.object({
    type: z.literal("op-ed"),
    body: z.string().optional(),
    externalUrl: z.string().url().optional(),
    source: z.string().optional(), // Optional source for external op-eds
  }).merge(baseContentSchema.omit({ externalUrl: true, source: true, body: true })),
]).superRefine((data, ctx) => {
  // For op-eds, ensure at least one of body or externalUrl is provided
  if (data.type === "op-ed" && !data.body && !data.externalUrl) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either content body or external URL must be provided",
      path: ["body"],
    });
  }
});

// Update schema for PATCH operations - discriminated union of partials only
export const updateContentSchema = z.discriminatedUnion("type", [
  // External content type partial
  z.object({
    type: z.literal("external"),
    externalUrl: z.string().url("Must be a valid URL").optional(),
    source: z.string().min(1, "Source is required for external content").optional(),
    body: z.never().optional(), // Not allowed for external content
  }).merge(baseContentSchema.omit({ externalUrl: true, source: true, body: true }).partial()),
  
  // Op-ed content type partial - can have EITHER body OR externalUrl
  z.object({
    type: z.literal("op-ed"),
    body: z.string().optional(),
    externalUrl: z.string().url().optional(),
    source: z.string().optional(), // Optional source for external op-eds
  }).merge(baseContentSchema.omit({ externalUrl: true, source: true, body: true }).partial()),
]);

// Schema for updates without type specification (common fields only)
export const updateContentWithoutTypeSchema = baseContentSchema.omit({ 
  externalUrl: true, 
  source: true, 
  body: true 
}).partial();

// Newsletter subscriber schema  
export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).pick({
  email: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
});

// Newsletter campaign schema
export const insertNewsletterCampaignSchema = createInsertSchema(newsletterCampaigns).omit({
  id: true,
  createdAt: true,
  sentAt: true,
  subscriberCount: true,
});

export const updateNewsletterCampaignSchema = insertNewsletterCampaignSchema.partial();

// Tool video schema
export const insertToolVideoSchema = createInsertSchema(toolVideos).omit({
  id: true,
  createdAt: true,
}).extend({
  youtubeUrl: z.string().url("Must be a valid YouTube URL"),
});

export const updateToolVideoSchema = insertToolVideoSchema.partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type UpdateContent = z.infer<typeof updateContentSchema>;
export type Content = typeof content.$inferSelect;
export type ContentType = z.infer<typeof contentTypeEnum>;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterCampaign = z.infer<typeof insertNewsletterCampaignSchema>;
export type NewsletterCampaign = typeof newsletterCampaigns.$inferSelect;
export type InsertToolVideo = z.infer<typeof insertToolVideoSchema>;
export type UpdateToolVideo = z.infer<typeof updateToolVideoSchema>;
export type ToolVideo = typeof toolVideos.$inferSelect;
