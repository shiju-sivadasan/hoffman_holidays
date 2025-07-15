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
    title: "Munnar Hill Station Retreat",
    slug: "munnar-hill-station-retreat",
    description: "A 5-day escape to Munnar, the 'Kashmir of South India,' nestled in the Western Ghats, famous for its sprawling tea plantations, misty hills, and rich biodiversity.",
    duration: 5,
    price: 2999, // INR 599.00 in cents
    maxPeople: 6,
    category: "hill station",
    image: "/munnar.jpg",
    highlights: [
      "4 nights in a cozy hill resort",
      "Guided tour of tea plantations and TATA Tea Museum",
      "Visit to Eravikulam National Park for Nilgiri Tahr spotting",
      "Trek to Anamudi Peak",
      "Scenic drive through Mattupetty Dam and Echo Point",
      "Spice garden tour with local lunch"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Munnar", description: "Airport/station pickup, resort check-in, evening at leisure in Munnar town" },
      { day: 2, title: "Tea Trails", description: "Morning tea plantation tour, visit TATA Tea Museum, lunch at local eatery" },
      { day: 3, title: "Wildlife & Nature", description: "Eravikulam National Park, Nilgiri Tahr spotting, Mattupetty Dam visit" },
      { day: 4, title: "Adventure Day", description: "Trek to Anamudi Peak, spice garden tour, evening cultural show" },
      { day: 5, title: "Departure", description: "Breakfast, visit Echo Point, transfer to airport/station" }
    ],
    includes: [
      "Round-trip transfers from Kochi",
      "4 nights resort accommodation",
      "Daily breakfast and 2 dinners",
      "All tours and entrance fees",
      "Local transportation",
      "English-speaking guide"
    ],
    featured: true
  },
  {
    title: "Vagamon Meadow Adventure",
    slug: "vagamon-meadow-adventure",
    description: "A 4-day adventure in Vagamon, Kerala's green paradise, offering rolling meadows, pine forests, and thrilling outdoor activities.",
    duration: 4,
    price: 3999, // INR 549.00 in cents
    maxPeople: 6,
    category: "adventure",
    image: "/wagamon.jpg",
    highlights: [
      "3 nights in a scenic resort",
      "Paragliding experience",
      "Trekking through pine forests",
      "Visit to Vagamon Lake",
      "Jeep safari to remote meadows",
      "Evening bonfire with BBQ"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Vagamon", description: "Transfer from Kochi, resort check-in, evening lake visit" },
      { day: 2, title: "Adventure Day", description: "Paragliding session, pine forest trek, local lunch" },
      { day: 3, title: "Explore Meadows", description: "Jeep safari to meadows, photography, bonfire dinner" },
      { day: 4, title: "Departure", description: "Morning relaxation, breakfast, transfer to Kochi" }
    ],
    includes: [
      "Round-trip transfers from Kochi",
      "3 nights resort accommodation",
      "Daily breakfast and 2 dinners",
      "Paragliding and jeep safari",
      "All entrance fees",
      "Local guide"
    ],
    featured: true
  },
  {
    title: "Dandeli Jungle Adventure",
    slug: "dandeli-jungle-adventure",
    description: "A 4-day thrilling adventure in Dandeli, Karnataka, with river rafting, wildlife safaris, and lush forests.",
    duration: 4,
    price: 5999, // INR 549.00 in cents
    maxPeople: 8,
    category: "adventure",
    image: "dandeli.jpg",
    highlights: [
      "3 nights in a jungle camp",
      "White-water rafting on Kali River",
      "Wildlife safari in Dandeli Sanctuary",
      "Kayaking and coracle rides",
      "Bird watching with expert guide",
      "Campfire nights with BBQ"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Dandeli", description: "Transfer from Hubli, camp check-in, evening nature walk" },
      { day: 2, title: "River Adventure", description: "White-water rafting, kayaking, local lunch" },
      { day: 3, title: "Wildlife Safari", description: "Morning safari, bird watching, campfire dinner" },
      { day: 4, title: "Departure", description: "Coracle ride, breakfast, transfer to Hubli" }
    ],
    includes: [
      "Round-trip transfers from Hubli",
      "3 nights camp accommodation",
      "All meals",
      "Rafting, safari, and activities",
      "Local transportation",
      "English-speaking guide"
    ],
    featured: true
  },
  {
    title: "Gokarna Beach & Temple Tour",
    slug: "gokarna-beach-temple-tour",
    description: "A 4-day spiritual and beach getaway to Gokarna, Karnataka, known for its pristine beaches and ancient temples.",
    duration: 4,
    price: 4999, // INR 499.00 in cents
    maxPeople: 6,
    category: "beach",
    image: "/gokarna.jpg",
    highlights: [
      "3 nights in a beachside homestay",
      "Visit to Mahabaleshwar Temple",
      "Beach hopping (Om, Kudle, Paradise)",
      "Sunset boat ride",
      "Yoga session by the beach",
      "Local seafood dining"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Gokarna", description: "Transfer from Goa, homestay check-in, evening temple visit" },
      { day: 2, title: "Beach Day", description: "Beach hopping, yoga session, local lunch" },
      { day: 3, title: "Coastal Bliss", description: "Sunset boat ride, beach relaxation, seafood dinner" },
      { day: 4, title: "Departure", description: "Morning beach walk, breakfast, transfer to Goa" }
    ],
    includes: [
      "Round-trip transfers from Goa",
      "3 nights homestay accommodation",
      "Daily breakfast and 2 dinners",
      "Temple and beach tours",
      "Yoga session",
      "Local guide"
    ],
    featured: false
  },
  {
    title: "Udupi Coastal Culture",
    slug: "udupi-coastal-culture",
    description: "A 4-day cultural journey to Udupi, Karnataka, famous for its Krishna Temple, beaches, and authentic South Indian cuisine.",
    duration: 4,
    price: 6599, // INR 479.00 in cents
    maxPeople: 6,
    category: "cultural",
    image: "/uduppi.jpg",
    highlights: [
      "3 nights in a heritage hotel",
      "Visit to Sri Krishna Matha Temple",
      "Beach day at Malpe Beach",
      "Cooking class for Udupi cuisine",
      "Boat ride to St. Mary's Island",
      "Cultural evening with Yakshagana performance"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Udupi", description: "Transfer from Mangalore, hotel check-in, evening temple visit" },
      { day: 2, title: "Cultural Exploration", description: "Sri Krishna Matha tour, Udupi cuisine cooking class, local lunch" },
      { day: 3, title: "Beach & Island Day", description: "Malpe Beach, boat ride to St. Mary's Island, Yakshagana show" },
      { day: 4, title: "Departure", description: "Morning temple visit, breakfast, transfer to Mangalore" }
    ],
    includes: [
      "Round-trip transfers from Mangalore",
      "3 nights heritage hotel accommodation",
      "Daily breakfast and 2 dinners",
      "All tours and activities",
      "Boat ride to St. Mary's Island",
      "Local guide"
    ],
    featured: true
  },
  {
    title: "Ladakh Himalayan Odyssey",
    slug: "ladakh-himalayan-odyssey",
    description: "A 7-day journey through the rugged beauty of Ladakh, with monasteries, high-altitude lakes, and desert landscapes.",
    duration: 7,
    price: 9999, // INR 999.00 in cents
    maxPeople: 6,
    category: "adventure",
    image: "/ladakh.jpg",
    highlights: [
      "6 nights in hotels and camps",
      "Visit to Pangong Lake",
      "Monastery tour (Hemis, Thiksey)",
      "Khardung La Pass drive",
      "White-water rafting on Zanskar River",
      "Stargazing in Nubra Valley"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Leh", description: "Airport transfer, hotel check-in, acclimatization day" },
      { day: 2, title: "Monastery Tour", description: "Hemis and Thiksey monasteries, local lunch" },
      { day: 3, title: "Nubra Valley", description: "Drive to Nubra via Khardung La, camp stay, stargazing" },
      { day: 4, title: "Pangong Lake", description: "Drive to Pangong Lake, lakeside camping" },
      { day: 5, title: "Rafting Adventure", description: "Return to Leh, Zanskar River rafting" },
      { day: 6, title: "Leh Exploration", description: "Leh Palace, Shanti Stupa, market visit" },
      { day: 7, title: "Departure", description: "Breakfast, airport transfer" }
    ],
    includes: [
      "Round-trip flights to Leh",
      "6 nights accommodation (hotels/camps)",
      "Daily breakfast and 4 dinners",
      "All tours and activities",
      "4WD transportation",
      "Local guide"
    ],
    featured: true
  },
  {
    title: "Kashmir Valley Retreat",
    slug: "kashmir-valley-retreat",
    description: "A 6-day escape to the 'Paradise on Earth,' Kashmir, with serene lakes, Mughal gardens, and houseboat stays.",
    duration: 6,
    price: 7999, // INR 799.00 in cents
    maxPeople: 4,
    category: "romantic",
    image: "kashmir.jpg",
    highlights: [
      "5 nights in hotels and houseboats",
      "Shikara ride on Dal Lake",
      "Mughal Gardens tour",
      "Gulmarg gondola ride",
      "Visit to Sonamarg",
      "Kashmiri cultural evening"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar", description: "Airport transfer, houseboat check-in, evening shikara ride" },
      { day: 2, title: "Mughal Gardens", description: "Visit Shalimar Bagh, Nishat Bagh, local lunch" },
      { day: 3, title: "Gulmarg Adventure", description: "Day trip to Gulmarg, gondola ride, skiing" },
      { day: 4, title: "Sonamarg Exploration", description: "Sonamarg glacier visit, horse riding" },
      { day: 5, title: "Srinagar Culture", description: "Hazratbal Shrine, market visit, cultural evening" },
      { day: 6, title: "Departure", description: "Breakfast, airport transfer" }
    ],
    includes: [
      "Round-trip flights to Srinagar",
      "5 nights accommodation (hotel/houseboat)",
      "Daily breakfast and 3 dinners",
      "All tours and activities",
      "Shikara rides",
      "Local guide"
    ],
    featured: true
  },
      {
        title: "Bali Paradise Escape",
        slug: "bali-paradise-escape",
        description: "7 days of tropical bliss with pristine beaches, temple visits, and cultural experiences in the heart of Indonesia.",
        duration: 7,
        price: 12999, // $899.00 in cents
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
        title: "Maldives Luxury",
        slug: "maldives-luxury",
        description: "5 days in paradise with overwater villas, private beaches, and world-class spa treatments.",
        duration: 5,
        price: 11999, // $4,999.00 in cents
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
    name: "Anjali Nair",
    email: "anjali.nair@email.com",
    rating: 5,
    message: "Our college trip to Munnar was just amazing! The misty hills, campfire nights, and trekking through tea plantations made it an unforgettable bonding experience.",
    packageId: 1,
    approved: true
  },
  {
    name: "Rahul Menon",
    email: "rahul.menon@email.com",
    rating: 5,
    message: "Trip To Go nailed our Goa trip! From beach parties to parasailing and group dinners, everything was perfectly organized. Easily one of the best memories from college.",
    packageId: 2,
    approved: true
  },
  {
    name: "Sneha Raj",
    email: "sneha.raj@email.com",
    rating: 5,
    message: "Dandeli was pure adventure! White water rafting and staying by the riverside gave us the thrill we wanted. Hats off to Trip To Go for keeping it safe and exciting!",
    packageId: 3,
    approved: true
  },
  {
    name: "Arjun Das",
    email: "arjun.das@email.com",
    rating: 5,
    message: "Gokarna was peaceful yet fun — the beach trek and sunrise vibes were next level. Perfectly planned by Trip To Go for a relaxed but fun college trip.",
    packageId: 4,
    approved: true
  },
  {
    name: "Meera Suresh",
    email: "meera.suresh@email.com",
    rating: 5,
    message: "Our Vagamon trip was magical! Rolling meadows, foggy mornings, and bonfire games made it special. Thanks to Trip To Go for the flawless coordination!",
    packageId: 5,
    approved: true
  },
  {
    name: "Vishnu Ramesh",
    email: "vishnu.ramesh@email.com",
    rating: 5,
    message: "A Bali trip with college friends? It was epic! The beach vibes, temple visits, and parties were all well handled by Trip To Go. Would go again in a heartbeat!",
    packageId: 6,
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
