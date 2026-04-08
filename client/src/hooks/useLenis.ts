import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/**
 * Initialize Lenis smooth scroll globally.
 * Call this once at the app root level.
 */
export function useLenis() {
  useEffect(() => {
    // Avoid double-init in dev strict mode
    if (lenisInstance) return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}

/** Get the current Lenis instance (for scroll-linked effects) */
export function getLenis() {
  return lenisInstance;
}
