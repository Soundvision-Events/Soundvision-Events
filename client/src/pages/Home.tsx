/**
 * SoundVision Events — Home Page (All-Round DJ Shows)
 * Design: Electric Dark Spectacle
 * This is the main landing page for all-round DJ show bookings
 */
import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import UitbreidingenSection from "@/components/UitbreidingenSection";
import BentoGallery from "@/components/BentoGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import USPSection from "@/components/USPSection";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  useEffect(() => {
    document.title = "SoundVision Events — DJ Bert Tonicity | Groningen";
  }, []);

  return (
    <PageLayout
      backgroundOverride={
        <VideoBackground
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/soundvision_animated_15s_final_ef6c5683.mp4"
          overlayOpacity={0.30}
        />
      }
    >
      <HeroSection />
      <USPSection />
      <AboutSection />
      <BentoGallery
        accentColor="#00c8ff"
        title="DE SHOW IN BEELD"
        subtitle="Galerij"
      />
      <UitbreidingenSection />
      <TestimonialsSection />
      <ContactSection />
    </PageLayout>
  );
}
