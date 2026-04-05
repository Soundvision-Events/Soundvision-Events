/**
 * SoundVision Events — Shared Page Layout
 * Wraps every page with Navbar, VideoBackground (or custom override), Footer, and scroll observer.
 *
 * Universal animation classes activated by this observer:
 *   .sv-fade-up       — fade + slide up on enter
 *   .sv-zoom-reveal   — scale + fade on enter
 *   .sv-reveal-left   — slide in from left
 *   .sv-reveal-right  — slide in from right
 *   .sv-bg-zoom       — background scale-in on enter (3D parallax bg)
 *
 * Hover classes (no JS needed — pure CSS):
 *   .sv-card-3d       — lift + perspective tilt + neon glow on hover
 *   .sv-pill-hover    — translateY + scale + glow on hover
 *   .sv-hover-lift    — simple lift on hover
 *   .sv-tilt          — preserve-3d tilt (JS tilt in useParallax)
 *
 * 3D Parallax depth layers (CSS perspective engine):
 *   .sv-parallax-3d   — section wrapper (preserve-3d)
 *   .sv-layer-bg      — translateZ(-2px) scale(3) → ~3× slower
 *   .sv-layer-mid     — translateZ(-1px) scale(2) → ~2× slower
 *   .sv-layer-fg      — translateZ(0) → normal speed
 *
 * Stagger grid children: add .sv-stagger to parent, .sv-fade-up to children.
 */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import BeatCursor from "@/components/BeatCursor";
import FloatingButtons from "@/components/FloatingButtons";
import ChatBot from "@/components/ChatBot";
import { useParallax } from "@/hooks/useParallax";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Optional custom background component — replaces the default VideoBackground */
  backgroundOverride?: React.ReactNode;
}

export default function PageLayout({ children, backgroundOverride }: PageLayoutProps) {
  useParallax();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // All scroll-reveal classes share the same IntersectionObserver
    const REVEAL_SELECTORS = [
      ".sv-fade-up",
      ".sv-zoom-reveal",
      ".sv-reveal-left",
      ".sv-reveal-right",
      ".sv-bg-zoom",
    ].join(", ");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible", "active");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(REVEAL_SELECTORS);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080c10", color: "#f0f4f8" }}>
      {backgroundOverride ?? <VideoBackground />}
      <BeatCursor />
      <Navbar />
      {children}
      <Footer />
      <FloatingButtons />
      <ChatBot />
    </div>
  );
}
