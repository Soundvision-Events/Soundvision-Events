/**
 * SoundVision Events — Bruiloft DJ Show Page
 * Design: Electric Dark Spectacle — Wedding variant
 * Accent: Rose/Pink neon (#ff3d8a) + warm blush (#ffb3cc)
 * Backdrop: YouTube video c7qIEesCHFE (romantic / wedding energy)
 */
import PageLayout from "@/components/PageLayout";
import EventPageHero from "@/components/EventPageHero";
import UitbreidingenSection from "@/components/UitbreidingenSection";
import ContactSection from "@/components/ContactSection";
import BruiloftContactForm from "@/components/BruiloftContactForm";
import USPSection from "@/components/USPSection";
import VisionSection from "@/components/VisionSection";
import BentoGallery from "@/components/BentoGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import YouTubeBackground from "@/components/YouTubeBackground";
import SEOHead from "@/components/SEOHead";
import { PAGE_THEMES } from "@/lib/pageThemes";

/* ─── Wedding colour tokens ─────────────────────────── */
const ROSE        = "#ff3d8a";
const ROSE_SOFT   = "#ff80b3";
const ROSE_GLOW   = "rgba(255,61,138,0.30)";
const ROSE_GLOW_S = "rgba(255,61,138,0.12)";

export default function Bruiloft() {
  return (
    <PageLayout
      backgroundOverride={
        <YouTubeBackground
          videoId="c7qIEesCHFE"
          startAt={0}
          overlayOpacity={0.45}
        />
      }
    >
      <SEOHead
        title="Bruiloft DJ — Onvergetelijke Trouwfeest DJ Show"
        description="Zoekt u een bruiloft DJ in Groningen, Drenthe of Friesland? SoundVision Events verzorgt romantische en energieke DJ shows op maat voor uw trouwdag. Persoonlijk contact met DJ Tonicity."
        path="/bruiloft"
        keywords="bruiloft DJ, trouwfeest DJ, wedding DJ Groningen, DJ huwelijksfeest, bruiloft entertainment Noord-Nederland"
      />

      <style>{`
        @keyframes gradientRoll {
          0%   { background-position: 50% 0%; }
          50%  { background-position: 50% 100%; }
          100% { background-position: 50% 0%; }
        }
        .bruiloft-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          min-height: 100%;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(8,12,16,0.0) 0%,
            rgba(18,8,24,0.20) 8%,
            rgba(26,10,32,0.25) 16%,
            rgba(34,10,30,0.25) 24%,
            rgba(42,10,28,0.25) 32%,
            rgba(48,10,26,0.22) 40%,
            rgba(42,8,24,0.22) 50%,
            rgba(30,6,20,0.20) 60%,
            rgba(22,5,16,0.20) 70%,
            rgba(26,5,21,0.20) 80%,
            rgba(32,6,24,0.20) 90%,
            rgba(26,5,21,0.20) 100%
          );
          background-size: 100% 400%;
          animation: gradientRoll 22s ease infinite;
        }

        /* Rose neon pulse for icon circles */
        @keyframes rosePulse {
          0%, 100% { box-shadow: 0 0 14px ${ROSE_GLOW}, 0 0 28px ${ROSE_GLOW}; }
          50%       { box-shadow: 0 0 24px ${ROSE_GLOW}, 0 0 48px ${ROSE_GLOW}; }
        }

        /* CTA button rose glow */
        .btn-rose {
          background: linear-gradient(135deg, ${ROSE} 0%, #c0185e 100%);
          color: #fff;
          border: none;
          padding: 0.85rem 2.2rem;
          border-radius: 0.5rem;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          letter-spacing: 0.12em;
          cursor: pointer;
          box-shadow: 0 0 20px ${ROSE_GLOW}, 0 4px 20px rgba(0,0,0,0.4);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-rose:hover {
          box-shadow: 0 0 35px ${ROSE_GLOW}, 0 6px 30px rgba(0,0,0,0.5);
          transform: translateY(-2px);
        }
        .btn-rose-outline {
          background: transparent;
          color: ${ROSE};
          border: 1.5px solid ${ROSE};
          padding: 0.85rem 2.2rem;
          border-radius: 0.5rem;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          letter-spacing: 0.12em;
          cursor: pointer;
          box-shadow: 0 0 12px ${ROSE_GLOW_S};
          transition: box-shadow 0.3s ease, background 0.3s ease, transform 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-rose-outline:hover {
          background: ${ROSE_GLOW_S};
          box-shadow: 0 0 24px ${ROSE_GLOW};
          transform: translateY(-2px);
        }
      `}</style>

      {/* ── Full-length rose gradient backdrop wrapper ── */}
      <div style={{ position: "relative", minHeight: "100vh" }}>

        {/* 1. Hero */}
        <EventPageHero
          title="BRUILOFT DJ SHOW"
          subtitle="SoundVision Events — bruiloft-dj"
          description="Van de ceremonie tot de laatste dans — DJ Tonicity zorgt voor de perfecte muzikale begeleiding van uw trouwdag. Romantisch, elegant en onvergetelijk. Volledig afgestemd op uw smaak en de sfeer van uw bruiloft."
          image="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/openingsdans116_aa3b0634.jpg"
          accentColor={ROSE}
          iconUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_heart_82e6d4ab.png"
          iconAlt="Anime Heart"
          showPhoto={[
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/openingsdans116_aa3b0634.jpg",
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/openingsdans117_6b3efa5b.webp",
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/bruiloft_reportage3_a784e486.webp",
            "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/bruiloftfeest_64ee6a35.webp",
          ]}
        />

        {/* 2. Wedding intro content */}
        <section
          className="relative py-20 overflow-hidden"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Background overlay — only this layer is transparent, not the content */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', pointerEvents: "none", zIndex: 0 }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: "relative", zIndex: 1 }}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: text */}
              <div className="sv-fade-up">
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.3em",
                    color: ROSE_SOFT,
                    textTransform: "uppercase",
                  }}
                >
                  Uw Trouwdag
                </span>

                <h2
                  className="mt-3 mb-6"
                  style={{
                    fontFamily: "'Cinzel', serif",
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
                      background: "linear-gradient(135deg, #5e00bd, #9b59b6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "none",
                      filter: `drop-shadow(0 0 12px rgba(94,0,189,0.45))`,
                    }}
                  >
                    MUZIKALE ERVARING
                  </span>
                </h2>

                <div className="space-y-4" style={{ marginBottom: "2rem" }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(240,244,248,0.75)", lineHeight: 1.8, fontWeight: 300 }}>
                    Uw bruiloft verdient de perfecte soundtrack. Van het ontvangst met achtergrondmuziek, door het diner met sfeervolle lounge, tot het avondfeest waar de dansvloer vol staat — DJ Tonicity regelt het allemaal.
                  </p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(240,244,248,0.75)", lineHeight: 1.8, fontWeight: 300 }}>
                    DJ Tonicity stemt alles vooraf met u af: uw favoriete nummers, de eerste dans, speciale momenten en de sfeer die u voor ogen heeft. Zo wordt uw trouwdag precies zoals u het wilt.
                  </p>
                </div>

                {/* CTA buttons with rose accent */}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href="#contact" className="btn-rose">Offerte Aanvragen</a>
                  <a href="#packages" className="btn-rose-outline">Bekijk Pakketten</a>
                </div>
              </div>

              {/* Right: feature grid */}
              <div className="sv-fade-up">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "💍", title: "Eerste Dans", desc: "Het perfecte nummer voor uw eerste dans als getrouwd stel" },
                    { icon: "🎵", title: "Ceremonie Muziek", desc: "Sfeervolle begeleiding tijdens de ceremonie" },
                    { icon: "🍽️", title: "Diner DJ", desc: "Achtergrondmuziek tijdens het diner" },
                    { icon: "🎉", title: "Avondfeest", desc: "De dansvloer vol van begin tot eind" },
                    { icon: "💡", title: "Sfeerverlichting", desc: "Romantische en feestelijke verlichting" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-4 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, rgba(20,8,50,0.30), ${ROSE_GLOW_S})`,
                        border: `1px solid ${ROSE}33`,
                        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${ROSE}88`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${ROSE_GLOW_S}`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${ROSE}33`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    >
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: ROSE_SOFT, marginBottom: "0.25rem" }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", color: "rgba(240,244,248,0.5)" }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. USP */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <USPSection theme={PAGE_THEMES.bruiloft} />
        </div>

        {/* 4. Vision */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <VisionSection theme={PAGE_THEMES.bruiloft} />
        </div>

        {/* 5. Gallery */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <BentoGallery
            accentColor={ROSE}
            title="BRUILOFT IMPRESSIES"
            subtitle="Onze Bruiloftsshows"
            items={[
              {
                // Area a: large hero — bride & groom with DJ Tonicity, SoundVision branded setup
                src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/IMG_0007_d5030403.webp",
                alt: "Bruid met microfoon bij DJ Tonicity",
                label: "Bruiloft DJ Tonicity — Eerste Dans",
                area: "a",
              },
              {
                // Area b: couple slow dancing in purple/blue light
                src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/DSC_2127_4b6a3d22.webp",
                alt: "Bruidspaar dansend",
                label: "Romantische Eerste Dans",
                area: "b",
              },
              {
                // Area c: couple embracing on dance floor, blue/pink light
                src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/DSC_2128_a92a0d1a.webp",
                alt: "Bruidspaar op dansvloer",
                label: "Sfeer & Emotie",
                area: "c",
              },
              {
                // Area e: wide — DJ Tonicity with bride & groom at the decks, SoundVision logo visible
                src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/DSC_2172_397932df.webp",
                alt: "DJ Tonicity met bruidspaar",
                label: "SoundVision Events — Bruiloft Show",
                area: "e",
              },
            ]}
          />
        </div>

        {/* 6. Uitbreidingen */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <UitbreidingenSection showOpeningsdansMix={true} theme={PAGE_THEMES.bruiloft} />
        </div>

        {/* 7. Testimonials */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <TestimonialsSection />
        </div>

        {/* 8. Bruiloft-specific inquiry form */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <BruiloftContactForm />
        </div>

        {/* 9. General contact section */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <ContactSection />
        </div>

      </div>{/* end bruiloft-backdrop wrapper */}

    </PageLayout>
  );
}
