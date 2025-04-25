import { galleryImages } from "@/lib/constants";
import { Images } from "lucide-react";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">Community Gallery</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Highlights from our community events, programs, and activities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <a 
              key={image.id}
              href="#" 
              className="block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 relative group"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition duration-300 font-bold">
                  {image.caption}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center bg-white border-2 border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition duration-150"
          >
            View Full Gallery
            <Images className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
