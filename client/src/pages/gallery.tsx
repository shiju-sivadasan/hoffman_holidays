import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const galleryImages = [
  {
    id: 1,
    src: "/hoffman_gallery_1.jpg",
    alt: "Machu Picchu ancient ruins",
    // category: "destinations",
    // title: "Machu Picchu, Peru",
    // description: "Ancient Incan ruins perched high in the Andes mountains"
  },
  {
    id: 2,
    src: "/hoffman_gallery_2.jpg",
    alt: "Northern Lights aurora borealis",
    // category: "destinations",
    // title: "Northern Lights, Iceland",
    // description: "Spectacular aurora borealis dancing across the night sky"
  },
  {
    id: 3,
    src: "/hoffman_gallery_3.jpg",
    alt: "White water rafting adventure",
    // category: "activities",
    // title: "White Water Rafting",
    // description: "Thrilling adventure through rushing rapids"
  },
  {
    id: 4,
    src: "/hoffman_gallery_4.jpg",
    alt: "Japanese temple with cherry blossoms",
    // category: "culture",
    // title: "Cherry Blossoms, Japan",
    // description: "Traditional temple surrounded by beautiful sakura flowers"
  },
  {
    id: 5,
    src: "/hoffman_gallery_5.jpg",
    alt: "Scuba diving with coral reef",
    // category: "activities",
    // title: "Coral Reef Diving",
    // description: "Exploring vibrant underwater ecosystems"
  },
  {
    id: 6,
    src: "/hoffman_gallery_6.jpg",
    alt: "Desert camel caravan at sunset",
    // category: "destinations",
    // title: "Sahara Desert, Morocco",
    // description: "Camel caravan crossing golden sand dunes at sunset"
  },
  {
    id: 7,
    src: "/hoffman_traveller_1.jpeg",
    alt: "Mountain hiking trail with valley view",
    // category: "activities",
    // title: "Mountain Hiking",
    // description: "Breathtaking views from scenic mountain trails"
  },
  {
    id: 8,
    src: "/hoffman_zedone.jpg",
    alt: "Colorful street food market",
    // category: "culture",
    // title: "Street Food Markets",
    // description: "Vibrant local markets with authentic cuisine"
  },
  {
    id: 9,
    src: "/hoffman_traveller_2.jpeg",
    alt: "Maldives overwater bungalows",
    // category: "destinations",
    // title: "Maldives Paradise",
    // description: "Luxury overwater villas in crystal clear lagoons"
  },
  {
    id: 10,
    src: "/hoffman_gallery_1.jpg",
    alt: "African safari wildlife",
    // category: "activities",
    // title: "Safari Adventure",
    // description: "Close encounters with African wildlife"
  },
  {
    id: 11,
    src: "/hoffman_gallery_2.jpg",
    alt: "Eiffel Tower Paris",
    // category: "destinations",
    // title: "Paris, France",
    // description: "Iconic Eiffel Tower and romantic city views"
  },
  {
    id: 12,
    src: "/hoffman_gallery_3.jpg",
    alt: "Traditional cultural festival",
    // category: "culture",
    // title: "Cultural Festivals",
    // description: "Authentic local celebrations and traditions"
  }
];

const categories = [
  // { value: "all", label: "All Photos" },
  // { value: "destinations", label: "Destinations" },
  // { value: "activities", label: "Activities" },
  // { value: "culture", label: "Culture" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = galleryImages.filter(image => 
    selectedCategory === "all" || image.category === selectedCategory
  );

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Travel Gallery</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Explore stunning destinations and experiences from our travelers' journeys around the world
          </p>
        </div>
      </section>

      {/* Gallery Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? "btn-primary" : ""}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredImages.length} photos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                          <h3 className="font-semibold mb-1">{image.title}</h3>
                          <p className="text-sm opacity-90">{image.description}</p>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="capitalize">
                          {image.category}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl w-full">
                  <div className="relative">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                    />
                    <div className="mt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="capitalize">
                          {image.category}
                        </Badge>
                        <h2 className="text-xl font-semibold">{image.title}</h2>
                      </div>
                      <p className="text-gray-600">{image.description}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📷</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
              <p className="text-gray-500 mb-6">
                Try selecting a different category
              </p>
              <Button onClick={() => setSelectedCategory("all")}>
                View All Photos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[hsl(216,12%,28%)] mb-4">Follow Our Adventures</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our community on social media for daily travel inspiration and behind-the-scenes moments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg"   className="bg-white text-primary hover:bg-gray-200 border border-primary">
                Follow on Instagram
              </Button>
              <Button size="lg" variant="outline">
                Join Facebook Community
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {galleryImages.slice(0, 6).map((image) => (
              <div key={`social-${image.id}`} className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
