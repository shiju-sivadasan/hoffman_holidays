import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Hoffman Holidays</h3>
            <p className="text-gray-300 mb-6">
              Creating unforgettable travel experiences for adventurers worldwide since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Popular Destinations</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Munnar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Wagamon
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Dandeli
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Uduppi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Ladakh
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Kashmir
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
            <p className="text-gray-300 mb-4">
              Subscribe for travel tips and exclusive deals!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 mb-6">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary"
                required
              />
              <Button type="submit"   className="w-full bg-blue-600 text-white hover:bg-white hover:text-blue-600 border border-blue-600 transition-colors duration-300"
>
                Subscribe
              </Button>
            </form>

            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +91 9562746067
                <br></br>
                +91 9400846067
                <br></br>
                +91 8289866836
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@hoffmanholidays.com
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Thrissur, Kerala, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 Hoffman Holidays Official. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-300">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}