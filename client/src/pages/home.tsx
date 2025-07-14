import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Users, MapPin, Star } from "lucide-react";
import type { Package } from "@shared/schema";

export default function Home() {
  const { data: featuredPackages, isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages/featured"],
  });

  const scrollToServices = () => {
    document.getElementById('featured-packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp">
            Discover Your Next <span className="text-[hsl(203,89%,61%)]">Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp">
            Create unforgettable memories with our expertly crafted travel experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp">
            <Button 
              size="lg" 
              className="btn-primary text-lg px-8 py-4 h-auto transform hover:scale-105"
              onClick={scrollToServices}
            >
              Explore Packages
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-[hsl(216,12%,28%)] text-lg px-8 py-4 h-auto bg-transparent"
              asChild
            >
              <Link href="/book-now">Plan Your Trip</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="bg-white shadow-2xl rounded-2xl p-8 max-w-6xl mx-auto -mt-20 relative z-20 mb-20 mx-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-[hsl(216,12%,28%)] mb-2">Destination</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select destination..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bali">Bali, Indonesia</SelectItem>
                <SelectItem value="paris">Paris, France</SelectItem>
                <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                <SelectItem value="swiss">Swiss Alps</SelectItem>
                <SelectItem value="africa">African Safari</SelectItem>
                <SelectItem value="maldives">Maldives</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[hsl(216,12%,28%)] mb-2">Check-in</label>
            <Input type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[hsl(216,12%,28%)] mb-2">Check-out</label>
            <Input type="date" />
          </div>
          <div className="flex items-end">
            <Button className="w-full btn-secondary">
              <MapPin className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section id="featured-packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(216,12%,28%)] mb-4">Featured Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of extraordinary travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages?.map((pkg) => (
              <Card key={pkg.id} className="travel-card">
                <div className="relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[hsl(25,95%,53%)] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
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
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.9</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      ${(pkg.price / 100).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button asChild className="flex-1 btn-primary">
                      <Link href={`/package/${pkg.slug}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="btn-primary">
              <Link href="/services">View All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(216,12%,28%)] mb-4">Why Choose WanderWise?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our personalized approach to travel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Guides</h3>
              <p className="text-gray-600">
                Local experts who know the hidden gems and authentic experiences that make each destination special.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Carefully selected accommodations, restaurants, and activities to ensure exceptional experiences.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock assistance during your travels to ensure peace of mind and seamless experiences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[hsl(216,12%,28%)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-primary">15,000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-primary">50+</div>
              <div className="text-gray-300">Destinations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-primary">15</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-primary">4.9</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
