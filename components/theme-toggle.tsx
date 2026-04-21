"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <button className="h-10 w-10 rounded-full border border-border" aria-label="Theme loading" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle dark and light mode"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
