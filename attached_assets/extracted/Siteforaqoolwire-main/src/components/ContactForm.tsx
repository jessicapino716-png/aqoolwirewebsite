import { useState } from 'react';
import { InputField, TextareaField, SelectField } from './FormField';
import { Button } from './Button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    interest: '',
    message: '',
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <InputField
        label="Name"
        type="text"
        placeholder="Your name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <InputField
        label="Work Email"
        type="email"
        placeholder="your@company.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <InputField
        label="Organisation"
        type="text"
        placeholder="Your organisation"
        value={formData.organisation}
        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
        required
      />

      <SelectField
        label="Interest"
        options={[
          { value: '', label: 'Select your interest...' },
          { value: 'investor', label: 'Investor' },
          { value: 'solution-provider', label: 'Solution Provider' },
          { value: 'fund', label: 'Fund' },
          { value: 'other', label: 'Other' },
        ]}
        value={formData.interest}
        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
        required
      />

      <TextareaField
        label="Message"
        placeholder="Tell us about your deployment path..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 w-5 h-5 rounded bg-surface border border-border accent-accent"
          required
        />
        <label htmlFor="consent" className="text-muted text-sm">
          I consent to AQOOL Wire contacting me about relevant intelligence and advisory services.
        </label>
      </div>

      <Button type="submit" size="lg">Send</Button>
    </form>
  );
}
