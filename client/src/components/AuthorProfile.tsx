import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Mail, MapPin } from "lucide-react";

interface Author {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  expertise: string[];
  imageUrl: string;
  social: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

interface AuthorProfileProps {
  author: Author;
  variant?: "full" | "compact";
}

export default function AuthorProfile({ author, variant = "full" }: AuthorProfileProps) {
  if (variant === "compact") {
    return (
      <Card className="p-4" data-testid={`card-author-compact-${author.id}`}>
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={author.imageUrl}
              alt={author.name}
              className="w-16 h-16 rounded-full object-cover"
              data-testid={`img-author-compact-${author.id}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg" data-testid={`text-author-compact-name-${author.id}`}>
              {author.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2" data-testid={`text-author-compact-title-${author.id}`}>
              {author.title}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" />
              <span data-testid={`text-author-compact-location-${author.id}`}>{author.location}</span>
            </div>
            <div className="flex gap-1">
              {author.social.twitter && (
                <Button variant="ghost" size="icon" className="h-6 w-6" data-testid={`button-author-compact-twitter-${author.id}`}>
                  <Twitter className="h-3 w-3" />
                </Button>
              )}
              {author.social.linkedin && (
                <Button variant="ghost" size="icon" className="h-6 w-6" data-testid={`button-author-compact-linkedin-${author.id}`}>
                  <Linkedin className="h-3 w-3" />
                </Button>
              )}
              {author.social.email && (
                <Button variant="ghost" size="icon" className="h-6 w-6" data-testid={`button-author-compact-email-${author.id}`}>
                  <Mail className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card data-testid={`card-author-full-${author.id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Author Image */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={author.imageUrl}
              alt={author.name}
              className="w-32 h-32 rounded-full object-cover"
              data-testid={`img-author-full-${author.id}`}
            />
          </div>
          
          {/* Author Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2" data-testid={`text-author-full-name-${author.id}`}>
              {author.name}
            </h2>
            <p className="text-lg text-muted-foreground mb-2" data-testid={`text-author-full-title-${author.id}`}>
              {author.title}
            </p>
            
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground" data-testid={`text-author-full-location-${author.id}`}>
                {author.location}
              </span>
            </div>
            
            <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`text-author-full-bio-${author.id}`}>
              {author.bio}
            </p>
            
            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {author.expertise.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  data-testid={`badge-author-expertise-${author.id}-${index}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex gap-2 justify-center md:justify-start">
              {author.social.twitter && (
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid={`button-author-full-twitter-${author.id}`}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              )}
              {author.social.linkedin && (
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid={`button-author-full-linkedin-${author.id}`}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              )}
              {author.social.email && (
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid={`button-author-full-email-${author.id}`}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}