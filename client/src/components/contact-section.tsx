import { contactInfo } from "@/lib/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, MapPin, Mail, Video, Clock } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  contactPreference: z.boolean().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      contactPreference: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      setFormSuccess(true);
      reset();
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
        variant: "success",
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">Contact Us</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            We're here to help. Reach out to us with any questions, concerns, or to get involved with our organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Get in Touch</h3>
            
            {/* Contact Form */}
            <form id="contactForm" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-neutral-700 font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-neutral-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                  {...register("name")}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-neutral-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-neutral-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                  {...register("email")}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-neutral-700 font-semibold mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className={`w-full px-4 py-3 border ${errors.subject ? 'border-red-500' : 'border-neutral-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                  {...register("subject")}
                >
                  <option value="">Please select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="services">Services Information</option>
                  <option value="volunteer">Volunteer Opportunities</option>
                  <option value="donation">Donations & Support</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-neutral-700 font-semibold mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-neutral-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                  {...register("message")}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="contact-preference"
                  className="h-5 w-5 text-primary focus:ring-primary"
                  {...register("contactPreference")}
                />
                <label htmlFor="contact-preference" className="ml-2 text-neutral-700">
                  I prefer to be contacted via video call in sign language
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-150 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
            
            {/* Form Success Message */}
            {formSuccess && (
              <div className="mt-6 p-4 bg-accent bg-opacity-20 border border-accent text-accent rounded-lg">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <p>Your message has been sent successfully. We'll get back to you soon!</p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-8">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Our Location</h4>
                    <p className="text-neutral-700">
                      {contactInfo.address.line1}<br />
                      {contactInfo.address.line2}<br />
                      {contactInfo.address.city}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-neutral-700">{contactInfo.email}</p>
                    <p className="text-neutral-600 text-sm mt-1">We respond to emails within 1-2 business days</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Video Relay Service</h4>
                    <p className="text-neutral-700">VRS: {contactInfo.vrs}</p>
                    <p className="text-neutral-600 text-sm mt-1">Available Monday-Friday, 9am-5pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Office Hours</h4>
                    <p className="text-neutral-700">
                      {contactInfo.officeHours.weekdays}<br />
                      {contactInfo.officeHours.saturday}<br />
                      {contactInfo.officeHours.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Map Placeholder */}
              <div className="h-64 bg-neutral-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=800&q=80"
                  alt="Map location of Deaf Welfare Society office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md">
                    <p className="font-semibold">Interactive Map</p>
                    <p className="text-sm text-neutral-600">Click to open directions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
