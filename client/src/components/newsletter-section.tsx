import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/subscribe", { email });
      
      toast({
        title: "Subscribed!",
        description: "You have been successfully subscribed to our newsletter.",
        variant: "success",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Stay Connected</h2>
          <p className="text-lg text-white text-opacity-90 mb-8">
            Subscribe to our newsletter to receive updates about events, programs, and important information for the deaf community.
          </p>
          
          <form 
            className="flex flex-col sm:flex-row max-w-lg mx-auto mb-6"
            onSubmit={handleSubmit}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg sm:rounded-r-none mb-3 sm:mb-0 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="bg-secondary text-white font-bold px-6 py-3 rounded-lg sm:rounded-l-none hover:bg-opacity-90 transition duration-150 disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          
          <div className="text-white text-opacity-80 text-sm">
            We respect your privacy and will never share your information.
          </div>
        </div>
      </div>
    </section>
  );
}
