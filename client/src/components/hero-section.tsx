import { Play, Smile, Heart, HandMetal } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/20 dark:from-primary/10 dark:via-background dark:to-secondary/10"></div>
      
      {/* Main Hero Content */}
      <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Empowering the Deaf Community
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 dark:text-white/80 mb-8 leading-relaxed">
                Building bridges through communication, support, and advocacy for the deaf and hard of hearing community. Together we create a more inclusive world.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center"
                >
                  <Smile className="mr-2 h-5 w-5" />
                  Our Services
                </a>
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-secondary/50 transition-all duration-300 flex items-center"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Get Involved
                </a>
              </div>
              
              <div className="flex items-center mt-10 space-x-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white ${i === 1 ? 'bg-primary' : i === 2 ? 'bg-secondary' : i === 3 ? 'bg-accent' : 'bg-primary/80'} flex items-center justify-center text-white text-xs font-bold`}>
                      {i}K+
                    </div>
                  ))}
                </div>
                <div className="text-foreground/70 dark:text-white/70">
                  <span className="font-semibold text-foreground dark:text-white">15,000+</span> community members served across the country
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative scale-in">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=80"
                  alt="Diverse group of people in a community meeting using sign language"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium text-primary z-20 flex items-center">
                  <HandMetal className="h-3 w-3 mr-1" /> ASL Supported
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute w-20 h-20 rounded-full bg-primary/30 backdrop-blur-xl -top-10 -left-10 animate-pulse"></div>
              <div className="absolute w-16 h-16 rounded-full bg-secondary/30 backdrop-blur-xl -bottom-8 -right-8 animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Language Video Introduction */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 border border-border">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2">
              <div className="video-frame">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Sign language introduction video placeholder"
                />
                <div className="video-play-button">
                  <button
                    className="bg-gradient-to-r from-primary to-secondary text-white rounded-full p-5 shadow-lg backdrop-blur-sm hover:scale-110 transition-all duration-300"
                    aria-label="Play sign language introduction video"
                  >
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-center mt-3 text-foreground/60 dark:text-white/60 font-medium">
                ASL introduction to our organization • 3:45
              </p>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome to Our Community
              </h3>
              
              <p className="text-foreground/80 dark:text-white/80 mb-6 leading-relaxed">
                Our mission is to promote the welfare, rights, and advancement of deaf and hard of hearing individuals through advocacy, education, and community support. We believe in a world where everyone has equal access to communication.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-primary mb-1">35+</div>
                  <div className="text-sm text-foreground/70 dark:text-white/70">Years of Service</div>
                </div>
                <div className="bg-secondary/10 dark:bg-secondary/20 rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">100+</div>
                  <div className="text-sm text-foreground/70 dark:text-white/70">Programs</div>
                </div>
              </div>
              
              <div className="flex items-center mt-6 bg-accent/10 dark:bg-accent/20 rounded-lg p-3">
                <svg className="h-5 w-5 mr-2 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 9.3H3V19.5C3 19.9 3.1 20.3 3.3 20.7C3.5 21.1 3.7 21.4 4 21.6C4.3 21.9 4.6 22.1 5 22.2C5.4 22.4 5.7 22.5 6.1 22.5H17.9C18.3 22.5 18.7 22.4 19.1 22.2C19.5 22 19.8 21.8 20.1 21.6C20.4 21.3 20.6 21 20.7 20.7C20.9 20.3 21 19.9 21 19.5V9.3Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 6V7.5C21 7.9 20.9 8.1 20.7 8.3C20.5 8.5 20.3 8.6 20 8.6H3.9C3.6 8.6 3.4 8.5 3.2 8.3C3.1 8.1 3 7.9 3 7.5V6C3 5.6 3.1 5.4 3.2 5.2C3.4 5 3.6 4.9 3.9 4.9H20C20.3 4.9 20.5 5 20.7 5.2C20.9 5.4 21 5.7 21 6Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 1.5H13.5V4.5H10.5V1.5Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12V18.8" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.5 14.8L12 18.3L8.5 14.8" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-foreground/80 dark:text-white/80 text-sm">Closed captions available in English, Spanish, and ASL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
