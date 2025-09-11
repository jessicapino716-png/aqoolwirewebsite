import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Zap, Users, Shield } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  features: string[];
  pros: string[];
  cons: string[];
  pricing: string;
  website: string;
  imageUrl: string;
}

interface ToolHighlightProps {
  tool: Tool;
  variant?: "featured" | "compact";
}

export default function ToolHighlight({ tool, variant = "featured" }: ToolHighlightProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (variant === "compact") {
    return (
      <Card className="hover-elevate group cursor-pointer" data-testid={`card-tool-compact-${tool.id}`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <img
                src={tool.imageUrl}
                alt={tool.name}
                className="w-16 h-16 rounded-lg object-cover"
                data-testid={`img-tool-compact-${tool.id}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors" data-testid={`text-tool-compact-name-${tool.id}`}>
                    {tool.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs mt-1" data-testid={`badge-tool-compact-category-${tool.id}`}>
                    {tool.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {renderStars(tool.rating)}
                  <span className="text-xs text-muted-foreground ml-1" data-testid={`text-tool-compact-rating-${tool.id}`}>
                    {tool.rating}/5
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-tool-compact-description-${tool.id}`}>
                {tool.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-tool-featured-${tool.id}`}>
      {/* Tool Image */}
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="w-full h-full object-cover"
          data-testid={`img-tool-featured-${tool.id}`}
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" data-testid={`badge-tool-featured-category-${tool.id}`}>
                {tool.category}
              </Badge>
              <Badge variant="outline" data-testid={`badge-tool-featured-pricing-${tool.id}`}>
                {tool.pricing}
              </Badge>
            </div>
            <CardTitle className="text-xl" data-testid={`text-tool-featured-name-${tool.id}`}>
              {tool.name}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1 ml-4">
            {renderStars(tool.rating)}
            <span className="text-sm text-muted-foreground ml-1" data-testid={`text-tool-featured-rating-${tool.id}`}>
              {tool.rating}/5
            </span>
          </div>
        </div>
        <CardDescription data-testid={`text-tool-featured-description-${tool.id}`}>
          {tool.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Features */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            Key Features
          </h4>
          <div className="flex flex-wrap gap-1">
            {tool.features.map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs"
                data-testid={`badge-tool-feature-${tool.id}-${index}`}
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center text-green-600 dark:text-green-400">
              <Users className="h-4 w-4 mr-2" />
              Pros
            </h4>
            <ul className="space-y-1">
              {tool.pros.slice(0, 3).map((pro, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start"
                  data-testid={`text-tool-pro-${tool.id}-${index}`}
                >
                  <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center text-amber-600 dark:text-amber-400">
              <Shield className="h-4 w-4 mr-2" />
              Considerations
            </h4>
            <ul className="space-y-1">
              {tool.cons.slice(0, 3).map((con, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start"
                  data-testid={`text-tool-con-${tool.id}-${index}`}
                >
                  <span className="text-amber-500 mr-2 flex-shrink-0">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <Button className="w-full" data-testid={`button-tool-visit-${tool.id}`}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit {tool.name}
        </Button>
      </CardContent>
    </Card>
  );
}