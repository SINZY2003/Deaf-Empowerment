import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

// Form components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, AlertTriangle, ArrowLeft } from "lucide-react";

// Validation schema for donation form
const donationFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  amount: z.preprocess(
    (a) => parseFloat(a as string),
    z.number().positive("Amount must be positive").min(1, "Minimum donation amount is $1")
  ),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe public key');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// The payment form component
const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsProcessing(true);
    
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/donate/success",
        },
        redirect: "if_required"
      });

      if (error) {
        setPaymentStatus("error");
        setErrorMessage(error.message || "An unknown error occurred");
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded
        setPaymentStatus("success");
        toast({
          title: "Payment Successful",
          description: "Thank you for your donation!",
        });
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['/api/donations'] });
      }
    } catch (err) {
      setPaymentStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "An unknown error occurred");
      toast({
        title: "Payment Error",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Thank You For Your Donation!</h2>
        <p className="text-muted-foreground">
          Your contribution will help support our mission to empower the deaf community.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Return to Home Page</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {paymentStatus === "error" && (
        <Alert variant="destructive" className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Payment Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="w-full sm:w-auto"
        >
          {isProcessing ? "Processing..." : "Complete Donation"}
        </Button>
      </div>
    </form>
  );
};

// Initial donation form to collect user details
const DonationForm = ({ onSubmit, isLoading }: { 
  onSubmit: (data: DonationFormValues) => void;
  isLoading: boolean;
}) => {
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: 25,
      message: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donation Amount ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="25" 
                  min="1" 
                  step="1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Your message of support..." 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-2 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Continue to Payment"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Suggested donation amounts
const SuggestedAmounts = ({ onAmountSelect }: { 
  onAmountSelect: (amount: number) => void 
}) => {
  const suggestedAmounts = [10, 25, 50, 100, 250];
  
  return (
    <div className="py-4">
      <p className="text-sm font-medium mb-2">Suggested Amounts</p>
      <div className="grid grid-cols-5 gap-2">
        {suggestedAmounts.map((amount) => (
          <Button
            key={amount}
            type="button"
            variant="outline"
            onClick={() => onAmountSelect(amount)}
            className="text-center"
          >
            ${amount}
          </Button>
        ))}
      </div>
    </div>
  );
};

// Main donation page
export default function DonatePage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleDonationSubmit = async (data: DonationFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", data);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to create payment intent");
      }
      
      setClientSecret(result.clientSecret);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestedAmountSelect = (amount: number) => {
    document.querySelector<HTMLInputElement>('input[name="amount"]')!.value = amount.toString();
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
          Support Our Mission
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your donation helps us provide essential services and support to the deaf community.
          Together, we can create a more inclusive society.
        </p>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
          <CardDescription>
            All donations are secure and encrypted. 100% of your donation goes directly to supporting our programs.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm clientSecret={clientSecret} />
            </Elements>
          ) : (
            <>
              <DonationForm onSubmit={handleDonationSubmit} isLoading={isLoading} />
              <SuggestedAmounts onAmountSelect={handleSuggestedAmountSelect} />
            </>
          )}
        </CardContent>
        
        <CardFooter className="border-t pt-6 flex flex-col items-start">
          <div className="text-sm text-muted-foreground">
            <p>Your donation may be tax-deductible. A receipt will be emailed to you.</p>
            <p className="mt-2">Have questions? Contact us at <span className="font-medium">support@deafwelfaresociety.org</span></p>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">How Your Donation Helps</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>Providing sign language interpreters for medical appointments and emergencies</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>Supporting deaf children's education through specialized learning resources</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>Creating accessible community events and workshops</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            <span>Advocating for policy changes to improve accessibility</span>
          </li>
        </ul>
      </div>
    </div>
  );
}