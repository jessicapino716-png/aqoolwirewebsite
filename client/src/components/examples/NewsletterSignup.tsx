import NewsletterSignup from '../NewsletterSignup';

export default function NewsletterSignupExample() {
  return (
    <div className="space-y-8 p-6 max-w-md mx-auto">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Newsletter Signup</h3>
        <NewsletterSignup />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Inline Newsletter Signup</h3>
        <NewsletterSignup variant="inline" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Sidebar Newsletter Signup</h3>
        <NewsletterSignup variant="sidebar" />
      </div>
    </div>
  );
}