"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });

        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;

          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              toast.message("App update available", {
                description: "Refresh to load the latest dictionary and UI improvements."
              });
            }
          });
        });
      } catch {
        // Silent fail to avoid user-facing noise.
      }
    };

    void registerWorker();
  }, []);

  return null;
}
