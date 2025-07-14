import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, MapPin, Users, Clock, DollarSign, Check } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { insertBookingSchema, type InsertBooking, type Package } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

const extendedBookingSchema = insertBookingSchema.extend({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type ExtendedBookingData = z.infer<typeof extendedBookingSchema>;

export default function BookNow() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const { toast } = useToast();

  const { data: packages } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const form = useForm<ExtendedBookingData>({
    resolver: zodResolver(extendedBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      packageId: undefined,
      travelers: 1,
      departureDate: "",
      budget: "",
      specialRequests: "",
      termsAccepted: false,
    },
  });

  const bookingMutation = useMutation({
    mutationFn: (data: InsertBooking) => apiRequest("POST", "/api/bookings", data),
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted!",
        description: "Thank you for your booking request. We'll contact you within 24 hours to confirm details.",
      });
      form.reset();
      setSelectedPackage(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ExtendedBookingData) => {
    const { termsAccepted, ...bookingData } = data;
    bookingMutation.mutate(bookingData);
  };

  const handlePackageSelect = (packageId: string) => {
    const pkg = packages?.find(p => p.id.toString() === packageId);
    setSelectedPackage(pkg || null);
    form.setValue("packageId", parseInt(packageId));
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-[hsl(203,89%,61%)] to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Book Your Adventure</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Ready to embark on your dream journey? Fill out the form below and let us create an unforgettable experience for you
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-[hsl(216,12%,28%)] mb-8">Booking Details</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-xl font-semibold text-[hsl(216,12%,28%)] mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone *</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Trip Details */}
                      <div>
                        <h3 className="text-xl font-semibold text-[hsl(216,12%,28%)] mb-4">Trip Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="packageId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Package *</FormLabel>
                                <Select onValueChange={handlePackageSelect}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a package" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {packages?.map((pkg) => (
                                      <SelectItem key={pkg.id} value={pkg.id.toString()}>
                                        {pkg.title} - ${(pkg.price / 100).toLocaleString()}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="travelers"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Travelers *</FormLabel>
                                <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select travelers" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                      <SelectItem key={num} value={num.toString()}>
                                        {num} {num === 1 ? 'Person' : 'People'}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="departureDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Departure Date *</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Budget Range (Optional)</FormLabel>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select budget range" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                                    <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                                    <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                                    <SelectItem value="5000+">$5,000+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Special Requests */}
                      <FormField
                        control={form.control}
                        name="specialRequests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests or Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={4} 
                                placeholder="Any special requirements, dietary restrictions, accessibility needs, celebration details, or other preferences..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Terms and Conditions */}
                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm">
                                I agree to the Terms and Conditions and Privacy Policy *
                              </FormLabel>
                              <p className="text-xs text-gray-600">
                                By checking this box, you consent to receive communications about your booking and future travel offers.
                              </p>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full btn-primary"
                        size="lg"
                        disabled={bookingMutation.isPending}
                      >
                        {bookingMutation.isPending ? (
                          <div className="spinner mr-2" />
                        ) : (
                          <Check className="w-4 h-4 mr-2" />
                        )}
                        Submit Booking Request
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Selected Package */}
              {selectedPackage && (
                <Card className="sticky top-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Selected Package</h3>
                    <img 
                      src={selectedPackage.image} 
                      alt={selectedPackage.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-semibold text-[hsl(216,12%,28%)] mb-2">{selectedPackage.title}</h4>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {selectedPackage.duration} days
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Up to {selectedPackage.maxPeople} people
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        From ${(selectedPackage.price / 100).toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{selectedPackage.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Booking Process */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Booking Process</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</div>
                      <div>
                        <div className="font-medium">Submit Request</div>
                        <div className="text-gray-600">Fill out the booking form</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</div>
                      <div>
                        <div className="font-medium">Consultation</div>
                        <div className="text-gray-600">We'll contact you within 24 hours</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</div>
                      <div>
                        <div className="font-medium">Customization</div>
                        <div className="text-gray-600">Personalize your itinerary</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">4</div>
                      <div>
                        <div className="font-medium">Confirmation</div>
                        <div className="text-gray-600">Finalize and book your trip</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our travel experts are standing by to help you plan the perfect trip.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>📞 +1 (555) 123-4567</div>
                    <div>✉️ info@wanderwise.com</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
