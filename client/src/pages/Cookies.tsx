export default function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-black mb-8" data-testid="text-cookies-title">
            Cookie Policy
          </h1>
          
          <div className="text-sm text-gray-500 mb-8" data-testid="text-cookies-updated">
            Last updated: September 16, 2025
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-cookies-intro-title">
                What Are Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed" data-testid="text-cookies-intro">
                Cookies are small text files that are placed on your device when you visit The Aqool Wire website. They help us provide you with a better browsing experience by remembering your preferences, analyzing website traffic, and improving our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-cookies-types-title">
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-black mb-2">Essential Cookies</h3>
                  <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Required for basic website functionality</p>
                  <p className="text-gray-700 mb-2"><strong>Duration:</strong> Session and up to 1 year</p>
                  <p className="text-gray-700">These cookies are necessary for our website to function properly. They enable core features like security, network management, and accessibility. You cannot opt out of these cookies.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-black mb-2">Analytics Cookies</h3>
                  <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Help us understand how visitors use our website</p>
                  <p className="text-gray-700 mb-2"><strong>Duration:</strong> Up to 2 years</p>
                  <p className="text-gray-700">We use analytics tools to collect information about website usage, including pages visited, time spent, and user behavior. This helps us improve our content and user experience.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-black mb-2">Preference Cookies</h3>
                  <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Remember your settings and preferences</p>
                  <p className="text-gray-700 mb-2"><strong>Duration:</strong> Up to 1 year</p>
                  <p className="text-gray-700">These cookies remember your preferences such as language settings, newsletter subscription status, and other customization options to enhance your experience.</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-black mb-2">Marketing Cookies</h3>
                  <p className="text-gray-700 mb-2"><strong>Purpose:</strong> Track marketing effectiveness and personalize content</p>
                  <p className="text-gray-700 mb-2"><strong>Duration:</strong> Up to 1 year</p>
                  <p className="text-gray-700">We may use marketing cookies to measure the effectiveness of our campaigns and to provide more relevant content and advertisements.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-cookies-manage-title">
                How to Manage Cookies
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Browser Settings</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Most web browsers allow you to control cookies through their settings preferences. You can typically:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete existing cookies</li>
                    <li>Block all cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block third-party cookies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Browser-Specific Instructions</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-2">
                      <li><strong>Chrome:</strong> Settings {'>'} Privacy and security {'>'} Cookies and other site data</li>
                      <li><strong>Firefox:</strong> Options {'>'} Privacy & Security {'>'} Cookies and Site Data</li>
                      <li><strong>Safari:</strong> Preferences {'>'} Privacy {'>'} Manage Website Data</li>
                      <li><strong>Edge:</strong> Settings {'>'} Cookies and site permissions {'>'} Cookies and site data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-cookies-third-party-title">
                Third-Party Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use third-party services that set their own cookies on your device. These include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>ConvertKit:</strong> For newsletter subscription management</li>
                <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                These third-party services have their own privacy policies and cookie practices, which we encourage you to review.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-cookies-impact-title">
                Impact of Disabling Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While you can disable cookies, doing so may affect your experience on our website:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You may need to re-enter information on subsequent visits</li>
                <li>Certain features may not work properly</li>
                <li>You may see less relevant content</li>
                <li>Newsletter subscription functionality may be impaired</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-cookies-updates-title">
                Updates to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-cookies-consent-title">
                Your Consent
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By continuing to use our website, you consent to our use of cookies as described in this policy. If you do not agree to our use of cookies, please adjust your browser settings or discontinue use of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4" data-testid="text-cookies-contact-title">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700">
                  <strong>The Aqool Wire</strong><br/>
                  Email: privacy@theaqoolai.com<br/>
                  Or use our <a href="/contact" className="text-[#3b82f6] hover:underline">contact form</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}