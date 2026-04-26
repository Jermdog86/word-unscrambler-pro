"use client";

import { useEffect } from "react";

const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6247519976767626";

function injectAdSenseScript() {
  if (typeof window === "undefined") return;
  if (document.querySelector('script[data-adsense="deferred"]')) return;

  const script = document.createElement("script");
  script.src = ADSENSE_SRC;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("data-adsense", "deferred");
  document.body.appendChild(script);
}

export function LazyAdSenseScript() {
  useEffect(() => {
    const onScroll = () => {
      injectAdSenseScript();
      window.removeEventListener("scroll", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Fallback so ads still initialize if the user never scrolls.
    const timer = window.setTimeout(() => {
      injectAdSenseScript();
      window.removeEventListener("scroll", onScroll);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
