import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, subscribeSchema, donationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import Stripe from "stripe";

// Initialize Stripe with the secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const savedMessage = await storage.saveContactMessage(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Contact message received", 
        data: savedMessage 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An unexpected error occurred" 
        });
      }
    }
  });

  // Newsletter subscription route
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = subscribeSchema.parse(req.body);
      const subscription = await storage.saveSubscription(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter", 
        data: subscription 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An unexpected error occurred" 
        });
      }
    }
  });

  // Create a payment intent for donations
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const validatedData = donationSchema.parse(req.body);
      const { amount, name, email, message } = validatedData;
      
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          name,
          email,
          message: message || '',
          donation_type: 'one_time'
        },
        receipt_email: email,
        description: "Donation to Deaf Welfare Society",
      });
      
      // Save donation in our database
      const donation = await storage.saveDonation({
        name,
        email,
        amount,
        message: message || '',
        stripePaymentIntentId: paymentIntent.id,
        status: "pending"
      });
      
      // Return the client secret to the frontend
      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        donationId: donation.id
      });
    } catch (error) {
      console.error("Payment intent creation error:", error);
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: error instanceof Error ? error.message : "An unexpected error occurred" 
        });
      }
    }
  });

  // Webhook for Stripe events
  app.post("/api/webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    
    // You would typically check the signature here with something like:
    // const endpointSecret = 'your_endpoint_secret';
    // let event;
    // try {
    //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    // } catch (err) {
    //   res.status(400).send(`Webhook Error: ${err.message}`);
    //   return;
    // }
    
    // For now, we'll just process the raw event
    try {
      const event = req.body;
      
      // Handle specific events
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        // Update donation status in database
        const donations = await storage.getDonationsByPaymentIntentId(paymentIntent.id);
        
        if (donations.length > 0) {
          await storage.updateDonationStatus(donations[0].id, "completed");
        }
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Webhook processing error" 
      });
    }
  });

  // Get donations for admin dashboard (would normally require authentication)
  app.get("/api/donations", async (req, res) => {
    try {
      const donations = await storage.getDonations();
      res.json({ donations });
    } catch (error) {
      console.error("Get donations error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch donations" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
