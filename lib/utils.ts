import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeLetters(raw: string) {
  return raw.toUpperCase().replace(/[^A-Z?]/g, "").slice(0, 15);
}

export function debounce<T extends (...args: never[]) => void>(callback: T, wait = 120) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
}
