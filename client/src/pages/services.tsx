import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Users, MapPin, Download, Search, Filter } from "lucide-react";
import type { Package } from "@shared/schema";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const { data: packages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const categories = [
    { value: "all", label: "All Packages" },
    { value: "tropical", label: "Tropical" },
    { value: "romantic", label: "Romantic" },
    { value: "cultural", label: "Cultural" },
    { value: "luxury", label: "Luxury" },
    { value: "adventure", label: "Adventure" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "budget", label: "Under 2,000" },
    { value: "mid", label: "2,000 - 4,500" },
    { value: "premium", label: "4,500 - 9,000" },
    { value: "luxury", label: "9,000+" },
  ];

  const filteredPackages = packages?.filter((pkg) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory;
    
    const price = pkg.price;
    let matchesPrice = true;
    
    if (priceRange === "budget") matchesPrice = price < 1000;
    else if (priceRange === "mid") matchesPrice = price >= 1000 && price <= 2500;
    else if (priceRange === "premium") matchesPrice = price > 2500 && price <= 5000;
    else if (priceRange === "luxury") matchesPrice = price > 5000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleDownloadItinerary = async (slug: string, title: string) => {
    try {
      const response = await fetch(`/api/packages/${slug}/itinerary-pdf`);
      if (response.ok) {
        // For now, we'll show an alert. In a real app, this would trigger PDF download
        alert(`Downloading itinerary for ${title}...`);
      }
    } catch (error) {
      console.error("Failed to download itinerary:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
       <section className="py-20 text-white relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hoffman_cover_image.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Travel Packages</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover our carefully curated collection of travel experiences designed to create unforgettable memories
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value ? "btn-primary" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex gap-2 flex-wrap">
              <Filter className="w-4 h-4 mt-2 text-gray-400" />
              {priceRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={priceRange === range.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriceRange(range.value)}
                  className={priceRange === range.value ? "btn-secondary" : ""}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPackages && filteredPackages.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {filteredPackages.length} of {packages?.length} packages
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg) => (
                  <Card key={pkg.id} className="travel-card">
                    <div className="relative">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        className="w-full h-64 object-cover"
                      />
                      {pkg.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-[hsl(25,95%,53%)] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Popular
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-xs capitalize">
                          {pkg.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-[hsl(216,12%,28%)] mb-3">{pkg.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                      
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {pkg.duration} Days
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Up to {pkg.maxPeople} People
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-gray-600">
                          Starting from
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {(pkg.price)}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button asChild  className="w-full bg-blue-600 text-white hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors duration-300"
>
                          <Link href={`/package/${pkg.slug}`}>View Details</Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="px-3"
                          onClick={() => handleDownloadItinerary(pkg.slug, pkg.title)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No packages found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search criteria or browse all packages
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[hsl(216,12%,28%)] mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let us create a custom package tailored specifically to your dreams and preferences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg"   className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors duration-300"
>
              <Link href="/contact">Get Custom Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/book-now">Start Planning</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
