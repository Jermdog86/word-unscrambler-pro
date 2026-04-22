import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Word Unscrambler Pro, including acceptable use, liability limits, and service terms.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Terms of Use</h2>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground sm:text-base">
        <p>
          By using this website, you agree to these terms. If you do not agree, please discontinue use.
        </p>
        <p>
          This service is provided for informational and educational purposes. We make reasonable efforts to keep content accurate,
          but we cannot guarantee completeness or suitability for every use case.
        </p>
        <p>
          You agree not to abuse, scrape in a way that harms service availability, or attempt to interfere with site operations.
        </p>
        <p>
          We may update these terms periodically. Continued use of the site after changes indicates acceptance of the revised terms.
        </p>
        <p>Effective date: April 21, 2026</p>
      </div>
    </main>
  );
}
