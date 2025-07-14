import type { Package } from "@shared/schema";

export interface PackageCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  image: string;
  popularMonths: string[];
  averageTemp: string;
  currency: string;
  language: string;
  timeZone: string;
}

export const packageCategories: PackageCategory[] = [
  {
    id: "tropical",
    name: "Tropical Paradise",
    description: "Escape to beautiful tropical destinations with pristine beaches and crystal-clear waters",
    icon: "🏝️"
  },
  {
    id: "romantic",
    name: "Romantic Getaways",
    description: "Perfect destinations for couples seeking intimate and memorable experiences",
    icon: "💕"
  },
  {
    id: "cultural",
    name: "Cultural Immersion",
    description: "Discover rich histories, traditions, and authentic local experiences",
    icon: "🏛️"
  },
  {
    id: "luxury",
    name: "Luxury Travel",
    description: "Premium experiences with world-class accommodations and exclusive amenities",
    icon: "👑"
  },
  {
    id: "adventure",
    name: "Adventure & Wildlife",
    description: "Thrilling outdoor experiences and encounters with exotic wildlife",
    icon: "🦁"
  },
  {
    id: "family",
    name: "Family Friendly",
    description: "Fun-filled destinations perfect for travelers of all ages",
    icon: "👨‍👩‍👧‍👦"
  }
];

export const destinations: Destination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    description: "Known as the Island of the Gods, Bali offers stunning temples, lush rice terraces, and world-class beaches.",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
    popularMonths: ["April", "May", "June", "July", "August", "September"],
    averageTemp: "26-30°C (79-86°F)",
    currency: "Indonesian Rupiah (IDR)",
    language: "Indonesian, Balinese",
    timeZone: "UTC+8 (WITA)"
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    continent: "Europe",
    description: "The City of Light captivates with its iconic landmarks, world-class museums, and romantic atmosphere.",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52",
    popularMonths: ["April", "May", "June", "September", "October"],
    averageTemp: "3-25°C (37-77°F)",
    currency: "Euro (EUR)",
    language: "French",
    timeZone: "UTC+1 (CET)"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    description: "A fascinating blend of ultra-modern technology and traditional culture in Japan's bustling capital.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    popularMonths: ["March", "April", "May", "October", "November"],
    averageTemp: "6-30°C (43-86°F)",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    timeZone: "UTC+9 (JST)"
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    continent: "Europe",
    description: "Majestic mountain peaks, pristine lakes, and charming alpine villages create a picture-perfect landscape.",
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126",
    popularMonths: ["December", "January", "February", "June", "July", "August"],
    averageTemp: "-5-20°C (23-68°F)",
    currency: "Swiss Franc (CHF)",
    language: "German, French, Italian",
    timeZone: "UTC+1 (CET)"
  },
  {
    id: "kenya-tanzania",
    name: "Kenya & Tanzania",
    country: "Kenya/Tanzania",
    continent: "Africa",
    description: "Witness the Great Migration and incredible wildlife in some of Africa's most famous national parks.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    popularMonths: ["June", "July", "August", "September", "January", "February"],
    averageTemp: "15-28°C (59-82°F)",
    currency: "Kenyan Shilling (KES) / Tanzanian Shilling (TZS)",
    language: "English, Swahili",
    timeZone: "UTC+3 (EAT)"
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    continent: "Asia",
    description: "A tropical paradise of coral islands, luxury resorts, and some of the world's clearest waters.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    popularMonths: ["November", "December", "January", "February", "March", "April"],
    averageTemp: "26-30°C (79-86°F)",
    currency: "Maldivian Rufiyaa (MVR)",
    language: "Dhivehi, English",
    timeZone: "UTC+5 (MVT)"
  }
];

export const travelTips = {
  general: [
    "Book international flights 2-3 months in advance for better prices",
    "Check visa requirements and passport validity (6+ months recommended)",
    "Purchase comprehensive travel insurance before departure",
    "Notify your bank of travel plans to avoid card blocks",
    "Pack essential medications in carry-on luggage",
    "Research local customs and etiquette",
    "Keep digital and physical copies of important documents"
  ],
  packing: [
    "Pack light and leave room for souvenirs",
    "Bring versatile clothing that can be layered",
    "Pack a small first aid kit with basics",
    "Include universal power adapters and portable chargers",
    "Bring comfortable walking shoes and flip-flops",
    "Pack sunscreen and insect repellent",
    "Include a water bottle and snacks for long travel days"
  ],
  safety: [
    "Research common scams in your destination",
    "Keep emergency contacts and embassy information handy",
    "Use reputable transportation and accommodation",
    "Stay aware of your surroundings, especially in crowds",
    "Keep valuables in hotel safes when not needed",
    "Have backup payment methods (cards, cash)",
    "Share your itinerary with someone at home"
  ]
};

export const budgetRanges = [
  {
    id: "budget",
    name: "Budget Travel",
    range: "$500 - $1,000",
    description: "Affordable adventures with comfortable accommodations and essential experiences",
    features: ["3-star hotels", "Group tours", "Local transportation", "Some meals included"]
  },
  {
    id: "mid-range",
    name: "Mid-Range",
    range: "$1,000 - $2,500",
    description: "Balanced comfort and value with quality accommodations and diverse experiences",
    features: ["4-star hotels", "Mix of group and private tours", "Comfortable transportation", "Most meals included"]
  },
  {
    id: "premium",
    name: "Premium",
    range: "$2,500 - $5,000",
    description: "High-quality experiences with luxury accommodations and personalized service",
    features: ["5-star hotels", "Private tours", "Premium transportation", "All meals included", "Spa treatments"]
  },
  {
    id: "luxury",
    name: "Luxury",
    range: "$5,000+",
    description: "Ultra-premium experiences with the finest accommodations and exclusive access",
    features: ["Luxury resorts", "Private guides", "Helicopter transfers", "Michelin dining", "Exclusive experiences"]
  }
];

export const seasonalRecommendations = {
  spring: {
    season: "Spring (March - May)",
    destinations: ["Japan", "Turkey", "Egypt", "Nepal", "Jordan"],
    highlights: ["Cherry blossoms", "Mild weather", "Fewer crowds", "Perfect hiking conditions"]
  },
  summer: {
    season: "Summer (June - August)",
    destinations: ["Europe", "Scandinavia", "Russia", "Alaska", "Canada"],
    highlights: ["Long daylight hours", "Festival season", "Warm weather", "Peak wildlife viewing"]
  },
  autumn: {
    season: "Autumn (September - November)",
    destinations: ["India", "China", "USA East Coast", "South Korea", "Myanmar"],
    highlights: ["Fall foliage", "Comfortable temperatures", "Harvest festivals", "Clear skies"]
  },
  winter: {
    season: "Winter (December - February)",
    destinations: ["Southeast Asia", "South America", "Africa", "Australia", "Middle East"],
    highlights: ["Dry season", "Wildlife migrations", "Ski season", "Winter festivals"]
  }
};

export function getPackagesByCategory(packages: Package[], category: string): Package[] {
  if (category === "all") return packages;
  return packages.filter(pkg => pkg.category === category);
}

export function getPackagesByPriceRange(packages: Package[], range: string): Package[] {
  return packages.filter(pkg => {
    const price = pkg.price / 100;
    switch (range) {
      case "budget":
        return price < 1000;
      case "mid-range":
        return price >= 1000 && price <= 2500;
      case "premium":
        return price > 2500 && price <= 5000;
      case "luxury":
        return price > 5000;
      default:
        return true;
    }
  });
}

export function getDestinationInfo(destinationId: string): Destination | undefined {
  return destinations.find(dest => dest.id === destinationId);
}

export function getCategoryInfo(categoryId: string): PackageCategory | undefined {
  return packageCategories.find(cat => cat.id === categoryId);
}

export function getSeasonalRecommendation(month: number): typeof seasonalRecommendations[keyof typeof seasonalRecommendations] {
  if (month >= 3 && month <= 5) return seasonalRecommendations.spring;
  if (month >= 6 && month <= 8) return seasonalRecommendations.summer;
  if (month >= 9 && month <= 11) return seasonalRecommendations.autumn;
  return seasonalRecommendations.winter;
}

export function formatDuration(days: number): string {
  if (days === 1) return "1 day";
  if (days < 7) return `${days} days`;
  
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  
  if (remainingDays === 0) {
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  }
  
  const weekText = weeks === 1 ? "1 week" : `${weeks} weeks`;
  const dayText = remainingDays === 1 ? "1 day" : `${remainingDays} days`;
  
  return `${weekText} ${dayText}`;
}

export function calculateTotalPrice(package: Package, travelers: number, customizations: string[] = []): number {
  let basePrice = package.price * travelers;
  
  // Add customization costs (this would be more complex in a real app)
  const customizationCost = customizations.length * 10000; // $100 per customization
  
  return basePrice + customizationCost;
}

export default {
  packageCategories,
  destinations,
  travelTips,
  budgetRanges,
  seasonalRecommendations,
  getPackagesByCategory,
  getPackagesByPriceRange,
  getDestinationInfo,
  getCategoryInfo,
  getSeasonalRecommendation,
  formatDuration,
  calculateTotalPrice
};
