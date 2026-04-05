/**
 * SoundVision Events — Video Background (Backdrop)
 *
 * Full-page fixed backdrop that transitions cleanly at the hero boundary:
 *   - While hero is visible (heroOpacity > 0.5): backdrop is fully hidden (opacity 0)
 *   - As hero crosses the 50% fade threshold: backdrop snaps/fades in
 *   - The two animations are NEVER simultaneously visible — clean cut at the midpoint
 *
 * The video fills the full viewport (standard cover framing) — no position offset.
 * Listens to "sv-hero-opacity" custom event emitted by HeroSection on every scroll tick.
 */
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  src?: string;
  overlayOpacity?: number;
}

const DEFAULT_SRC =
  "/api/video-proxy?file=backdrop-v3-hd_d354f7b7.mp4";

export default function VideoBackground({
  src = DEFAULT_SRC,
  overlayOpacity = 0.30,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Start hidden — becomes visible only after hero has faded out
  const [backdropOpacity, setBackdropOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlaying = () => {
      if (video.paused) video.play().catch(() => {});
    };
    ensurePlaying();

    const onHeroOpacity = (e: Event) => {
      const heroOpacity = (e as CustomEvent<{ opacity: number }>).detail.opacity;

      // Hard threshold at 0.15:
      //   - heroOpacity > 0.15  → backdrop fully hidden (0)
      //   - heroOpacity <= 0.15 → backdrop fades in proportionally
      // This ensures the two videos are never simultaneously visible.
      let newBackdropOpacity: number;
      if (heroOpacity > 0.15) {
        newBackdropOpacity = 0;
      } else {
        // Map heroOpacity 0.15 → 0  to backdropOpacity 0 → 1
        newBackdropOpacity = 1 - heroOpacity / 0.15;
      }

      setBackdropOpacity(newBackdropOpacity);
      if (newBackdropOpacity > 0) ensurePlaying();
    };

    window.addEventListener("sv-hero-opacity", onHeroOpacity);
    return () => window.removeEventListener("sv-hero-opacity", onHeroOpacity);
  }, []);

  return (
    <div
      style={{
        opacity: backdropOpacity,
        transition: "opacity 0.12s linear",
        willChange: "opacity",
      }}
    >
      {/* Full-page fixed video — standard cover framing, no position offset */}
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
          ref={videoRef}
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

      {/* Dark overlay */}
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
