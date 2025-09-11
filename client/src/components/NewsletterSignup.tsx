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
    
    // TODO: Remove mock functionality - integrate with newsletter service
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    console.log('Newsletter signup submitted for:', email);
    setIsSubscribed(true);
    setIsLoading(false);
    
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive our weekly AI policy newsletter.",
    });
  };

  if (variant === "inline") {
    return (
      <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <div className="flex-1">
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
          disabled={!email || isLoading || isSubscribed}
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
              className="w-full"
              disabled={!email || isLoading || isSubscribed}
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
        <CardDescription data-testid="text-newsletter-card-description">
          Join 1,000+ professionals receiving weekly insights on AI regulation and policy developments in Saudi Arabia and the GCC.
        </CardDescription>
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
            className="w-full"
            disabled={!email || isLoading || isSubscribed}
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