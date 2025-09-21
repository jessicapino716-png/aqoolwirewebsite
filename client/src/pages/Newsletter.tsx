import NewsletterSignup from "@/components/NewsletterSignup";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle, Globe, Clock } from "lucide-react";

export default function Newsletter() {
  const benefits = [
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Weekly Insights",
      description: "Get the latest AI policy developments delivered every week"
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: "GCC Focus",
      description: "Specialized coverage of Saudi Arabia and the Gulf region"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      title: "Expert Analysis",
      description: "In-depth analysis from our team of policy experts"
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Straight from Riyadh",
      description: "Exclusive insights from the heart of Saudi Arabia's AI ecosystem"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight" data-testid="text-newsletter-title">
              Stay Ahead of AI Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4" data-testid="text-newsletter-subtitle">
              Join 1,000+ professionals getting weekly AI policy insights
            </p>
            <div className="text-lg text-[#3b82f6] font-medium" data-testid="text-newsletter-tagline">
              Straight from Riyadh
            </div>
          </div>

          {/* Main Newsletter Signup */}
          <div className="mb-16">
            <NewsletterSignup className="max-w-2xl mx-auto" />
          </div>

          {/* Benefits Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-black mb-12" data-testid="text-benefits-title">
              Why Subscribe to The Aqool Wire Newsletter?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow" data-testid={`card-benefit-${index}`}>
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-black mb-2" data-testid={`text-benefit-title-${index}`}>
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600" data-testid={`text-benefit-description-${index}`}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What You'll Get Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-black mb-8" data-testid="text-content-title">
              What You'll Get Every Week
            </h2>
            <div className="max-w-2xl mx-auto space-y-6 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-black">AI Policy Updates</p>
                  <p className="text-gray-600 text-sm">Latest regulatory developments and policy changes across the GCC</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-black">Market Analysis</p>
                  <p className="text-gray-600 text-sm">Deep dives into how policies affect AI innovation and business</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-black">Expert Commentary</p>
                  <p className="text-gray-600 text-sm">Insights from leading AI policy experts and industry leaders</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-black">Exclusive Reports</p>
                  <p className="text-gray-600 text-sm">Special reports and analysis not available anywhere else</p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                Join the leading professionals who trust The Aqool Wire for their AI policy insights
              </p>
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No spam, unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}