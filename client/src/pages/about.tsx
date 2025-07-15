import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Globe, Heart, Shield, Award, Users } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-[hsl(216,12%,28%)] mb-6">
              About Team HoffMan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over 5 years, we've been crafting extraordinary travel experiences that connect people with the world's most beautiful destinations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/hoffman_about_page.jpeg" 
                alt="Modern travel agency office" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-[hsl(216,12%,28%)] mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To make travel accessible, memorable, and transformative for every adventurer. We believe that travel is not just about visiting places—it's about creating connections, understanding cultures, and building lifelong memories.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[hsl(216,12%,28%)] mb-4">Why Choose Us?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
                    Expert local guides and personalized itineraries
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
                    24/7 customer support during your travels
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
                    Best price guarantee and flexible booking options
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 flex-shrink-0" />
                    Sustainable and responsible tourism practices
                  </li>
                </ul>
              </div>
              <Button asChild size="lg"   className=" bg-blue-600 text-white hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors duration-300"
>
                <Link href="/services">Explore Our Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(216,12%,28%)] mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Passion for Travel</h3>
              <p className="text-gray-600">
                We live and breathe travel. Our passion drives us to create experiences that ignite wanderlust and create lasting memories.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trust & Safety</h3>
              <p className="text-gray-600">
                Your safety and peace of mind are our top priorities. We ensure every aspect of your journey is secure and reliable.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cultural Respect</h3>
              <p className="text-gray-600">
                We promote responsible tourism that respects local cultures, environments, and communities wherever we go.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every detail, from planning to execution, ensuring your travel experience exceeds expectations.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personal Touch</h3>
              <p className="text-gray-600">
                Every traveler is unique. We customize each journey to match your interests, preferences, and travel style.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lasting Relationships</h3>
              <p className="text-gray-600">
                We build relationships that last beyond your trip, becoming your trusted partner for all future adventures.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(216,12%,28%)] mb-4">Our Travel Partners</h2>
            {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate travel experts dedicated to making your dreams come true
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <img 
                src="/hoffman_traveller_1.jpeg" 
                alt="Team member" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">HatMan</h3>
              <p className="text-primary font-medium mb-3">17 seat Ac Traveller</p>
              <p className="text-gray-600 text-sm">
                 HatMan, our reliable 17-seat AC Traveller, ensures comfortable and spacious journeys for small groups, perfect for intimate adventures across scenic destinations.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <img 
                src="/hoffman_zedone.jpg" 
                alt="Team member" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Gustavo</h3>
              <p className="text-primary font-medium mb-3">49 Seat AC Zedone</p>
              <p className="text-gray-600 text-sm">
              Gustavo, our spacious 49-seat AC Zedone, offers premium comfort for larger groups, making long-distance travel enjoyable and hassle-free.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <img 
                src="/hoffman_traveller_2.jpeg" 
                alt="Team member" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Sajanka</h3>
              <p className="text-primary font-medium mb-3">17 seat Ac Traveller</p>
              <p className="text-gray-600 text-sm">
               Sajanka, a versatile 17-seat AC Traveller, delivers cozy and air-conditioned rides, ideal for exploring hidden gems with smaller travel parties.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards & Recognition
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[hsl(216,12%,28%)] mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognized for excellence in travel and customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Best Travel Agency</h3>
              <p className="text-sm text-gray-600">Travel Excellence Awards 2023</p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Customer Choice Award</h3>
              <p className="text-sm text-gray-600">Tourism Industry Awards 2023</p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Sustainable Tourism</h3>
              <p className="text-sm text-gray-600">Green Travel Awards 2022</p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Innovation in Travel</h3>
              <p className="text-sm text-gray-600">Travel Tech Awards 2022</p>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you create memories that will last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
  {/* Button 1: White background, primary text */}
  <Button
    asChild
    size="lg"
    variant="secondary"
    className="bg-white text-primary hover:bg-gray-200 border border-primary"
  >
    <Link to="/services">Browse Packages</Link>
  </Button>

  {/* Button 2: Transparent background, white border and text; hover to white bg + primary text */}
  <Button
    asChild
    size="lg"
    variant="outline"
    className="border border-white text-white bg-transparent hover:bg-white hover:text-primary"
  >
    <Link to="/contact">Contact Us</Link>
  </Button>
</div>
        </div>
      </section>
    </div>
  );
}
