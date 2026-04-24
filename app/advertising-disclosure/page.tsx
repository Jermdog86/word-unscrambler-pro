import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertising Disclosure & Policy",
  description:
    "Comprehensive advertising disclosure for Word Unscrambler Pro, including Google AdSense policy, ad placement principles, and sponsored content policy.",
  alternates: {
    canonical: "/advertising-disclosure"
  }
};

export default function AdvertisingDisclosurePage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <h2 className="text-3xl font-semibold">Advertising Disclosure & Policy</h2>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Overview</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            Word Unscrambler Pro displays advertising to support free access to our tools and educational content. We are committed to maintaining a
            positive user experience while complying with all relevant advertising platform policies.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Google AdSense</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            This website uses Google AdSense, a contextual advertising service operated by Google, Inc. Google AdSense helps us monetize our content
            while maintaining editorial independence.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground sm:text-base">
            <li>
              <strong>Publisher ID:</strong> ca-pub-6247519976767626
            </li>
            <li>
              <strong>Ad Format:</strong> Responsive display ads integrated throughout the site
            </li>
            <li>
              <strong>Data Usage:</strong> Google AdSense uses cookies and similar tracking technologies to serve personalized ads based on your
              interests. For information about Google&apos;s data practices, see{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Ad Placement & User Experience</h3>
          <div className="space-y-2 text-sm text-muted-foreground sm:text-base">
            <p>Our ad placement strategy prioritizes user experience:</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Ads are clearly separated from core tool output and editorial content</li>
              <li>Ad density complies with Google AdSense program policies</li>
              <li>Blog content includes contextual ads but maintains readability and content focus</li>
              <li>Mobile users see responsive ad formats optimized for smaller screens</li>
              <li>Ads do not interfere with essential functionality or word lookup results</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Editorial Integrity</h3>
          <div className="space-y-2 text-sm text-muted-foreground sm:text-base">
            <p>We maintain strict editorial standards:</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Ads do not determine our word rankings, recommendations, or article conclusions</li>
              <li>Blog content is created independently based on strategy expertise, not advertiser interests</li>
              <li>We do not accept payment for favorable coverage or rankings</li>
              <li>All editorial decisions are made based on user value and content quality</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Sponsored Content Policy</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            We do not publish paid endorsements disguised as independent advice. If sponsored content or paid partnerships are ever published on our
            site, they will be clearly labeled as &quot;Sponsored,&quot; &quot;Advertisement,&quot; or &quot;Paid Partnership&quot; in accordance with FTC guidelines and platform
            policies.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Affiliate Links</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            Word Unscrambler Pro does not currently use affiliate marketing. If we add affiliate links in the future, they will be clearly disclosed.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Cookie & Tracking Disclosure</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            Google AdSense and Google Analytics use cookies and similar technologies to track user behavior for advertising and analytics purposes.
            Users can opt out of personalized ads by visiting the{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Google Ads Settings
            </a>{" "}
            or by using browser-level ad blocking tools.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Compliance & Standards</h3>
          <div className="space-y-2 text-sm text-muted-foreground sm:text-base">
            <p>We adhere to the following standards and regulations:</p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Google AdSense Program Policies</li>
              <li>FTC Endorsement Guides and Standards</li>
              <li>GDPR and privacy regulations where applicable</li>
              <li>CAN-SPAM Act (if sending promotional emails)</li>
              <li>Platform-specific advertising policies</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Quality & Transparency</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            We continuously monitor ad quality and relevance. If you notice an ad that violates our standards, appears malicious, or is otherwise
            problematic, please contact us and include:
          </p>
          <ul className="ml-4 list-inside list-disc space-y-1 text-sm text-muted-foreground sm:text-base">
            <li>The page URL where the ad appeared</li>
            <li>A screenshot or description of the ad</li>
            <li>Why you believe the ad is inappropriate or violates policy</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Contact & Questions</h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            If you have questions about our advertising practices, privacy policy, or this disclosure, please{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact us
            </a>
            .
          </p>
        </section>

        <section className="space-y-3 border-t border-border/70 pt-6">
          <p className="text-xs text-muted-foreground">Last updated: April 2026</p>
        </section>
      </div>
    </main>
  );
}
