import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">About Deaf Welfare Society</h2>
            <p className="text-lg text-neutral-700 mb-6">
              Founded in 1985, the Deaf Welfare Society has been at the forefront of advocating for the rights and wellbeing of the deaf community for over 35 years.
            </p>
            <p className="text-lg text-neutral-700 mb-6">
              Our organization was established by a group of deaf activists and allies who recognized the need for comprehensive support services and advocacy for deaf individuals.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <span className="block text-3xl font-bold text-primary mb-2">35+</span>
                <span className="text-neutral-700">Years of Service</span>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <span className="block text-3xl font-bold text-secondary mb-2">5,000+</span>
                <span className="text-neutral-700">Community Members</span>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <span className="block text-3xl font-bold text-accent mb-2">20+</span>
                <span className="text-neutral-700">Programs</span>
              </div>
              <div className="bg-neutral-50 p-4 rounded-lg text-center">
                <span className="block text-3xl font-bold text-primary mb-2">100+</span>
                <span className="text-neutral-700">Partners</span>
              </div>
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-150"
            >
              Our Full Story
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80" 
                  alt="Group of people using sign language" 
                  className="rounded-lg shadow-md h-48 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=600&q=80" 
                  alt="Community event at the Deaf Welfare Society" 
                  className="rounded-lg shadow-md h-64 w-full object-cover"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1573497620292-4c9d2809b575?auto=format&fit=crop&w=600&q=80" 
                  alt="Sign language class in progress" 
                  className="rounded-lg shadow-md h-64 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80" 
                  alt="Team members of the Deaf Welfare Society" 
                  className="rounded-lg shadow-md h-48 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
