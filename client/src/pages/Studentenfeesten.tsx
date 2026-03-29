/**
 * SoundVision Events — Studentenfeesten / Schoolfeesten DJ Show Page
 * Design: Electric Dark Spectacle — Student/School variant
 * Backdrop: YouTube video NwhOxUrjZcU (student energy)
 */
import PageLayout from "@/components/PageLayout";
import EventPageHero from "@/components/EventPageHero";
import UitbreidingenSection from "@/components/UitbreidingenSection";
import ContactSection from "@/components/ContactSection";
import USPSection from "@/components/USPSection";
import BentoGallery from "@/components/BentoGallery";
import YouTubeBackground from "@/components/YouTubeBackground";

export default function Studentenfeesten() {
  return (
    <PageLayout
      backgroundOverride={
        <YouTubeBackground
          videoId="NwhOxUrjZcU"
          startAt={0}
          overlayOpacity={0.45}
        />
      }
    >
      <EventPageHero
        title="STUDENTEN & SCHOOLFEESTEN"
        subtitle="SoundVision Events — Studenten"
        description="Introweek, gala, eindfeest of schoolfeest — wij brengen de energie die studenten en scholieren verwachten. Harde beats, spectaculaire effecten en een volle dansvloer."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/party-dj-2QDn4hBrwJPQD44Ji8JRhm.webp"
        accentColor="#ff5500"
        iconUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_fire_fb70ea64.png"
        iconAlt="Anime Fire"
      />

      {/* Student-specific content */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "rgba(10, 15, 21, 0.0)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="sv-fade-up">
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  color: "#ff5500",
                  textTransform: "uppercase",
                }}
              >
                Studenten & Scholieren
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
                MAXIMALE
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #ff5500, #ff8800)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ENERGIE & BELEVING
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
                  Studentenfeesten en schoolfeesten draaien om energie, beleving en een onvergetelijke nacht. Wij weten precies welke muziek de zaal laat ontploffen en hoe we de sfeer opbouwen van begin tot eind.
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
                  Van een volledige lichtshow met lasers tot harde beats op maat — wij maken er een spectakel van dat iedereen nog weken bespreekt. Geschikt voor studentenverenigingen, middelbare scholen en HBO/WO evenementen.
                </p>
              </div>
            </div>

            <div className="sv-fade-up">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎓", title: "Gala's", desc: "Stijlvol studentengala met de juiste beats" },
                  { icon: "🎉", title: "Introfeesten", desc: "Onvergetelijke introductieweek feesten" },
                  { icon: "🏫", title: "Schoolfeesten", desc: "Eindfeest, diploma-uitreiking of thema-avond" },
                  { icon: "🔴", title: "Laser Show", desc: "Professionele lasers die de zaal vullen" },
                  { icon: "🎵", title: "Alle Genres", desc: "Van hardstyle tot hiphop — wij draaien alles" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl"
                    style={{
                      background: "rgba(20, 8, 50, 0.30)",
                      border: "1px solid rgba(100, 60, 200, 0.25)",
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
        accentColor="#00ff88"
        title="STUDENTENFEEST IMPRESSIES"
        subtitle="Onze Studenten Shows"
      />
      <USPSection />
      <UitbreidingenSection />
      <ContactSection />
    </PageLayout>
  );
}
