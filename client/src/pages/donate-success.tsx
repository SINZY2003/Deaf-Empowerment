import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function DonateSuccessPage() {
  useEffect(() => {
    // Trigger confetti animation when the component mounts
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Generate random color for confetti with colors on brand
      confetti({
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.4) },
        colors: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
        zIndex: 2000,
        spread: 70,
        disableForReducedMotion: true,
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>
      
      <Card className="shadow-lg border-green-200">
        <CardHeader className="text-center pb-0">
          <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-primary bg-clip-text text-transparent">
            Thank You For Your Donation!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Your generosity makes a real difference in our community
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 text-center">
          <p className="mb-6">
            A receipt for your donation has been sent to your email address.
            Please keep it for your tax records.
          </p>
          
          <div className="bg-muted p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-3 flex items-center justify-center">
              <Heart className="h-5 w-5 text-red-500 mr-2" fill="currentColor" />
              Your Impact
            </h3>
            <p>
              Your contribution helps provide essential services to the deaf community,
              including sign language interpreters, educational resources, and community programs.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Have questions about your donation? 
              Contact us at <span className="font-medium">support@deafwelfaresociety.org</span>
            </p>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-12 text-center">
        <h2 className="text-xl font-bold mb-4">Share Your Support</h2>
        <p className="text-muted-foreground mb-6">
          Help us spread the word about our mission by sharing on social media
        </p>
        
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>
          
          <Button variant="outline" className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Twitter
          </Button>
          
          <Button variant="outline" className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
}