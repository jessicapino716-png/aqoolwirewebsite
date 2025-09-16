export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-8" data-testid="text-privacy-title">
            Privacy Policy
          </h1>
          
          <div className="text-sm text-gray-500 mb-8" data-testid="text-privacy-updated">
            Last updated: September 16, 2025
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-intro-title">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed" data-testid="text-privacy-intro">
                The Aqool AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. This policy applies to all users of The Aqool AI news platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-collection-title">
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Personal Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may collect personal information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                    <li>Email address (for newsletter subscriptions)</li>
                    <li>Name (when contacting us or subscribing to services)</li>
                    <li>Contact information submitted through our contact forms</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Usage Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We automatically collect information about your interaction with our website:
                  </p>
                  <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                    <li>IP address and browser information</li>
                    <li>Pages viewed and time spent on our site</li>
                    <li>Referral sources and search terms</li>
                    <li>Device and browser characteristics</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-use-title">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To deliver our newsletter and other communications</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website content and user experience</li>
                <li>To analyze website usage and optimize our services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-sharing-title">
                Information Sharing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Service providers who assist us in operating our website (email service providers, analytics tools)</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-cookies-title">
                Cookies and Tracking
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings. For more detailed information, please see our Cookie Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-rights-title">
                Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Right to access and receive a copy of your personal information</li>
                <li>Right to correct inaccurate or incomplete information</li>
                <li>Right to request deletion of your personal information</li>
                <li>Right to object to or restrict certain processing</li>
                <li>Right to unsubscribe from our communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-security-title">
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-contact-title">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>The Aqool AI</strong><br/>
                  Email: privacy@theaqoolai.com<br/>
                  Or use our <a href="/contact" className="text-[#3b82f6] hover:underline">contact form</a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-privacy-updates-title">
                Policy Updates
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}