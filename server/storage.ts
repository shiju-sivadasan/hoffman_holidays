import { users, packages, bookings, contacts, testimonials, type User, type InsertUser, type Package, type InsertPackage, type Booking, type InsertBooking, type Contact, type InsertContact, type Testimonial, type InsertTestimonial } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Packages
  getAllPackages(): Promise<Package[]>;
  getPackageById(id: number): Promise<Package | undefined>;
  getPackageBySlug(slug: string): Promise<Package | undefined>;
  getPackagesByCategory(category: string): Promise<Package[]>;
  getFeaturedPackages(): Promise<Package[]>;
  createPackage(pkg: InsertPackage): Promise<Package>;

  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Contacts
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;

  // Testimonials
  getApprovedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private packages: Map<number, Package>;
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private testimonials: Map<number, Testimonial>;
  private currentUserIdCounter: number;
  private currentPackageIdCounter: number;
  private currentBookingIdCounter: number;
  private currentContactIdCounter: number;
  private currentTestimonialIdCounter: number;

  constructor() {
    this.users = new Map();
    this.packages = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.testimonials = new Map();
    this.currentUserIdCounter = 1;
    this.currentPackageIdCounter = 1;
    this.currentBookingIdCounter = 1;
    this.currentContactIdCounter = 1;
    this.currentTestimonialIdCounter = 1;

    // Initialize with sample packages
    this.initializePackages();
    this.initializeTestimonials();
  }

  private initializePackages() {
    const samplePackages: Omit<Package, 'id'>[] = [
      {
        title: "Bali Paradise Escape",
        slug: "bali-paradise-escape",
        description: "7 days of tropical bliss with pristine beaches, temple visits, and cultural experiences in the heart of Indonesia.",
        duration: 7,
        price: 89900, // $899.00 in cents
        maxPeople: 6,
        category: "tropical",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        highlights: [
          "7 nights in luxury beachfront resort",
          "Daily breakfast and 3 dinners included",
          "Guided temple tours with local expert",
          "Traditional Balinese spa treatment",
          "Airport transfers and local transportation",
          "Rice terrace and volcano day trip"
        ],
        itinerary: [
          { day: 1, title: "Arrival & Beach Relaxation", description: "Airport pickup, hotel check-in, beach time, welcome dinner" },
          { day: 2, title: "Beach & Spa Day", description: "Free morning, traditional spa treatment, sunset dinner" },
          { day: 3, title: "Cultural Exploration", description: "Ubud temples, traditional markets, cooking class" },
          { day: 4, title: "Cultural Immersion", description: "Local village visit, art workshops, traditional dance show" },
          { day: 5, title: "Adventure & Nature", description: "Volcano hike, rice terraces, hot springs" },
          { day: 6, title: "Relaxation & Shopping", description: "Free morning, souvenir shopping, farewell dinner" },
          { day: 7, title: "Departure", description: "Final breakfast, airport transfer" }
        ],
        includes: [
          "Round-trip flights from major cities",
          "5-star beachfront resort accommodation",
          "Daily breakfast and 3 dinners",
          "All tours and activities mentioned",
          "Local transportation and transfers",
          "English-speaking local guide"
        ],
        featured: true
      },
      {
        title: "Paris Romance",
        slug: "paris-romance",
        description: "5 magical days exploring the City of Love with guided tours, fine dining, and iconic landmarks.",
        duration: 5,
        price: 129900, // $1,299.00 in cents
        maxPeople: 2,
        category: "romantic",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        highlights: [
          "4 nights in luxury hotel near Champs-Élysées",
          "Private Seine river cruise with dinner",
          "Skip-the-line tickets to Eiffel Tower and Louvre",
          "Wine tasting in Montmartre",
          "Romantic dinner at Michelin-starred restaurant",
          "Professional photoshoot at iconic locations"
        ],
        itinerary: [
          { day: 1, title: "Arrival & Evening Romance", description: "Airport transfer, hotel check-in, Seine river dinner cruise" },
          { day: 2, title: "Iconic Paris", description: "Eiffel Tower visit, Champs-Élysées walk, Louvre Museum" },
          { day: 3, title: "Art & Culture", description: "Montmartre exploration, Sacré-Cœur, wine tasting" },
          { day: 4, title: "Royal Experience", description: "Versailles day trip, Michelin-starred dinner" },
          { day: 5, title: "Farewell Paris", description: "Professional photoshoot, souvenir shopping, departure" }
        ],
        includes: [
          "Round-trip flights",
          "4 nights luxury hotel accommodation",
          "Daily breakfast and 2 dinners",
          "All entrance fees and tours",
          "Private transportation",
          "Professional guide and photographer"
        ],
        featured: true
      },
      {
        title: "Tokyo Adventure",
        slug: "tokyo-adventure",
        description: "6 days immersing in Japanese culture, from ancient temples to modern technology and world-class cuisine.",
        duration: 6,
        price: 119900, // $1,199.00 in cents
        maxPeople: 4,
        category: "cultural",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        highlights: [
          "5 nights in modern Tokyo hotel",
          "Traditional ryokan experience",
          "Sushi-making class with master chef",
          "Mt. Fuji day trip",
          "Tokyo Disneyland tickets included",
          "Traditional tea ceremony experience"
        ],
        itinerary: [
          { day: 1, title: "Tokyo Arrival", description: "Airport transfer, hotel check-in, Shibuya and Harajuku exploration" },
          { day: 2, title: "Traditional Culture", description: "Senso-ji Temple, tea ceremony, traditional lunch" },
          { day: 3, title: "Mt. Fuji Adventure", description: "Full day Mt. Fuji tour, onsen experience" },
          { day: 4, title: "Modern Tokyo", description: "Tokyo Skytree, Ginza shopping, sushi-making class" },
          { day: 5, title: "Disney Magic", description: "Tokyo Disneyland full day experience" },
          { day: 6, title: "Farewell Japan", description: "Last-minute shopping, airport departure" }
        ],
        includes: [
          "Round-trip flights",
          "5 nights hotel + 1 night ryokan",
          "Daily breakfast and 3 dinners",
          "All transportation and entrance fees",
          "Disney tickets included",
          "English-speaking guide"
        ],
        featured: false
      },
      {
        title: "Swiss Alps Luxury",
        slug: "swiss-alps-luxury",
        description: "8 days of alpine luxury with world-class skiing, spa treatments, and gourmet mountain cuisine.",
        duration: 8,
        price: 249900, // $2,499.00 in cents
        maxPeople: 4,
        category: "luxury",
        image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        highlights: [
          "7 nights in 5-star alpine resort",
          "Daily spa treatments included",
          "Private ski lessons with instructor",
          "Helicopter tour of the Alps",
          "Michelin-starred dining experiences",
          "Private mountain cabin dinner"
        ],
        itinerary: [
          { day: 1, title: "Alpine Arrival", description: "Airport transfer, luxury resort check-in, welcome dinner" },
          { day: 2, title: "Skiing & Spa", description: "Ski lessons, afternoon spa treatment, gourmet dinner" },
          { day: 3, title: "Mountain Adventure", description: "Helicopter Alps tour, mountain hiking, relaxation" },
          { day: 4, title: "Cultural Exploration", description: "Local village visit, cheese making, wine tasting" },
          { day: 5, title: "Luxury Experience", description: "Private cabin dinner, stargazing, hot springs" },
          { day: 6, title: "Adventure Activities", description: "Snow activities, spa day, farewell dinner" },
          { day: 7, title: "Scenic Beauty", description: "Cable car rides, photography, shopping" },
          { day: 8, title: "Departure", description: "Final breakfast, airport transfer" }
        ],
        includes: [
          "Round-trip first-class flights",
          "7 nights 5-star resort",
          "All meals and beverages",
          "Ski equipment and lessons",
          "Spa treatments daily",
          "All activities and transfers"
        ],
        featured: true
      },
      {
        title: "African Safari",
        slug: "african-safari",
        description: "10 days of wildlife adventure in Kenya and Tanzania with game drives, luxury lodges, and cultural visits.",
        duration: 10,
        price: 329900, // $3,299.00 in cents
        maxPeople: 8,
        category: "adventure",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        highlights: [
          "9 nights in luxury safari lodges",
          "Big Five game drives daily",
          "Maasai village cultural experience",
          "Serengeti balloon safari",
          "Ngorongoro Crater exploration",
          "Professional wildlife photography guide"
        ],
        itinerary: [
          { day: 1, title: "Nairobi Arrival", description: "Airport transfer, city hotel, orientation dinner" },
          { day: 2, title: "Maasai Mara", description: "Fly to Maasai Mara, first game drive, lodge check-in" },
          { day: 3, title: "Maasai Mara Safari", description: "Full day game drives, Big Five spotting" },
          { day: 4, title: "Cultural Experience", description: "Maasai village visit, traditional activities" },
          { day: 5, title: "Serengeti Adventure", description: "Fly to Serengeti, game drives, luxury camp" },
          { day: 6, title: "Balloon Safari", description: "Hot air balloon ride, champagne breakfast, game drives" },
          { day: 7, title: "Ngorongoro Crater", description: "Crater game drive, lodge accommodation" },
          { day: 8, title: "Lake Manyara", description: "Lake Manyara National Park, tree-climbing lions" },
          { day: 9, title: "Arusha Relaxation", description: "Spa day, souvenir shopping, farewell dinner" },
          { day: 10, title: "Departure", description: "Final breakfast, airport transfer, departure" }
        ],
        includes: [
          "Round-trip international flights",
          "9 nights luxury safari lodges",
          "All meals and beverages",
          "Daily game drives in 4WD vehicles",
          "Professional guide and photographer",
          "All park fees and activities"
        ],
        featured: false
      },
      {
        title: "Maldives Luxury",
        slug: "maldives-luxury",
        description: "5 days in paradise with overwater villas, private beaches, and world-class spa treatments.",
        duration: 5,
        price: 499900, // $4,999.00 in cents
        maxPeople: 2,
        category: "luxury",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        highlights: [
          "4 nights overwater villa",
          "Private beach and butler service",
          "Daily spa treatments",
          "Underwater restaurant dining",
          "Private yacht excursions",
          "Sunset dolphin watching"
        ],
        itinerary: [
          { day: 1, title: "Paradise Arrival", description: "Seaplane transfer, villa check-in, sunset dinner" },
          { day: 2, title: "Ocean Adventures", description: "Snorkeling, spa treatment, underwater restaurant" },
          { day: 3, title: "Private Yacht", description: "Full day yacht excursion, dolphin watching" },
          { day: 4, title: "Relaxation", description: "Beach day, couples spa, private dinner" },
          { day: 5, title: "Farewell Paradise", description: "Final breakfast, seaplane departure" }
        ],
        includes: [
          "Round-trip flights and seaplane",
          "4 nights overwater villa",
          "All meals and premium beverages",
          "Daily spa treatments",
          "Private yacht and activities",
          "Butler and concierge services"
        ],
        featured: true
      }
    ];

    samplePackages.forEach(pkg => {
      const id = this.currentPackageIdCounter++;
      this.packages.set(id, { ...pkg, id });
    });
  }

  private initializeTestimonials() {
    const sampleTestimonials: Omit<Testimonial, 'id' | 'createdAt'>[] = [
      {
        name: "Sarah & Mike Johnson",
        email: "sarah.johnson@email.com",
        rating: 5,
        message: "Our Bali trip was absolutely magical! The attention to detail and personalized service made our honeymoon unforgettable. Every recommendation was perfect.",
        packageId: 1,
        approved: true
      },
      {
        name: "David Martinez",
        email: "david.martinez@email.com",
        rating: 5,
        message: "The African safari exceeded all expectations! Our guide was knowledgeable, and we saw the Big Five. It was the adventure of a lifetime!",
        packageId: 5,
        approved: true
      },
      {
        name: "Emily Chen",
        email: "emily.chen@email.com",
        rating: 5,
        message: "Family trip to Tokyo was perfectly organized. The kids loved the cultural experiences, and we appreciated the flexibility in the itinerary.",
        packageId: 3,
        approved: true
      },
      {
        name: "Alexandra Dubois",
        email: "alex.dubois@email.com",
        rating: 5,
        message: "The luxury Swiss Alps package was worth every penny. The hotels were stunning, and the alpine activities were world-class.",
        packageId: 4,
        approved: true
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      const id = this.currentTestimonialIdCounter++;
      this.testimonials.set(id, { ...testimonial, id, createdAt: new Date() });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Package methods
  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }

  async getPackageById(id: number): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    return Array.from(this.packages.values()).find(pkg => pkg.slug === slug);
  }

  async getPackagesByCategory(category: string): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(pkg => pkg.category === category);
  }

  async getFeaturedPackages(): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(pkg => pkg.featured);
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const id = this.currentPackageIdCounter++;
    const pkg: Package = { 
      ...insertPackage, 
      id,
      featured: insertPackage.featured ?? false
    };
    this.packages.set(id, pkg);
    return pkg;
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingIdCounter++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      status: insertBooking.status ?? "pending",
      packageId: insertBooking.packageId ?? null,
      budget: insertBooking.budget ?? null,
      specialRequests: insertBooking.specialRequests ?? null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }

  // Contact methods
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactIdCounter++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      phone: insertContact.phone ?? null,
      interestedPackage: insertContact.interestedPackage ?? null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Testimonial methods
  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.approved);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialIdCounter++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date(), 
      approved: false,
      packageId: insertTestimonial.packageId ?? null
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
