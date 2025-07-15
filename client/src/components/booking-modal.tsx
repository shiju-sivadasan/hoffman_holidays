import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { X, Send } from "lucide-react";
import { insertBookingSchema, type InsertBooking, type Package } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

const extendedBookingSchema = insertBookingSchema.extend({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type ExtendedBookingData = z.infer<typeof extendedBookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: Package | null;
}

export default function BookingModal({ isOpen, onClose, selectedPackage }: BookingModalProps) {
  const { toast } = useToast();

  const form = useForm<ExtendedBookingData>({
    resolver: zodResolver(extendedBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      packageId: selectedPackage?.id,
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
      onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[hsl(216,12%,28%)]">
            Book Your Adventure
          </DialogTitle>
        </DialogHeader>

        {selectedPackage && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-4">
              <img 
                src={selectedPackage.image} 
                alt={selectedPackage.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-[hsl(216,12%,28%)]">{selectedPackage.title}</h3>
                <p className="text-sm text-gray-600">{selectedPackage.duration} days • ${(selectedPackage.price / 100).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-[hsl(216,12%,28%)] mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input />
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
                        <Input />
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
                        <Input type="email" />
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
                        <Input type="tel" placeholder="+91 9562746067" {...field} />
                        <Input type="tel" placeholder="+91 9400846067" {...field} />
                        <Input type="tel" placeholder="+91 8289866836" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Trip Details */}
            <div>
              <h3 className="text-lg font-semibold text-[hsl(216,12%,28%)] mb-4">Trip Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <SelectItem value="500-1000">2500 - 3,000</SelectItem>
                          <SelectItem value="1000-2500">3,000 - 5,500</SelectItem>
                          <SelectItem value="2500-5000">5,500 - 9,000</SelectItem>
                          <SelectItem value="5000+">9,000+</SelectItem>
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
                      rows={3} 
                      placeholder="Any special requirements, dietary restrictions, or preferences..." 
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
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 btn-primary"
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending ? (
                  <div className="spinner mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
