import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema, insertTestimonialSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Package routes
  app.get("/api/packages", async (req, res) => {
    try {
      const packages = await storage.getAllPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages" });
    }
  });

  app.get("/api/packages/featured", async (req, res) => {
    try {
      const packages = await storage.getFeaturedPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured packages" });
    }
  });

  app.get("/api/packages/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const packages = await storage.getPackagesByCategory(category);
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch packages by category" });
    }
  });

  app.get("/api/packages/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const pkg = await storage.getPackageBySlug(slug);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch package" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const booking = await storage.updateBookingStatus(parseInt(id), status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Testimonial routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  // PDF generation route
  app.get("/api/packages/:slug/itinerary-pdf", async (req, res) => {
    try {
      const { slug } = req.params;
      const pkg = await storage.getPackageBySlug(slug);
      
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }

      // Set headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${pkg.title.replace(/[^a-zA-Z0-9]/g, '_')}_Itinerary.pdf"`);
      
      // Return package data for frontend PDF generation
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  // Simple chatbot responses
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      // Simple AI-like responses
      let response = "Thank you for your message! Our travel experts will get back to you shortly.";
      
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes("package") || lowerMessage.includes("tour")) {
        response = "We have amazing packages including Bali Paradise, Paris Romance, Tokyo Adventure, and more! Would you like me to show you our featured packages?";
      } else if (lowerMessage.includes("book") || lowerMessage.includes("booking")) {
        response = "I'd be happy to help you with booking! You can click the 'Book Now' button to start your booking process, or let me know which package interests you.";
      } else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
        response = "Our packages range from $899 for Bali Paradise to $4,999 for Maldives Luxury. Each package includes accommodations, meals, and activities. Would you like details about a specific package?";
      } else if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
        response = "I'm here to help! I can assist with package information, booking questions, and travel recommendations. What would you like to know?";
      }

      res.json({ response });
    } catch (error) {
      res.status(500).json({ message: "Chat service temporarily unavailable" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
