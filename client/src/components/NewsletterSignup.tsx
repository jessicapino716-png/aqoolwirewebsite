import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "default" | "inline" | "sidebar";
  className?: string;
}

export default function NewsletterSignup({ variant = "default", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "destructive",
          });
        } else {
          throw new Error(data.error || 'Failed to subscribe');
        }
      } else {
        setIsSubscribed(true);
        setEmail("");
        toast({
          title: "Successfully subscribed!",
          description: data.emailSent 
            ? "Check your email for a welcome message!" 
            : "You'll receive our weekly AI policy newsletter.",
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "inline") {
    return (
      <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <div className="flex-1 min-w-48">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSubscribed}
            data-testid="input-newsletter-inline"
          />
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || isSubscribed}
          className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white"
          data-testid="button-newsletter-inline"
        >
          {isLoading ? "Subscribing..." : isSubscribed ? "Subscribed!" : "Subscribe"}
        </Button>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="font-semibold" data-testid="text-newsletter-title">Weekly Newsletter</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4" data-testid="text-newsletter-description">
            Get the latest AI policy insights delivered to your inbox every week.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSubscribed}
              data-testid="input-newsletter-sidebar"
            />
            <Button 
              type="submit"
              className="w-full bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white"
              disabled={isLoading || isSubscribed}
              data-testid="button-newsletter-sidebar"
            >
              {isLoading ? (
                "Subscribing..."
              ) : isSubscribed ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle data-testid="text-newsletter-card-title">Stay Updated on AI Policy</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSubscribed}
            data-testid="input-newsletter-default"
          />
          <Button 
            type="submit"
            className="w-full bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white"
            disabled={isLoading || isSubscribed}
            data-testid="button-newsletter-default"
          >
            {isLoading ? (
              "Subscribing..."
            ) : isSubscribed ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Successfully Subscribed!
              </>
            ) : (
              "Subscribe to Newsletter"
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          No spam, unsubscribe at any time. Read our <a href="/privacy" className="underline">privacy policy</a>.
        </p>
      </CardContent>
    </Card>
  );
}