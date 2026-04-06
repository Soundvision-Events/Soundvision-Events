/**
 * SoundVision Events — VisionSection (consolidated "Over de DJ")
 *
 * Single clean section replacing the old duplicate VisionSection + AboutSection.
 * Layout:
 *   TOP:    Centered section header (overline + Cinzel title + badge)
 *   MIDDLE: 50/50 grid — text column LEFT | YouTube 16:9 RIGHT (same grid line)
 *   BOTTOM: Full-width infographic summarising the content above
 *
 * Animations: sv-fade-up (text), sv-zoom-reveal (video), sv-bg-zoom (infographic)
 */
import { useEffect, useRef, useState } from "react";
import { type PageTheme, DEFAULT_THEME } from "@/lib/pageThemes";

interface VisionSectionProps {
  theme?: PageTheme;
}

const YOUTUBE_VIDEO_ID = "k6ZE7QYA8ug";
const INFOGRAPHIC_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/dj_toncity_infographic_edited_a9ef8bc4.png";

export default function VisionSection({ theme = DEFAULT_THEME }: VisionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoplayUrl, setAutoplayUrl] = useState(
    `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1&color=white`
  );

  /* Autoplay-on-scroll: switch URL when section enters viewport */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAutoplayUrl(
              `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&rel=0&modestbranding=1&color=white&playsinline=1`
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const accent = theme.accent ?? "#00c8ff";

  /* ── Shared text style ── */
  const bodyText: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "1rem",
    color: "rgba(240,244,248,0.85)",
    lineHeight: 1.8,
    fontWeight: 300,
  };

  return (
    <section
      id="vision"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ paddingBottom: "4rem" }}
    >
      {/* Subtle colour wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,200,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ═══════════════ ZONE 1 — Section header ═══════════════ */}
      <div
        className="relative w-full"
        style={{
          zIndex: 10,
          borderBottom: "1px solid rgba(0,200,255,0.18)",
          paddingTop: "4rem",
          paddingBottom: "2rem",
          textAlign: "center",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,200,255,0.07) 50%, transparent 100%)",
        }}
      >
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(0,200,255,0.65)",
            marginBottom: "0.6rem",
          }}
        >
          Over de DJ
        </p>

        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
            letterSpacing: "0.12em",
            lineHeight: 1.1,
            color: "#f0f4f8",
            margin: 0,
            textShadow:
              "0 0 40px rgba(0,200,255,0.25), 0 2px 20px rgba(0,0,0,0.8)",
          }}
        >
          Visie op uw wensen in de praktijk
        </h2>

        {/* Badge */}
        <div style={{ marginTop: "1.2rem" }}>
          <span
            style={{
              color: "#003a66",
              backgroundColor: "#00c4eb",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.9rem",
              padding: "0.25rem 0.9rem",
              borderRadius: "2px",
              border: "3px groove #000000",
              display: "inline-block",
              fontWeight: 500,
              letterSpacing: "0.06em",
            }}
          >
            DJ Tonicity: Visie op de gewenste Sound, met de perfecte Shows
          </span>
          <span
            style={{
              display: "block",
              marginTop: "0.5rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(0,200,255,0.5)",
              textDecoration: "overline",
              textAlign: "center",
            }}
          >
            Oprichter en de vaste allround DJ @ SoundVision Events sinds 2016
          </span>
        </div>
      </div>

      {/* ═══════════════ ZONE 2 — 50/50 grid: text | YouTube ═══════════════ */}
      <div
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          zIndex: 10,
          alignItems: "stretch",
          padding: "2rem 2rem 0",
        }}
      >
        {/* ── LEFT: Text column ── */}
        <div
          className="relative sv-fade-up"
          style={{
            padding: "2.5rem 2.5rem",
            borderRadius: "12px",
            border: "2px solid rgba(0,200,255,0.18)",
            background: "rgba(0,5,20,0.45)",
            backdropFilter: "blur(6px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Purple tint overlay */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(115,0,255,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          <div className="relative space-y-4" style={{ zIndex: 2 }}>
            <p style={bodyText}>
              Ik ben{" "}
              <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>
                Bert — DJ Tonicity
              </strong>
              , uw vaste DJ én allround partner voor een feestconcept op maat.
              Al meer dan{" "}
              <strong style={{ color: accent, fontWeight: 600 }}>
                15 jaar
              </strong>{" "}
              zet SoundVision Events sfeervolle muziek en DJ-shows neer die
              precies passen bij uw evenement.
            </p>

            <p style={bodyText}>
              Persoonlijk contact is geen marketingterm — het is de basis van
              vertrouwen. Maar wie staat er écht voor u klaar bij het
              organiseren van uw feest? De DJ zelf? Of de partyplanner zonder
              ervaring of affiniteit met het vak, die met een wensenformulier
              een DJ toewijst op boekingnummer 333...
            </p>

            <p style={bodyText}>
              Eén aanspreekpunt, van eerste idee tot laatste nummer — directe
              feedback, geen tussenpersonen, en uitvoering precies zoals u het
              voor ogen heeft. Dat maak ik met mijn{" "}
              <strong style={{ color: accent, fontWeight: 600 }}>
                Sound 'vision'
              </strong>{" "}
              graag concreet.
            </p>

            {/* Bullet highlights */}
            <div
              style={{
                paddingLeft: "1rem",
                borderLeft: "2px solid rgba(0,200,255,0.35)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[
                "Uw unieke ideeën omzetten naar een helder feestconcept met concrete keuzemogelijkheden.",
                "Muzikale en technische voorbereiding op maat — licht, geluid en sfeer in perfecte balans.",
                "Uitvoering zoals u het altijd voor ogen had, zonder compromissen.",
              ].map((item, i) => (
                <p
                  key={i}
                  style={{
                    ...bodyText,
                    fontSize: "0.9rem",
                    color: "rgba(240,244,248,0.75)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  <span style={{ color: accent, marginRight: "0.5rem" }}>
                    —
                  </span>
                  {item}
                </p>
              ))}
            </div>

            {/* Key stats row */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { value: "500+", label: "Shows gespeeld" },
                { value: "15+", label: "Jaar ervaring" },
                { value: "9.8/10", label: "Trustoo score" },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1.6rem",
                      color: accent,
                      fontWeight: 700,
                      lineHeight: 1,
                      textShadow: `0 0 20px ${accent}60`,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(240,244,248,0.5)",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block sv-btn-primary"
              style={{ marginTop: "1.5rem" }}
            >
              Neem Contact Op →
            </a>
          </div>
        </div>

        {/* ── RIGHT: YouTube column ── */}
        <div
          className="relative sv-fade-up"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2.5rem 2rem",
            borderRadius: "12px",
            border: "2px solid rgba(0,200,255,0.18)",
            background: "rgba(0,5,20,0.35)",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Cyan glow accent */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 70% 50%, rgba(0,200,255,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="relative sv-zoom-reveal"
            style={{
              width: "100%",
              maxWidth: "560px",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* YouTube frame — 16:9 landscape with glow border */}
            <div
              className="relative rounded-xl overflow-hidden w-full"
              style={{
                border: "2px solid rgba(0,200,255,0.55)",
                boxShadow: [
                  "0 0 0 1px rgba(115,0,255,0.35)",
                  "0 0 18px rgba(0,200,255,0.55)",
                  "0 0 40px rgba(0,200,255,0.25)",
                  "0 0 80px rgba(115,0,255,0.20)",
                  "0 12px 40px rgba(0,0,0,0.7)",
                ].join(", "),
                aspectRatio: "16/9",
              }}
            >
              <iframe
                src={autoplayUrl}
                title="DJ Tonicity — SoundVision Events Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>

            {/* Name badge */}
            <div
              className="relative rounded-xl px-4 py-3 w-full"
              style={{
                background: "rgba(0,10,30,0.80)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(0,200,255,0.22)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.1em",
                  color: "#f0f4f8",
                  lineHeight: 1,
                }}
              >
                DJ TONICITY
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: accent,
                  marginTop: "4px",
                  textTransform: "uppercase",
                }}
              >
                Allround DJ @ SoundVision Events
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ ZONE 3 — Infographic (summary) ═══════════════ */}
      <div
        className="sv-fade-up relative"
        style={{
          zIndex: 10,
          margin: "2.5rem 2rem 0",
          borderRadius: "1.25rem",
          border: "1.5px solid rgba(0,200,255,0.35)",
          boxShadow:
            "0 0 0 1px rgba(0,200,255,0.10), 0 0 40px rgba(0,200,255,0.12), 0 8px 48px rgba(0,0,0,0.55)",
          overflow: "hidden",
          background: "rgba(0,5,20,0.60)",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,200,255,0.6) 30%, rgba(129,0,235,0.6) 70%, transparent 100%)",
          }}
        />
        <img
          className="sv-bg-zoom"
          src={INFOGRAPHIC_URL}
          alt="SoundVision Events — De Sleutel tot een Onvergetelijk Feest"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        {/* Bottom accent line */}
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(129,0,235,0.6) 30%, rgba(0,200,255,0.6) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          #vision [style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
