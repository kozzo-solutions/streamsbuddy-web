import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  twitchUsername: text("twitch_username").notNull(),
  followersRange: text("followers_range").notNull(),
  language: text("language").notNull().default("fr"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  email: true,
  twitchUsername: true,
  followersRange: true,
  language: true,
}).extend({
  email: z.string().email("Invalid email address"),
  twitchUsername: z.string().min(1, "Twitch username is required"),
  followersRange: z.enum(["0-50", "51-500", "501-5000", "5001-50000", "50000+"], {
    required_error: "Please select a follower range"
  }),
  language: z.enum(["fr", "en"]).default("fr"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
