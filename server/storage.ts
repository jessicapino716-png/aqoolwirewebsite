import { type User, type InsertUser, type Content, type InsertContent } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Content methods
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: string, content: Partial<InsertContent>): Promise<Content | undefined>;
  deleteContent(id: string): Promise<boolean>;
  getContentBySlug(slug: string): Promise<Content | undefined>;
  getContentById(id: string): Promise<Content | undefined>;
  listContent(filters?: {
    type?: string;
    category?: string;
    tag?: string;
    limit?: number;
    offset?: number;
  }): Promise<Content[]>;
  publishContent(id: string, publishedAt?: Date): Promise<Content | undefined>;
  incrementComments(id: string): Promise<Content | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods - matching the integration blueprint
  async getUser(id: string): Promise<User | undefined> {
    const { users } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { users } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { users } = await import("@shared/schema");
    const { db } = await import("./db");
    
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Content methods
  async createContent(insertContent: InsertContent): Promise<Content> {
    const { content } = await import("@shared/schema");
    const { db } = await import("./db");
    
    const [newContent] = await db
      .insert(content)
      .values(insertContent)
      .returning();
    return newContent;
  }

  async updateContent(id: string, updateData: Partial<InsertContent>): Promise<Content | undefined> {
    const { content } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [updatedContent] = await db
      .update(content)
      .set(updateData)
      .where(eq(content.id, id))
      .returning();
    return updatedContent || undefined;
  }

  async deleteContent(id: string): Promise<boolean> {
    const { content } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const result = await db
      .delete(content)
      .where(eq(content.id, id))
      .returning({ id: content.id });
    return result.length > 0;
  }

  async getContentBySlug(slug: string): Promise<Content | undefined> {
    const { content } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [foundContent] = await db.select().from(content).where(eq(content.slug, slug));
    return foundContent || undefined;
  }

  async getContentById(id: string): Promise<Content | undefined> {
    const { content } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [foundContent] = await db.select().from(content).where(eq(content.id, id));
    return foundContent || undefined;
  }

  async listContent(filters?: {
    type?: string;
    category?: string;
    tag?: string;
    limit?: number;
    offset?: number;
  }): Promise<Content[]> {
    const { content } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq, desc, and, sql } = await import("drizzle-orm");
    
    // Build conditions
    const conditions = [];
    if (filters?.type) {
      conditions.push(eq(content.type, filters.type));
    }
    if (filters?.category) {
      conditions.push(eq(content.category, filters.category));
    }
    if (filters?.tag) {
      // Use SQL operator for array contains to avoid TypeScript issues
      conditions.push(sql`${content.tags} @> ${[filters.tag]}`);
    }
    
    // Build base query
    let queryBuilder = db.select().from(content);
    
    // Apply filters if any
    if (conditions.length > 0) {
      queryBuilder = queryBuilder.where(and(...conditions));
    }
    
    // Add ordering
    queryBuilder = queryBuilder.orderBy(desc(content.publishedAt));
    
    // Add pagination
    if (filters?.limit) {
      queryBuilder = queryBuilder.limit(filters.limit);
    }
    if (filters?.offset) {
      queryBuilder = queryBuilder.offset(filters.offset);
    }
    
    return await queryBuilder;
  }

  async publishContent(id: string, publishedAt?: Date): Promise<Content | undefined> {
    const { content } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [updatedContent] = await db
      .update(content)
      .set({ publishedAt: publishedAt || new Date() })
      .where(eq(content.id, id))
      .returning();
    return updatedContent || undefined;
  }

  async incrementComments(id: string): Promise<Content | undefined> {
    const { content } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq, sql } = await import("drizzle-orm");
    
    const [updatedContent] = await db
      .update(content)
      .set({ commentsCount: sql`${content.commentsCount} + 1` })
      .where(eq(content.id, id))
      .returning();
    return updatedContent || undefined;
  }
}

export const storage = new DatabaseStorage();
