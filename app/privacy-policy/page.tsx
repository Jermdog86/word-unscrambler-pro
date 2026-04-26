import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Word Unscrambler Pro covering ads, analytics, cookies, and your rights.",
  alternates: {
    canonical: "/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Privacy Policy for Word Unscrambler Pro</h2>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground sm:text-base">
        <p>Last updated: April 26, 2026</p>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">1. Introduction</h3>
          <p>Word Unscrambler Pro (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website https://www.unscramble.fyi/ (the &quot;Service&quot;).</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">2. Information We Collect</h3>
          <p>We do not collect any personal information. The word unscrambler tool runs entirely in your browser. We do not store any input you enter.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">3. Google AdSense</h3>
          <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this and other websites.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">4. Google Analytics</h3>
          <p>We use Google Analytics to understand how visitors use our site. This helps us improve the Service.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">5. Your Rights</h3>
          <p>You can disable cookies in your browser settings. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">6. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">7. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at contact@reflectify.org.</p>
        </section>
      </div>
    </main>
  );
}
