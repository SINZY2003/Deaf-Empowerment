import { useState, useEffect } from "react";
import { navItems } from "@/lib/constants";
import { Menu, Accessibility, X, Sun, MoonStar, Heart } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onAccessibilityClick: () => void;
}

export default function Header({ onAccessibilityClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header 
      className={`bg-white dark:bg-gray-900 fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mr-4 shadow-md">
              DWS
            </div>
            <div className="slide-in-right">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Deaf Welfare Society
              </h1>
              <p className="text-sm text-foreground/70 dark:text-white/70">
                Empowering through inclusion
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`relative px-3 py-2 rounded-md font-medium text-sm ${
                  index === 0
                    ? "text-primary dark:text-primary-foreground"
                    : "text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
                } transition-all duration-200 hover:bg-primary/5 dark:hover:bg-primary/10`}
              >
                {item.label}
                {index === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
                )}
              </a>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-full hover:bg-muted transition-all duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonStar className="h-5 w-5 text-slate-700" />
              )}
            </button>

            {/* Donate Button */}
            <Link href="/donate">
              <button className="ml-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-md hover:shadow-md transition-all duration-200 flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Donate
              </button>
            </Link>
            
            {/* Accessibility Button */}
            <button
              id="accessibilityButton"
              className="ml-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md hover:shadow-md transition-all duration-200 flex items-center"
              aria-label="Open accessibility options"
              onClick={onAccessibilityClick}
            >
              <Accessibility className="h-4 w-4 mr-2" />
              Accessibility
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleDarkMode}
              className="mr-2 p-2 rounded-full hover:bg-muted transition-all duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonStar className="h-5 w-5 text-slate-700" />
              )}
            </button>
            
            <button
              id="mobileMenuButton"
              className="p-2 rounded-md text-foreground/90 hover:bg-muted transition-all duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobileMenu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-2 space-y-1 rounded-md bg-white dark:bg-gray-800 shadow-lg">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`block py-2 px-4 ${
                  index === 0
                    ? "text-primary font-medium dark:text-primary-foreground"
                    : "text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
                } hover:bg-muted transition-all duration-200`}
              >
                {item.label}
              </a>
            ))}
            <Link href="/donate">
              <button className="w-full text-left block py-2 px-4 text-red-600 dark:text-red-400 hover:bg-muted transition-all duration-200 font-medium flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Donate
              </button>
            </Link>
            <button
              id="mobileAccessibilityButton"
              className="w-full text-left py-2 px-4 text-accent dark:text-accent-foreground hover:bg-muted transition-all duration-200 font-medium flex items-center"
              onClick={onAccessibilityClick}
            >
              <Accessibility className="h-4 w-4 mr-2" />
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
