import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-6 border border-[#00d4aa]/20">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-[#00d4aa]" />
        <h3 className="text-lg font-black text-white">Stay Informed</h3>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Get weekly insights on AI policy, regulation, and strategy in Saudi Arabia.
      </p>

      {isSuccess ? (
        <div
          className="flex items-center gap-2 text-[#00d4aa] text-sm font-semibold"
          role="alert"
          aria-live="polite"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Successfully subscribed!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Input
              type="email"
              placeholder="your.email@example.com"
              {...register("email")}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#00d4aa]/50"
              data-testid="input-newsletter-email"
              aria-label="Email address"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#00d4aa] to-[#00a888] text-[#0a0f1b] font-bold hover:scale-105 transition-transform cyan-glow"
            data-testid="button-newsletter-submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
