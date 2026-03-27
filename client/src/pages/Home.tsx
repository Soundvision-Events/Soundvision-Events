/**
 * SoundVision Events — Home Page
 * Design: Electric Dark Spectacle
 * Colors: #080c10 bg, #00c8ff cyan, #ff5500 amber
 * Fonts: Bebas Neue (headings), Outfit (body)
 */
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventTypesSection from "@/components/EventTypesSection";
import PackagesSection from "@/components/PackagesSection";
import AddOnsSection from "@/components/AddOnsSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StarCurtain from "@/components/StarCurtain";

export default function Home() {
  // Scroll animation observer
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
      <StarCurtain />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EventTypesSection />
      <PackagesSection />
      <AddOnsSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
