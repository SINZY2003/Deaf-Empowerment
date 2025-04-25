import { resources } from "@/lib/constants";
import { 
  Check, 
  ArrowRight, 
  Download, 
  Mail 
} from "lucide-react";
import { 
  FaBook, 
  FaGavel, 
  FaTools 
} from "react-icons/fa";

export default function ResourcesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "book":
        return <FaBook className="text-xl text-primary" />;
      case "gavel":
        return <FaGavel className="text-xl text-secondary" />;
      case "tools":
        return <FaTools className="text-xl text-accent" />;
      default:
        return null;
    }
  };

  const getIconBg = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary bg-opacity-20";
      case "secondary":
        return "bg-secondary bg-opacity-20";
      case "accent":
        return "bg-accent bg-opacity-20";
      default:
        return "bg-neutral-200";
    }
  };

  const getLinkColor = (color: string) => {
    switch (color) {
      case "primary":
        return "hover:text-primary";
      case "secondary":
        return "hover:text-secondary";
      case "accent":
        return "hover:text-accent";
      default:
        return "hover:text-neutral-800";
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "accent":
        return "text-accent";
      default:
        return "text-neutral-800";
    }
  };

  return (
    <section id="resources" className="py-16 bg-primary bg-opacity-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">Resources</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Helpful resources for the deaf and hard of hearing community and their allies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${getIconBg(resource.color)} rounded-full flex items-center justify-center mr-4`}>
                  {getIcon(resource.icon)}
                </div>
                <h3 className="text-xl font-bold">{resource.title}</h3>
              </div>
              <ul className="space-y-3 mb-6">
                {resource.links.map((link, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-accent mr-2" />
                    <a href={link.url} className={`text-neutral-700 ${getLinkColor(resource.color)}`}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#" className={`inline-flex items-center ${getTextColor(resource.color)} font-semibold hover:underline`}>
                {resource.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Download Resource Guide */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">Community Resource Guide</h3>
              <p className="text-neutral-700 mb-4">
                Our comprehensive resource guide includes detailed information about local, regional, and national resources for the deaf and hard of hearing community.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="#" className="bg-primary text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </a>
                <a href="#" className="bg-secondary text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Request Print Copy
                </a>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=600&q=80" 
                alt="Resource Guide Cover" 
                className="rounded-lg shadow border-2 border-neutral-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
