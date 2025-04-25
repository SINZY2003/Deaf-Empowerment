import { services } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { 
  FaHands, 
  FaUsers, 
  FaGraduationCap, 
  FaBriefcase, 
  FaVideo, 
  FaChild 
} from "react-icons/fa";

export default function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "hands":
        return <FaHands className="text-2xl text-primary" />;
      case "users":
        return <FaUsers className="text-2xl text-secondary" />;
      case "graduation-cap":
        return <FaGraduationCap className="text-2xl text-accent" />;
      case "briefcase":
        return <FaBriefcase className="text-2xl text-primary" />;
      case "video":
        return <FaVideo className="text-2xl text-secondary" />;
      case "child":
        return <FaChild className="text-2xl text-accent" />;
      default:
        return null;
    }
  };

  const getBgColor = (color: string) => {
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

  const getBorderColor = (color: string) => {
    switch (color) {
      case "primary":
        return "border-primary";
      case "secondary":
        return "border-secondary";
      case "accent":
        return "border-accent";
      default:
        return "border-neutral-400";
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
    <section id="services" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">Our Services</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Comprehensive support services designed to meet the unique needs of deaf and hard of hearing individuals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg border-t-4 ${getBorderColor(service.color)}`}
            >
              <div className="p-6">
                <div className={`w-16 h-16 ${getBgColor(service.color)} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{service.title}</h3>
                <p className="text-neutral-700 text-center mb-4">{service.description}</p>
                <div className="flex justify-center">
                  <a href="#" className={`inline-flex items-center ${getTextColor(service.color)} font-semibold hover:underline`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
