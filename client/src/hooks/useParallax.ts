/**
 * useParallax — drives two effects site-wide:
 *
 * 1. Smooth parallax on any element with class `sv-parallax-bg`:
 *    The element translates vertically as the user scrolls, creating a
 *    depth effect. The parent section should have `overflow: hidden` and
 *    class `sv-parallax`.
 *
 * 2. Zoom-in reveal on any element with class `sv-zoom-reveal`:
 *    Elements start scaled up + translated down and animate to natural
 *    size when they enter the viewport (adds class `visible`).
 *
 * Call once in PageLayout so it covers every page automatically.
 */
import { useEffect } from "react";

export function useParallax() {
  useEffect(() => {
    // ── 1. Parallax scroll on .sv-parallax-bg elements ──────────────────
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const parallaxEls = document.querySelectorAll<HTMLElement>(".sv-parallax-bg");
        parallaxEls.forEach((el) => {
          const section = el.closest(".sv-parallax") as HTMLElement | null;
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const relativeScroll = scrollY - sectionTop + window.innerHeight;
          const speed = 0.18; // lower = subtler parallax
          const offset = relativeScroll * speed - window.innerHeight * speed;
          el.style.transform = `translateY(${offset}px) scale(1.0)`;
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial position

    // ── 2. Zoom-in reveal on .sv-zoom-reveal elements ────────────────────
    const zoomObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            zoomObserver.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const zoomEls = document.querySelectorAll(".sv-zoom-reveal");
    zoomEls.forEach((el) => zoomObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      zoomObserver.disconnect();
    };
  }, []);
}
