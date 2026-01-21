import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ backgroundColor: '#0a1628' }}
    >
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-16 w-16 text-cyan-400" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Page Not Found</h2>
        
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/">
          <Button 
            className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
