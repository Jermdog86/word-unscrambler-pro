"use client";

import { useEffect } from "react";

type AdPlaceholderProps = {
  id?: string;
  className?: string;
  label?: string;
  format?: "vertical" | "horizontal" | "rectangle";
  responsive?: boolean;
};

interface WindowWithAdSense extends Window {
  adsbygoogle: Array<Record<string, unknown>>;
}

export function AdPlaceholder({
  className = "",
  label = "Ad Space",
  format = "horizontal",
  responsive = true
}: AdPlaceholderProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as unknown as WindowWithAdSense).adsbygoogle) {
        ((window as unknown as WindowWithAdSense).adsbygoogle = (window as unknown as WindowWithAdSense).adsbygoogle || []).push({});
      }
    } catch {
      console.log("AdSense ads not yet ready");
    }
  }, []);

  return (
    <div className={`rounded-lg border border-dashed border-border/80 bg-muted/25 p-2 ${className}`}>
      {/* Google AdSense Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          minHeight: "100px"
        }}
        data-ad-client="ca-pub-6247519976767626"
        data-ad-format={responsive ? "auto" : format}
        data-ad-test-mode="off"
      />
      {/* Fallback for development/testing */}
      <div className="hidden flex min-h-16 items-center justify-center rounded-md border border-border/70 bg-background/35 px-3 text-center text-xs font-medium text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

