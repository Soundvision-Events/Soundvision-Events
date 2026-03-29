/**
 * SoundVision Events — Privé Feesten DJ Show Page
 * Design: Electric Dark Spectacle — Private events variant
 * Jubilea, verjaardagen, familiefeesten, etc.
 */
import PageLayout from "@/components/PageLayout";
import EventPageHero from "@/components/EventPageHero";
import UitbreidingenSection from "@/components/UitbreidingenSection";
import ContactSection from "@/components/ContactSection";
import USPSection from "@/components/USPSection";
import BentoGallery from "@/components/BentoGallery";

export default function Prive() {
  return (
    <PageLayout>
      <EventPageHero
        title="PRIVÉ FEESTEN"
        subtitle="SoundVision Events — Privé"
        description="Jubileum, verjaardag, familiefeest of een andere bijzondere gelegenheid — wij maken er een feest van dat bij u past. Persoonlijk, op maat en onvergetelijk."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/dj-equipment-kHkQsh8fv4YHpAoghakmXA.webp"
        accentColor="#9b59b6"
        iconUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_star_8f6a17c1.png"
        iconAlt="Anime Star"
      />

      {/* Private events content */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "rgba(10, 15, 21, 0.55)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="sv-fade-up">
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  color: "#9b59b6",
                  textTransform: "uppercase",
                }}
              >
                Privé Aangelegenheden
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
                UW SPECIALE
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #9b59b6, #c39bd3)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GELEGENHEID
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
                  Elk privéfeest is uniek. Of het nu gaat om een 50-jarig jubileum, een bijzondere verjaardag, een familiebijeenkomst of een ander feest — wij stemmen de muziek en de show volledig af op uw wensen en uw gasten.
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
                  Van rustige achtergrondmuziek tot een volledig dansfeest — wij passen ons aan. Met een persoonlijk voorgesprek zorgen wij ervoor dat de muziek perfect aansluit bij de sfeer en de leeftijdsgroep van uw gasten.
                </p>
              </div>
            </div>

            <div className="sv-fade-up">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎂", title: "Verjaardagen", desc: "Van 18 tot 80 — voor elke leeftijd de juiste muziek" },
                  { icon: "💎", title: "Jubilea", desc: "Vier uw huwelijks- of bedrijfsjubileum in stijl" },
                  { icon: "👨‍👩‍👧‍👦", title: "Familiefeesten", desc: "Muziek waar jong en oud van geniet" },
                  { icon: "🥂", title: "Vrijgezellenfeest", desc: "Een onvergetelijke avond voor de bruid of bruidegom" },
                  { icon: "🎵", title: "Op Maat", desc: "Volledig afgestemd op uw muziekwensen" },
                  { icon: "🎛️", title: "Flexibel", desc: "Van intiem tot groot — wij schalen mee" },
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
        accentColor="#9b59b6"
        title="PRIVÉ IMPRESSIES"
        subtitle="Onze Privé Shows"
      />
      <USPSection />
      <UitbreidingenSection />
      <ContactSection />
    </PageLayout>
  );
}
