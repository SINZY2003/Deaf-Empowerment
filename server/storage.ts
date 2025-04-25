import { 
  users, 
  type User, 
  type InsertUser, 
  contactMessages, 
  type ContactMessage, 
  type InsertContactMessage,
  subscriptions,
  type Subscription,
  type InsertSubscription,
  donations,
  type Donation,
  type InsertDonation
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  saveSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptions(): Promise<Subscription[]>;
  saveDonation(donation: InsertDonation): Promise<Donation>;
  getDonations(): Promise<Donation[]>;
  getDonation(id: number): Promise<Donation | undefined>;
  getDonationsByPaymentIntentId(paymentIntentId: string): Promise<Donation[]>;
  updateDonationStatus(id: number, status: "pending" | "completed" | "failed"): Promise<Donation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactMessage>;
  private subscriptions: Map<number, Subscription>;
  private donations: Map<number, Donation>;
  private userId: number;
  private contactId: number;
  private subscriptionId: number;
  private donationId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.subscriptions = new Map();
    this.donations = new Map();
    this.userId = 1;
    this.contactId = 1;
    this.subscriptionId = 1;
    this.donationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactId++;
    const timestamp = new Date();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: timestamp,
      contactPreference: insertMessage.contactPreference ?? false
    };
    this.contacts.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contacts.values());
  }

  async saveSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.subscriptions.values()).find(
      sub => sub.email === insertSubscription.email
    );

    if (existingSubscription) {
      return existingSubscription;
    }

    const id = this.subscriptionId++;
    const timestamp = new Date();
    const subscription: Subscription = { ...insertSubscription, id, subscribedAt: timestamp };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values());
  }

  async saveDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.donationId++;
    const now = new Date();
    
    // Convert amount to string for numeric type compatibility
    const amountStr = typeof insertDonation.amount === 'number' 
      ? insertDonation.amount.toString() 
      : insertDonation.amount;
    
    const donation: Donation = { 
      ...insertDonation, 
      id, 
      amount: amountStr,
      message: insertDonation.message || null,
      createdAt: now,
      updatedAt: now,
      metadata: insertDonation.metadata || null
    };
    
    this.donations.set(id, donation);
    return donation;
  }

  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async getDonation(id: number): Promise<Donation | undefined> {
    return this.donations.get(id);
  }

  async getDonationsByPaymentIntentId(paymentIntentId: string): Promise<Donation[]> {
    return Array.from(this.donations.values()).filter(
      donation => donation.stripePaymentIntentId === paymentIntentId
    );
  }

  async updateDonationStatus(id: number, status: "pending" | "completed" | "failed"): Promise<Donation | undefined> {
    const donation = this.donations.get(id);
    
    if (donation) {
      const updatedDonation = { 
        ...donation, 
        status,
        updatedAt: new Date()
      };
      
      this.donations.set(id, updatedDonation);
      return updatedDonation;
    }
    
    return undefined;
  }
}

export const storage = new MemStorage();
