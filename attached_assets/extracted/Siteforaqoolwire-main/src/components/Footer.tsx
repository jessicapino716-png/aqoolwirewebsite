import { InputField } from './FormField';
import { Button } from './Button';
import logo from 'figma:asset/8c95d8e715394a5b6ec0f9e82664a62ac343dc6b.png';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company */}
          <div>
            <div className="mb-6">
              <img src={logo} alt="AQOOL Wire" className="h-12 md:h-14" />
            </div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-muted hover:text-accent transition-colors">About</a></li>
              <li><a href="#contact" className="text-muted hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Intelligence */}
          <div>
            <h4 className="mb-4">Intelligence</h4>
            <ul className="space-y-3">
              <li><a href="#insights" className="text-muted hover:text-accent transition-colors">Insights</a></li>
              <li><a href="#reports" className="text-muted hover:text-accent transition-colors">Reports</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#regulatory-intelligence" className="text-muted hover:text-accent transition-colors">Regulatory Intelligence</a></li>
              <li><a href="#ai-investment-observatory" className="text-muted hover:text-accent transition-colors">AI Investment Observatory</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="mb-4">Newsletter</h4>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 bg-muted border border-border rounded-[12px] px-4 py-2 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
              <Button type="submit" size="sm">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Legal note */}
        <div className="pt-8 border-t border-border">
          <p className="text-muted text-sm max-w-3xl">
            AQOOL Wire uses lawful, non-confidential sources. We do not use or solicit non-public, material information.
          </p>
        </div>
      </div>
    </footer>
  );
}