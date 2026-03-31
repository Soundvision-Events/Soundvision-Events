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
import VideoBackground from "@/components/VideoBackground";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  return (
    <PageLayout
      backgroundOverride={
        <VideoBackground
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/backdrop-v3-hd_d354f7b7.mp4"
          overlayOpacity={0.30}
        />
      }
    >
      <SEOHead
        title="Allround DJ Shows op Maat — DJ Tonicity Groningen"
        description="SoundVision Events biedt professionele allround DJ shows voor bruiloften, bedrijfsfeesten, studentenfeesten en privéfeesten in Groningen, Drenthe, Friesland en Overijssel. Persoonlijk contact, maatwerk en ervaren crowd-reading."
        path="/"
        keywords="DJ boeken Groningen, allround DJ show, bruiloft DJ, bedrijfsfeest DJ, DJ Tonicity, SoundVision Events, DJ inhuren Noord-Nederland"
      />
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
