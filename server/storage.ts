import { type User, type InsertUser, type Content, type InsertContent, type NewsletterSubscriber, type InsertNewsletterSubscriber, type NewsletterCampaign, type InsertNewsletterCampaign } from "@shared/schema";
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
  
  // Newsletter methods
  subscribeToNewsletter(email: string): Promise<NewsletterSubscriber>;
  isEmailSubscribed(email: string): Promise<boolean>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  
  // Newsletter campaign methods
  createNewsletterCampaign(campaign: InsertNewsletterCampaign): Promise<NewsletterCampaign>;
  getNewsletterCampaigns(): Promise<NewsletterCampaign[]>;
  getNewsletterCampaignById(id: string): Promise<NewsletterCampaign | undefined>;
  updateNewsletterCampaign(id: string, updates: Partial<NewsletterCampaign>): Promise<NewsletterCampaign | undefined>;
  deleteNewsletterCampaign(id: string): Promise<boolean>;
  markCampaignAsSent(id: string, subscriberCount: number): Promise<NewsletterCampaign | undefined>;
  getAllActiveSubscribers(): Promise<NewsletterSubscriber[]>;
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
    
    // Build and execute query
    const queryBuilder = db.select().from(content);
    
    // Apply filters if any
    const filteredQuery = conditions.length > 0 
      ? queryBuilder.where(and(...conditions))
      : queryBuilder;
    
    // Add ordering and pagination
    const orderedQuery = filteredQuery.orderBy(desc(content.publishedAt));
    
    let finalQuery = orderedQuery;
    if (filters?.limit) {
      finalQuery = finalQuery.limit(filters.limit);
    }
    if (filters?.offset) {
      finalQuery = finalQuery.offset(filters.offset);
    }
    
    return await finalQuery;
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

  // Newsletter methods
  async subscribeToNewsletter(email: string): Promise<NewsletterSubscriber> {
    const { newsletterSubscribers } = await import("@shared/schema");
    const { db } = await import("./db");
    
    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values({ email })
      .returning();
    return subscriber;
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    const { newsletterSubscribers } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [subscriber] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email));
    return !!subscriber && subscriber.isActive === "true";
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    const { newsletterSubscribers } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    return await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.isActive, "true"));
  }

  // Newsletter campaign methods
  async createNewsletterCampaign(insertCampaign: InsertNewsletterCampaign): Promise<NewsletterCampaign> {
    const { newsletterCampaigns } = await import("@shared/schema");
    const { db } = await import("./db");
    
    const [campaign] = await db
      .insert(newsletterCampaigns)
      .values(insertCampaign)
      .returning();
    return campaign;
  }

  async getNewsletterCampaigns(): Promise<NewsletterCampaign[]> {
    const { newsletterCampaigns } = await import("@shared/schema");
    const { db } = await import("./db");
    const { desc } = await import("drizzle-orm");
    
    return await db.select().from(newsletterCampaigns).orderBy(desc(newsletterCampaigns.createdAt));
  }

  async getNewsletterCampaignById(id: string): Promise<NewsletterCampaign | undefined> {
    const { newsletterCampaigns } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [campaign] = await db.select().from(newsletterCampaigns).where(eq(newsletterCampaigns.id, id));
    return campaign || undefined;
  }

  async updateNewsletterCampaign(id: string, updates: Partial<NewsletterCampaign>): Promise<NewsletterCampaign | undefined> {
    const { newsletterCampaigns } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [updatedCampaign] = await db
      .update(newsletterCampaigns)
      .set(updates)
      .where(eq(newsletterCampaigns.id, id))
      .returning();
    return updatedCampaign || undefined;
  }

  async deleteNewsletterCampaign(id: string): Promise<boolean> {
    const { newsletterCampaigns } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const result = await db.delete(newsletterCampaigns).where(eq(newsletterCampaigns.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async markCampaignAsSent(id: string, subscriberCount: number): Promise<NewsletterCampaign | undefined> {
    const { newsletterCampaigns } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    const [updatedCampaign] = await db
      .update(newsletterCampaigns)
      .set({ 
        status: "sent",
        sentAt: new Date(),
        subscriberCount: subscriberCount
      })
      .where(eq(newsletterCampaigns.id, id))
      .returning();
    return updatedCampaign || undefined;
  }

  async getAllActiveSubscribers(): Promise<NewsletterSubscriber[]> {
    const { newsletterSubscribers } = await import("@shared/schema");
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    
    return await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.isActive, "true"));
  }
}

export const storage = new DatabaseStorage();
