import { navItems, contactInfo, footerLinks } from "@/lib/constants";
import { MapPin, Mail, Video } from "lucide-react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube 
} from "react-icons/fa";

export default function Footer() {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FaFacebookF />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      case "youtube":
        return <FaYoutube />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1569533816166-49d08c516a77?auto=format&fit=crop&w=80&q=80"
                alt="Deaf Welfare Society Logo"
                className="h-10 w-auto mr-3"
              />
              <div>
                <h3 className="text-xl font-serif font-bold">Deaf Welfare Society</h3>
              </div>
            </div>
            <p className="text-neutral-300 mb-4">
              Empowering the deaf and hard of hearing community through advocacy, 
              education, and support since 1985.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-white hover:text-secondary transition duration-150" 
                  aria-label={link.ariaLabel}
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-neutral-300 hover:text-white transition duration-150"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((program, index) => (
                <li key={index}>
                  <a 
                    href={program.href} 
                    className="text-neutral-300 hover:text-white transition duration-150"
                  >
                    {program.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-secondary flex-shrink-0" />
                <span className="text-neutral-300">
                  {contactInfo.address.line1}<br />
                  {contactInfo.address.city}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-secondary flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="text-neutral-300 hover:text-white transition duration-150"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center">
                <Video className="h-5 w-5 mr-3 text-secondary flex-shrink-0" />
                <span className="text-neutral-300">VRS: {contactInfo.vrs}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-700 text-center">
          <div className="flex justify-center space-x-4 mb-4 flex-wrap">
            {footerLinks.legal.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-neutral-300 hover:text-white transition duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Deaf Welfare Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
