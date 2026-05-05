/**
 * SoundVision Events — Home Page (All-Round DJ Shows)
 * Design: Electric Dark Spectacle
 * This is the main landing page for all-round DJ show bookings
 */
import { lazy, Suspense } from "react";
import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import USPSection from "@/components/USPSection";
import VideoBackground from "@/components/VideoBackground";
import SEOHead from "@/components/SEOHead";
import { PAGE_THEMES } from "@/lib/pageThemes";

// Below-fold sections: lazy loaded to reduce initial JS parse/execute time
const VisionSection = lazy(() => import("@/components/VisionSection"));
const BentoGallery = lazy(() => import("@/components/BentoGallery"));
const UitbreidingenSection = lazy(() => import("@/components/UitbreidingenSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

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
      {/* Above-fold: eager loaded */}
      <HeroSection />
      <USPSection theme={PAGE_THEMES.home} />
      {/* Below-fold: lazy loaded — reduces initial JS bundle by ~40% */}
      <Suspense fallback={null}>
        <VisionSection theme={PAGE_THEMES.home} />
        <BentoGallery
          accentColor="#00c8ff"
          title="DE SHOW IN BEELD"
          subtitle="Galerij"
        />
        <UitbreidingenSection theme={PAGE_THEMES.home} />
        <TestimonialsSection />
        <ContactSection />
      </Suspense>
    </PageLayout>
  );
}
