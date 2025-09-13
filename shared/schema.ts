import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const content = pgTable("content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // "external" | "weekly-analysis"
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  body: text("body"), // nullable - only for internal content (weekly analysis)
  source: text("source"), // nullable - only for external articles (e.g., "Wall Street Journal")
  externalUrl: text("external_url"), // nullable - only for external articles
  authorName: text("author_name").notNull(),
  authorId: varchar("author_id").references(() => users.id), // nullable - link to user who created it
  category: text("category").notNull(),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  commentsCount: integer("comments_count").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Content type enum for validation
export const contentTypeEnum = z.enum(["external", "weekly-analysis"]);

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
  
  // Weekly analysis content type
  z.object({
    type: z.literal("weekly-analysis"),
    body: z.string().min(1, "Body is required for weekly analysis content"),
    externalUrl: z.never().optional(), // Not allowed for weekly analysis content
    source: z.never().optional(), // Not allowed for weekly analysis content
  }).merge(baseContentSchema.omit({ externalUrl: true, source: true, body: true })),
]);

// Update schema for PATCH operations - discriminated union of partials only
export const updateContentSchema = z.discriminatedUnion("type", [
  // External content type partial
  z.object({
    type: z.literal("external"),
    externalUrl: z.string().url("Must be a valid URL").optional(),
    source: z.string().min(1, "Source is required for external content").optional(),
    body: z.never().optional(), // Not allowed for external content
  }).merge(baseContentSchema.omit({ externalUrl: true, source: true, body: true }).partial()),
  
  // Weekly analysis content type partial
  z.object({
    type: z.literal("weekly-analysis"),
    body: z.string().min(1, "Body is required for weekly analysis content").optional(),
    externalUrl: z.never().optional(), // Not allowed for weekly analysis content
    source: z.never().optional(), // Not allowed for weekly analysis content
  }).merge(baseContentSchema.omit({ externalUrl: true, source: true, body: true }).partial()),
]);

// Schema for updates without type specification (common fields only)
export const updateContentWithoutTypeSchema = baseContentSchema.omit({ 
  externalUrl: true, 
  source: true, 
  body: true 
}).partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type UpdateContent = z.infer<typeof updateContentSchema>;
export type Content = typeof content.$inferSelect;
export type ContentType = z.infer<typeof contentTypeEnum>;
