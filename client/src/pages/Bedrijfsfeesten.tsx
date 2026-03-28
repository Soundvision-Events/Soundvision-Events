/**
 * SoundVision Events — Bedrijfsfeesten DJ Show Page
 * Design: Electric Dark Spectacle — Corporate variant
 */
import PageLayout from "@/components/PageLayout";
import EventPageHero from "@/components/EventPageHero";
import PackagesSection from "@/components/PackagesSection";
import AddOnsSection from "@/components/AddOnsSection";
import ContactSection from "@/components/ContactSection";
import USPSection from "@/components/USPSection";
import BentoGallery from "@/components/BentoGallery";

export default function Bedrijfsfeesten() {
  return (
    <PageLayout>
      <EventPageHero
        title="BEDRIJFSFEESTEN DJ SHOW"
        subtitle="SoundVision Events — Zakelijk"
        description="Teambuilding, jubileumfeest, bedrijfsgala of personeelsfeest — wij leveren een professionele DJ show die past bij uw bedrijfscultuur en uw gasten imponeert."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/corporate-event-Efxd4ZRCNusPmXbgkrD8mM.webp"
        accentColor="#0090ff"
      />

      {/* Corporate-specific content */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#0a0f15" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="sv-fade-up">
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  color: "#0090ff",
                  textTransform: "uppercase",
                }}
              >
                Zakelijke Evenementen
              </span>
              <h2
                className="mt-3 mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "0.05em",
                  lineHeight: 1.05,
                  color: "#f0f4f8",
                }}
              >
                PROFESSIONEEL
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #0090ff, #00c8ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  & STIJLVOL
                </span>
              </h2>
              <div className="space-y-4">
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(240, 244, 248, 0.75)",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  Een bedrijfsfeest vraagt om een andere aanpak dan een privéfeest. Wij begrijpen dat en passen onze show aan op de sfeer en het karakter van uw organisatie. Van stijlvolle lounge tot energiek dansfeest.
                </p>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(240, 244, 248, 0.75)",
                    lineHeight: 1.8,
                    fontWeight: 300,
                  }}
                >
                  Wij overleggen vooraf over het programma, de muziekstijl en eventuele speciale wensen. Zo garanderen wij een avond die uw collega's nog lang zullen onthouden.
                </p>
              </div>
            </div>

            <div className="sv-fade-up">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🏢", title: "Bedrijfsgala", desc: "Stijlvol entertainment voor uw gala-avond" },
                  { icon: "🎊", title: "Jubileumfeest", desc: "Vier uw bedrijfsjubileum in stijl" },
                  { icon: "🤝", title: "Teambuilding", desc: "Muziek die verbindt en energie geeft" },
                  { icon: "🎤", title: "Presentatie", desc: "MC service voor uw programma" },
                  { icon: "🎵", title: "Achtergrondmuziek", desc: "Sfeervolle muziek tijdens netwerkmomenten" },
                  { icon: "💡", title: "Professioneel Licht", desc: "Verlichting afgestemd op uw locatie" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.07)",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                    <div
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#f0f4f8",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.72rem",
                        color: "rgba(240, 244, 248, 0.5)",
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BentoGallery
        accentColor="#ffaa00"
        title="BEDRIJFSFEEST IMPRESSIES"
        subtitle="Onze Zakelijke Shows"
      />
      <USPSection />
      <PackagesSection />
      <AddOnsSection />
      <ContactSection />
    </PageLayout>
  );
}
