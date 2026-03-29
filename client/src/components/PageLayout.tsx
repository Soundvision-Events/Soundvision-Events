/**
 * SoundVision Events — Shared Page Layout
 * Wraps every page with Navbar, VideoBackground (or custom override), Footer, and scroll observer.
 */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import BeatCursor from "@/components/BeatCursor";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Optional custom background component — replaces the default VideoBackground */
  backgroundOverride?: React.ReactNode;
}

export default function PageLayout({ children, backgroundOverride }: PageLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const elements = document.querySelectorAll(".sv-fade-up");
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
    </div>
  );
}
