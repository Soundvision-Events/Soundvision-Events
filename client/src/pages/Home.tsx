/**
 * SoundVision Events — Home Page (All-Round DJ Shows)
 * Design: Electric Dark Spectacle
 * This is the main landing page for all-round DJ show bookings
 */
import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import UitbreidingenSection from "@/components/UitbreidingenSection";
import BentoGallery from "@/components/BentoGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import USPSection from "@/components/USPSection";
import YouTubeBackground from "@/components/YouTubeBackground";

export default function Home() {
  return (
    <PageLayout
      backgroundOverride={
        <YouTubeBackground
          videoId="NwhOxUrjZcU"
          startAt={0}
          overlayOpacity={0.40}
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
