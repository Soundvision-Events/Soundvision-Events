/**
 * SoundVision Events — Bruiloft DJ Show Page
 * Design: Electric Dark Spectacle — Wedding variant
 * Accent: Rose/Pink neon (#ff3d8a) + warm blush (#ffb3cc)
 * Special: Slow gradient roll animation on backdrop
 */
import PageLayout from "@/components/PageLayout";
import EventPageHero from "@/components/EventPageHero";
import PackagesSection from "@/components/PackagesSection";
import AddOnsSection from "@/components/AddOnsSection";
import ContactSection from "@/components/ContactSection";
import USPSection from "@/components/USPSection";
import BentoGallery from "@/components/BentoGallery";

/* ─── Wedding colour tokens ─────────────────────────── */
const ROSE        = "#ff3d8a";
const ROSE_SOFT   = "#ff80b3";
const ROSE_GLOW   = "rgba(255,61,138,0.30)";
const ROSE_GLOW_S = "rgba(255,61,138,0.12)";

export default function Bruiloft() {
  return (
    <PageLayout>

      {/* ── Full-length rose gradient backdrop wrapper ── */}
      <div style={{ position: "relative", minHeight: "100vh" }}>

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
            #080c10 0%,
            #120818 8%,
            #1a0a20 16%,
            #220a1e 24%,
            #2a0a1c 32%,
            #300a1a 40%,
            #2a0818 50%,
            #1e0614 60%,
            #160510 70%,
            #1a0515 80%,
            #200618 90%,
            #1a0515 100%
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
          font-family: 'Bebas Neue', sans-serif;
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
          font-family: 'Bebas Neue', sans-serif;
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

      {/* Animated gradient backdrop */}
      <div className="bruiloft-backdrop" />

      {/* ── Hero ── */}
      <EventPageHero
        title="BRUILOFT DJ SHOW"
        subtitle="SoundVision Events — Trouwen"
        description="Van de ceremonie tot de laatste dans — wij zorgen voor de perfecte muzikale begeleiding van uw trouwdag. Romantisch, elegant en onvergetelijk. Afgestemd op uw smaak en de sfeer van uw bruiloft."
        image="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/wedding-dj-DqtALdSvgWVVw3zhZFPk6b.webp"
        accentColor={ROSE}
        iconUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/anime_heart_82e6d4ab.png"
        iconAlt="Anime Heart"
      />
      {/* ── Wedding intro content ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                    background: `linear-gradient(135deg, ${ROSE}, ${ROSE_SOFT})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                    filter: `drop-shadow(0 0 12px ${ROSE_GLOW})`,
                  }}
                >
                  MUZIKALE ERVARING
                </span>
              </h2>

              <div className="space-y-4" style={{ marginBottom: "2rem" }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(240,244,248,0.75)", lineHeight: 1.8, fontWeight: 300 }}>
                  Uw bruiloft verdient de perfecte soundtrack. Van het ontvangst met achtergrondmuziek, door het diner met sfeervolle lounge, tot het avondfeest waar de dansvloer vol staat — wij regelen het allemaal.
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "rgba(240,244,248,0.75)", lineHeight: 1.8, fontWeight: 300 }}>
                  Wij stemmen alles vooraf met u af: uw favoriete nummers, de eerste dans, speciale momenten en de sfeer die u voor ogen heeft. Zo wordt uw trouwdag precies zoals u het wilt.
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
                      background: `linear-gradient(135deg, ${ROSE_GLOW_S}, rgba(255,255,255,0.02))`,
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

      {/* ── Divider with rose glow ── */}
      <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${ROSE}66, transparent)`, boxShadow: `0 0 12px ${ROSE_GLOW}`, margin: "0 2rem", position: "relative", zIndex: 1 }} />

      {/* ── Bento Gallery ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <BentoGallery
          accentColor={ROSE}
          title="BRUILOFT IMPRESSIES"
          subtitle="Onze Bruiloftsshows"
        />
      </div>

      {/* ── USP, Packages, Add-ons, Contact ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <USPSection />
        <PackagesSection />
        <AddOnsSection />
        <ContactSection />
      </div>

      </div>{/* end bruiloft-backdrop wrapper */}

    </PageLayout>
  );
}
