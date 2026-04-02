/**
 * SoundVision Events — Video Background (Backdrop)
 * Fixed backdrop that cross-fades IN as the hero video fades OUT.
 *
 * Cross-fade logic:
 *   - Listens for the "sv-hero-opacity" custom event emitted by HeroSection.
 *   - When hero opacity = 1 (hero fully visible) → backdrop opacity = 0 (hidden).
 *   - When hero opacity = 0 (hero scrolled away) → backdrop opacity = 1 (fully visible).
 *   - Smooth transition creates a seamless cross-fade between the two videos.
 *
 * Positioning:
 *   - The video is offset so its visual start aligns with the bottom of the hero section.
 *   - This makes the backdrop feel like a continuation of the hero animation.
 */
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  /** CDN URL of the background video */
  src?: string;
  /** Overlay darkness 0–1 — default 0.30 */
  overlayOpacity?: number;
}

const DEFAULT_SRC =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/backdrop-v3-hd_d354f7b7.mp4";

export default function VideoBackground({
  src = DEFAULT_SRC,
  overlayOpacity = 0.30,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Start invisible — will fade in as hero fades out
  const [backdropOpacity, setBackdropOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is always playing (loop in background)
    const ensurePlaying = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };
    ensurePlaying();

    // Listen for hero opacity broadcasts from HeroSection
    const onHeroOpacity = (e: Event) => {
      const heroOpacity = (e as CustomEvent<{ opacity: number }>).detail.opacity;
      // Backdrop is the inverse of the hero: when hero = 1, backdrop = 0; when hero = 0, backdrop = 1
      const newBackdropOpacity = 1 - heroOpacity;
      setBackdropOpacity(newBackdropOpacity);

      // Keep video playing whenever backdrop is becoming visible
      if (newBackdropOpacity > 0) {
        ensurePlaying();
      }
    };

    window.addEventListener("sv-hero-opacity", onHeroOpacity);
    return () => window.removeEventListener("sv-hero-opacity", onHeroOpacity);
  }, []);

  return (
    <div
      style={{
        opacity: backdropOpacity,
        transition: "opacity 0.08s linear",
        willChange: "opacity",
      }}
    >
      {/* Video element — fixed, positioned so its top aligns with the bottom of the hero */}
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
            // Shift the video down by 100vh so the visual start of the backdrop
            // aligns with where the hero section ends — creates a seamless handoff.
            top: "calc(50% + 50vh)",
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
