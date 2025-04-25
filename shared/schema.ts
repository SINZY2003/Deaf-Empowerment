import { pgTable, text, serial, integer, boolean, timestamp, numeric, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  contactPreference: boolean("contact_preference").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof contactSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Newsletter Subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const subscribeSchema = createInsertSchema(subscriptions).pick({
  email: true,
});

export type InsertSubscription = z.infer<typeof subscribeSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

// Donations
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  amount: numeric("amount").notNull(),
  message: text("message").default(""),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
  status: text("status").notNull(), // pending, completed, failed
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Base donation schema without database-specific fields
export const donationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  amount: z.number().positive("Amount must be positive").min(1, "Minimum donation amount is $1"),
  message: z.string().optional(),
});

// Schema for creating a donation in the database
export const insertDonationSchema = donationSchema.extend({
  stripePaymentIntentId: z.string(),
  status: z.enum(["pending", "completed", "failed"]),
  metadata: z.any().optional(),
});

export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;
