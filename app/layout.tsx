import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { PwaRegister } from "@/components/pwa-register";
import { PwaInstallButton } from "@/components/pwa-install-button";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://example-unscrambler.com"),
  title: {
    default: "Word Unscrambler Pro - Instant Scrabble and Word Finder",
    template: "%s | Word Unscrambler Pro"
  },
  description:
    "Unscramble letters instantly for Scrabble, Wordle, and Words With Friends. Fast, free, mobile-friendly word finder with wildcard support and advanced filters.",
  keywords: [
    "word unscrambler",
    "unscramble letters",
    "scrabble word finder",
    "words with friends helper",
    "wordle helper",
    "anagram solver"
  ],
  openGraph: {
    title: "Word Unscrambler Pro - Instant Word Finder",
    description:
      "Find valid words from scrambled letters instantly. Supports wildcards, filters, and sharing.",
    type: "website",
    url: "https://example-unscrambler.com",
    siteName: "Word Unscrambler Pro"
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Unscrambler Pro - Instant Word Finder",
    description: "Unscramble letters for Scrabble, Wordle, and more in milliseconds."
  },
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6247519976767626"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <header className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Free, instant, unlimited</p>
                <h1 className="text-2xl font-semibold sm:text-3xl">Word Unscrambler Pro</h1>
              </div>
              <div className="flex items-center gap-2">
                <PwaInstallButton />
                <ThemeToggle />
              </div>
            </header>
            {children}
          </div>
          <PwaRegister />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
