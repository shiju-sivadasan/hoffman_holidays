import { useParams } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Download, 
  Star, 
  Plane, 
  Hotel, 
  Utensils,
  CheckCircle,
  ArrowLeft,
  Clock,
  DollarSign
} from "lucide-react";
import type { Package } from "@shared/schema";
import BookingModal from "@/components/booking-modal";

export default function PackageDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { data: pkg, isLoading, error } = useQuery<Package>({
    queryKey: ["/api/packages", slug],
    enabled: !!slug,
  });

  const handleDownloadItinerary = async () => {
    if (!pkg) return;
    
    try {
      const response = await fetch(`/api/packages/${pkg.slug}/itinerary-pdf`);
      if (response.ok) {
        // For now, we'll show an alert. In a real app, this would trigger PDF download
        alert(`Downloading detailed itinerary for ${pkg.title}...`);
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

  if (error || !pkg) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h2>
            <p className="text-gray-600 mb-6">
              The package you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/services">Browse All Packages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Button
              variant="outline"
              className="mb-4 bg-white/20 border-white text-white hover:bg-white/30"
              asChild
            >
              <Link href="/services">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Packages
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{pkg.title}</h1>
            <div className="flex flex-wrap gap-4 items-center text-white">
              <Badge variant="secondary" className="bg-[hsl(25,95%,53%)] text-white capitalize">
                {pkg.category}
              </Badge>
              {pkg.featured && (
                <Badge className="bg-secondary">Featured Package</Badge>
              )}
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                <span>4.9 (126 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Overview */}
      <section className="py-8 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-primary mr-3" />
              <div>
                <div className="font-semibold">Duration</div>
                <div className="text-gray-600">{pkg.duration} Days</div>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 text-primary mr-3" />
              <div>
                <div className="font-semibold">Group Size</div>
                <div className="text-gray-600">Up to {pkg.maxPeople} People</div>
              </div>
            </div>
            <div className="flex items-center">
              {/* <DollarSign className="w-6 h-6 text-primary mr-3" /> */}
              <div>
                <div className="font-semibold">Starting Price</div>
                <div className="text-2xl font-bold text-primary">
                  {pkg.price}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleDownloadItinerary}
                variant="outline" 
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                onClick={() => setIsBookingModalOpen(true)}
                className="flex-1 btn-primary"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-[hsl(216,12%,28%)] mb-4">Package Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{pkg.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-2xl font-bold text-[hsl(216,12%,28%)] mb-6">Package Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="text-2xl font-bold text-[hsl(216,12%,28%)] mb-6">Daily Itinerary</h3>
                <div className="space-y-6">
                  {pkg.itinerary.map((day, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {day.day}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-[hsl(216,12%,28%)] mb-2">
                          Day {day.day}: {day.title}
                        </h4>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h3 className="text-2xl font-bold text-[hsl(216,12%,28%)] mb-6">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.includes.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {pkg.price}
                    </div>
                    <div className="text-gray-600">per person</div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      onClick={() => setIsBookingModalOpen(true)}
                        className="w-full bg-blue-600 text-white hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors duration-300"

                      size="lg"
                    >
                      Book This Package
                    </Button>
                    
                    <Button 
                      onClick={handleDownloadItinerary}
                      variant="outline" 
                      className="w-full"
                      size="lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Itinerary
                    </Button>

                    <Button asChild variant="outline" className="w-full" size="lg">
                      <Link href="/contact">Ask Questions</Link>
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{pkg.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Group Size:</span>
                      <span className="font-medium">{pkg.maxPeople} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{pkg.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Package Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Plane className="w-4 h-4 text-primary mr-3" />
                      <span>Flights Included</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Hotel className="w-4 h-4 text-primary mr-3" />
                      <span>Luxury Accommodation</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Utensils className="w-4 h-4 text-primary mr-3" />
                      <span>Daily Meals</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 text-primary mr-3" />
                      <span>Expert Guide</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Our travel experts are here to help you plan the perfect trip.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[hsl(216,12%,28%)] mb-4">You Might Also Like</h2>
            <p className="text-gray-600">Discover more amazing destinations</p>
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="btn-primary">
              <Link href="/services">Browse All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackage={pkg}
      />
    </div>
  );
}
