/**
 * SoundVision Events — Video Background
 * Plays a self-hosted looping video as a full-screen fixed background.
 * Autoplay, muted, looped — no external dependencies (no YouTube iframe).
 *
 * Current backdrop: openart v2 — 1920x1080, contrast +15%, brightness +8%, saturation +10%
 * CDN-hosted loop, ~5.8MB, faststart, no audio
 *
 * Scroll behaviour: backdrop is invisible while hero is in view.
 * It fades in smoothly as the user scrolls past the hero section.
 */
import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  /** CDN URL of the background video */
  src?: string;
  /** Overlay darkness 0–1 — default 0.30 */
  overlayOpacity?: number;
  /** Poster image shown before video loads */
  poster?: string;
}

const DEFAULT_SRC =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/backdrop_openart_v2_hd_b2f9a953.mp4";

// Hero section height in px — backdrop starts fading in after this scroll depth
const HERO_HEIGHT = 1073;
// Transition distance (px) over which backdrop fades from 0 → 1
const FADE_RANGE = 900;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function VideoBackground({
  src = DEFAULT_SRC,
  overlayOpacity = 0.30,
}: VideoBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let currentOpacity = 0;
    let targetOpacity = 0;
    let rafId: number;
    let running = true;

    const onScroll = () => {
      const scrollY = window.scrollY;
      // Start fading in when scroll reaches HERO_HEIGHT, fully visible after HERO_HEIGHT + FADE_RANGE
      const progress = Math.max(0, Math.min(1, (scrollY - HERO_HEIGHT) / FADE_RANGE));
      targetOpacity = progress;
    };

    const tick = () => {
      if (!running) return;
      currentOpacity = lerp(currentOpacity, targetOpacity, 0.035);
      wrapper.style.opacity = currentOpacity.toFixed(4);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise to current scroll position
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }}>
      {/* Video element — fixed behind all content */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay to keep text readable */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
