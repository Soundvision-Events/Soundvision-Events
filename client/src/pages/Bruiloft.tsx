/**
 * SoundVision Events — Bruiloft DJ Show Page
 * Design: Electric Dark Spectacle — Wedding variant
 */
import PageLayout from "@/components/PageLayout";
import EventPageHero from "@/components/EventPageHero";
import PackagesSection from "@/components/PackagesSection";
import AddOnsSection from "@/components/AddOnsSection";
import ContactSection from "@/components/ContactSection";
import USPSection from "@/components/USPSection";

export default function Bruiloft() {
  return (
    <PageLayout>
      <EventPageHero
        title="BRUILOFT DJ SHOW"
        subtitle="SoundVision Events — Trouwen"
        description="Van de ceremonie tot de laatste dans — wij zorgen voor de perfecte muzikale begeleiding van uw trouwdag. Romantisch, elegant en onvergetelijk. Afgestemd op uw smaak en de sfeer van uw bruiloft."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/wedding-dj-DqtALdSvgWVVw3zhZFPk6b.webp"
        accentColor="#00c8ff"
      />

      {/* Wedding-specific content */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#0a0f15" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="sv-fade-up">
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  color: "#00c8ff",
                  textTransform: "uppercase",
                }}
              >
                Uw Trouwdag
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
                EEN ONVERGETELIJKE
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  MUZIKALE ERVARING
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
                  Uw bruiloft verdient de perfecte soundtrack. Van het ontvangst met achtergrondmuziek, door het diner met sfeervolle lounge, tot het avondfeest waar de dansvloer vol staat — wij regelen het allemaal.
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
                  Wij stemmen alles vooraf met u af: uw favoriete nummers, de eerste dans, speciale momenten en de sfeer die u voor ogen heeft. Zo wordt uw trouwdag precies zoals u het wilt.
                </p>
              </div>
            </div>

            <div className="sv-fade-up">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "💍", title: "Eerste Dans", desc: "Het perfecte nummer voor uw eerste dans als getrouwd stel" },
                  { icon: "🎵", title: "Ceremonie Muziek", desc: "Sfeervolle begeleiding tijdens de ceremonie" },
                  { icon: "🍽️", title: "Diner DJ", desc: "Achtergrondmuziek tijdens het diner" },
                  { icon: "🎉", title: "Avondfeest", desc: "De dansvloer vol van begin tot eind" },
                  { icon: "🎤", title: "MC Service", desc: "Professionele aankondigingen en presentatie" },
                  { icon: "💡", title: "Sfeerverlichting", desc: "Romantische en feestelijke verlichting" },
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

      <USPSection />
      <PackagesSection />
      <AddOnsSection />
      <ContactSection />
    </PageLayout>
  );
}
