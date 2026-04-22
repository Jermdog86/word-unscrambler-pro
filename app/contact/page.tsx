import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Word Unscrambler Pro team for support, feedback, correction requests, or business inquiries.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        For support, corrections, policy questions, or business inquiries, email us at:
      </p>
      <p className="mt-2 text-base font-medium">contact@reflectify.org</p>
      <p className="mt-4 text-sm text-muted-foreground sm:text-base">
        We typically respond within 2 business days. If you are reporting a content issue, include the page URL and your suggested
        correction.
      </p>
    </main>
  );
}
