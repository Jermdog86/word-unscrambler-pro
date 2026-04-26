import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Word Unscrambler Pro covering acceptable use, competitive play, and liability limits.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <main className="rounded-xl border border-border/70 bg-card/40 p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">Terms of Service for Word Unscrambler Pro</h2>
      <div className="mt-4 space-y-4 text-sm text-muted-foreground sm:text-base">
        <p>Last updated: April 26, 2026</p>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">1. Acceptance of Terms</h3>
          <p>By accessing or using Word Unscrambler Pro, you agree to these Terms of Service. If you do not agree, do not use the Service.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">2. Entertainment and Informational Use</h3>
          <p>The Service is provided for entertainment, educational, and informational purposes only. Results are generated automatically and may not be complete, accurate, or suitable for every game, dictionary, tournament, or ruleset.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">3. Competitive Play</h3>
          <p>If you use this tool during competitive play, league play, or tournaments, you do so at your own risk. You are responsible for following the rules of the game, event, platform, or competition you participate in.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">4. Acceptable Use</h3>
          <p>You agree not to misuse the Service, interfere with its normal operation, attempt unauthorized access, or use automated scraping in a way that harms site stability or availability.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">5. No Warranty</h3>
          <p>The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied. We do not guarantee uninterrupted availability or error-free results.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">6. Limitation of Liability</h3>
          <p>To the fullest extent permitted by law, Word Unscrambler Pro and its operators are not liable for any losses, damages, disputes, penalties, or gameplay outcomes resulting from your use of the Service.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">7. Changes to These Terms</h3>
          <p>We may update these Terms of Service from time to time. Continued use of the Service after changes are posted means you accept the revised terms.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-foreground sm:text-lg">8. Contact</h3>
          <p>Questions about these terms can be sent to contact@reflectify.org.</p>
        </section>
      </div>
    </main>
  );
}
