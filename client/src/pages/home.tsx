import { useState, useEffect, useRef } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import EventsSection from "@/components/events-section";
import ResourcesSection from "@/components/resources-section";
import GallerySection from "@/components/gallery-section";
import ContactSection from "@/components/contact-section";
import NewsletterSection from "@/components/newsletter-section";
import AccessibilityToolbar from "@/components/accessibility-toolbar";

export default function Home() {
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  // Add refs for all sections we want to animate on scroll
  const sectionsToObserve = [
    'services', 'about', 'events', 'resources', 'gallery', 'contact', 'newsletter'
  ];

  const toggleAccessibilityToolbar = () => {
    setAccessibilityOpen(!accessibilityOpen);
  };

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Intersection Observer for section animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const elements = document.querySelectorAll('.section-transition');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Smooth scrolling for anchor links with offset for fixed header
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href;
          
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          const headerOffset = 80; // Height of fixed header + some padding
          
          if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className={`${highContrast ? 'high-contrast' : ''}`}>
      <AccessibilityToolbar 
        visible={accessibilityOpen}
        onClose={toggleAccessibilityToolbar}
        onFontSizeChange={setFontSize}
        onContrastToggle={setHighContrast}
        fontSize={fontSize}
        highContrast={highContrast}
      />
      
      <Header onAccessibilityClick={toggleAccessibilityToolbar} />
      
      <main className="pt-20"> {/* Add padding to account for fixed header */}
        <HeroSection />
        
        <div className="section-transition" ref={el => sectionRefs.current['services'] = el}>
          <ServicesSection />
        </div>
        
        <div className="section-transition" ref={el => sectionRefs.current['about'] = el}>
          <AboutSection />
        </div>
        
        <div className="section-transition" ref={el => sectionRefs.current['events'] = el}>
          <EventsSection />
        </div>
        
        <div className="section-transition" ref={el => sectionRefs.current['resources'] = el}>
          <ResourcesSection />
        </div>
        
        <div className="section-transition" ref={el => sectionRefs.current['gallery'] = el}>
          <GallerySection />
        </div>
        
        <div className="section-transition" ref={el => sectionRefs.current['contact'] = el}>
          <ContactSection />
        </div>
        
        <div className="section-transition" ref={el => sectionRefs.current['newsletter'] = el}>
          <NewsletterSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
