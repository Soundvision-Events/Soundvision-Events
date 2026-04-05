/**
 * useParallax — enhanced site-wide scroll + mouse effects
 *
 * 1. SCROLL PARALLAX (.sv-parallax-bg)
 *    Background layers translate vertically at different speeds,
 *    creating a layered depth effect as the user scrolls.
 *    Spring-lerp smoothing for buttery motion.
 *
 * 2. ZOOM-IN REVEAL (.sv-zoom-reveal, .sv-fade-up, .sv-reveal-left, .sv-reveal-right, .sv-bg-zoom)
 *    Elements animate in from their initial state when entering viewport.
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
 * 5. CSS PERSPECTIVE PARALLAX (.sv-parallax-3d + .sv-layer-bg / .sv-layer-mid)
 *    Pure CSS — browser 3D perspective engine handles depth automatically.
 *    No JS needed; this comment documents the CSS-only system in index.css.
 *
 * ── Universal animation class reference ──────────────────────────────────────
 *
 * SCROLL REVEAL (activated by IntersectionObserver below):
 *   .sv-fade-up       — fade + slide up on enter
 *   .sv-zoom-reveal   — scale + fade on enter
 *   .sv-reveal-left   — slide in from left
 *   .sv-reveal-right  — slide in from right
 *   .sv-bg-zoom       — background scale-in on enter (adds .active class)
 *
 * HOVER (pure CSS, no JS):
 *   .sv-card-3d       — lift + perspective tilt + neon glow on hover
 *   .sv-pill-hover    — translateY + scale + glow on hover
 *   .sv-hover-lift    — simple lift on hover
 *   .sv-tilt          — mouse-tracking 3D tilt (JS below)
 *
 * 3D PARALLAX DEPTH LAYERS (pure CSS, no JS):
 *   .sv-parallax-3d   — section wrapper (preserve-3d)
 *   .sv-layer-bg      — translateZ(-2px) scale(3) → ~3× slower scroll
 *   .sv-layer-mid     — translateZ(-1px) scale(2) → ~2× slower scroll
 *   .sv-layer-fg      — translateZ(0) → normal scroll speed
 *
 * STAGGER GRID:
 *   Add .sv-stagger to parent, .sv-fade-up (or reveal variant) to children.
 *   CSS nth-child rules apply 0.05–0.40s delays automatically.
 *
 * EXCEPTIONS:
 *   Any section may override these defaults with explicit inline styles or
 *   additional Tailwind classes. Document the exception in a JSX comment.
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
      // Also collect .sv-float-scroll decorative elements
      document.querySelectorAll<HTMLElement>(".sv-float-scroll").forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed ?? "0.12");
        targets.set(el, { currentY: 0, targetY: 0, speed });
      });
    };

    let rafId: number;
    let running = true;

    const updateTargets = () => {
      const scrollY = window.scrollY;
      targets.forEach((state, el) => {
        const section = (el.closest(".sv-parallax") ?? el.closest(".sv-parallax-3d")) as HTMLElement | null;
        if (!section) {
          // Standalone float-scroll — use global scroll
          state.targetY = scrollY * state.speed * -1;
          return;
        }
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

  // ── 2: Scroll-reveal for all animation classes ──────────────────────────
  useEffect(() => {
    const REVEAL_SELECTORS = [
      ".sv-zoom-reveal",
      ".sv-fade-up",
      ".sv-reveal-left",
      ".sv-reveal-right",
      ".sv-bg-zoom",
    ].join(", ");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // .visible activates fade-up, zoom-reveal, reveal-left/right
            // .active activates sv-bg-zoom scale transition
            entry.target.classList.add("visible", "active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const els = document.querySelectorAll(REVEAL_SELECTORS);
    els.forEach((el) => observer.observe(el));

    // Re-observe after DOM mutations (lazy sections, route changes)
    const mutObs = new MutationObserver(() => {
      document.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
        if (!el.classList.contains("visible") && !el.classList.contains("active")) {
          observer.observe(el);
        }
      });
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
    };
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
