import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Word Unscrambler Pro, including analytics, cookies, and advertising disclosures.",
  alternates: {
    canonical: "/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Privacy Policy</h2>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground sm:text-base">
        <p>
          This website may use cookies, local storage, and analytics tools to improve performance, measure usage patterns, and
          enhance user experience.
        </p>
        <p>
          Third-party advertising vendors, including Google, may use cookies to serve ads based on prior visits to this and other
          websites. Users may opt out of personalized advertising by visiting Ads Settings.
        </p>
        <p>
          We do not sell personal information. If you contact us directly, we only use your information to respond to your request.
        </p>
        <p>
          This policy may be updated periodically. Material changes will be reflected on this page with an updated effective date.
        </p>
        <p>Effective date: April 21, 2026</p>
      </div>
    </main>
  );
}
