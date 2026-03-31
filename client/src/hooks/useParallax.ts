/**
 * useParallax — enhanced site-wide scroll + mouse effects
 *
 * 1. SCROLL PARALLAX (.sv-parallax-bg)
 *    Background layers translate vertically at different speeds,
 *    creating a layered depth effect as the user scrolls.
 *    Spring-lerp smoothing for buttery motion.
 *
 * 2. ZOOM-IN REVEAL (.sv-zoom-reveal)
 *    Elements scale in from slightly enlarged when entering viewport.
 *    Stagger delays via CSS nth-child rules.
 *
 * 3. MOUSE-TRACKING TILT (.sv-tilt)
 *    Cards and blocks rotate subtly toward the cursor on hover,
 *    with a glare highlight that follows the mouse.
 *    Resets smoothly on mouse-leave.
 *
 * 4. SCROLL-DRIVEN FLOAT (.sv-float-scroll)
 *    Decorative elements drift up/down based on scroll position.
 *
 */
import { useEffect } from "react";

// ── Spring lerp helper ──────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function useParallax() {
  // ── 1 & 4: Scroll-driven parallax ──────────────────────────────────────
  useEffect(() => {
    const targets = new Map<
      HTMLElement,
      { currentY: number; targetY: number; speed: number }
    >();

    const collectTargets = () => {
      targets.clear();
      document.querySelectorAll<HTMLElement>(".sv-parallax-bg").forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed ?? "0.25");
        targets.set(el, { currentY: 0, targetY: 0, speed });
      });
    };

    let rafId: number;
    let running = true;

    const updateTargets = () => {
      const scrollY = window.scrollY;
      targets.forEach((state, el) => {
        const section = el.closest(".sv-parallax") as HTMLElement | null;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const progress = (scrollY - sectionTop + window.innerHeight) / (window.innerHeight + section.offsetHeight);
        state.targetY = (progress - 0.5) * window.innerHeight * state.speed;
      });
    };

    const tick = () => {
      if (!running) return;
      updateTargets();
      targets.forEach((state, el) => {
        state.currentY = lerp(state.currentY, state.targetY, 0.07);
        el.style.transform = `translateY(${state.currentY.toFixed(2)}px)`;
      });
      rafId = requestAnimationFrame(tick);
    };

    collectTargets();
    tick();

    const onScroll = () => updateTargets();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", collectTargets);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", collectTargets);
    };
  }, []);

  // ── 2: Zoom-in reveal ───────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const els = document.querySelectorAll(".sv-zoom-reveal, .sv-fade-up");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── 3: Mouse-tracking tilt on .sv-tilt elements ─────────────────────────
  useEffect(() => {
    const MAX_TILT = 18; // degrees
    const GLARE_OPACITY = 0.18;

    const handleMouseMove = (e: MouseEvent) => {
      const el = (e.currentTarget as HTMLElement);
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to 1
      const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to 1

      const rotateX = (-dy * MAX_TILT).toFixed(2);
      const rotateY = (dx * MAX_TILT).toFixed(2);

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
      el.style.transition = "transform 0.1s ease-out";

      // Update glare position
      const glare = el.querySelector<HTMLElement>(".sv-tilt-glare");
      if (glare) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${GLARE_OPACITY}) 0%, transparent 60%)`;
        glare.style.opacity = "1";
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      const glare = el.querySelector<HTMLElement>(".sv-tilt-glare");
      if (glare) {
        glare.style.opacity = "0";
        glare.style.transition = "opacity 0.4s ease";
      }
    };

    const attachTilt = () => {
      document.querySelectorAll<HTMLElement>(".sv-tilt").forEach((el) => {
        // Inject glare layer if not already present
        if (!el.querySelector(".sv-tilt-glare")) {
          const glare = document.createElement("div");
          glare.className = "sv-tilt-glare";
          glare.style.cssText =
            "position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity 0.3s ease;z-index:10;";
          el.style.position = el.style.position || "relative";
          el.style.overflow = "hidden";
          el.appendChild(glare);
        }
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    attachTilt();

    // Re-attach after any DOM changes (route changes, lazy renders)
    const mutationObs = new MutationObserver(attachTilt);
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObs.disconnect();
      document.querySelectorAll<HTMLElement>(".sv-tilt").forEach((el) => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
}
