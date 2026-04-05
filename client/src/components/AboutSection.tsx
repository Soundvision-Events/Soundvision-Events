/**
 * SoundVision Events — "De visie in de praktijk" Section
 * Layout Optie A: Asymmetrisch 3-koloms grid
 *   Row 1: [Tekst breed 2/3 — donkerblauw kleurblok] | [YouTube smal 1/3 — cyaan kleurblok]
 *   Row 2: 4 kernwaarden kaarten — volle breedte met gradient kleurblokken
 * All text sits above color layers (z-index: relative > absolute bg)
 */
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoplayUrl, setAutoplayUrl] = useState(
    "https://www.youtube-nocookie.com/embed/k6ZE7QYA8ug?rel=0&modestbranding=1&color=white"
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAutoplayUrl(
              "https://www.youtube-nocookie.com/embed/k6ZE7QYA8ug?autoplay=1&mute=1&rel=0&modestbranding=1&color=white&playsinline=1"
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

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ paddingBottom: "0" }}
    >
      {/* Global section colour overlay — #00bfff at opacity 0.2 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#00bfff",
          opacity: 0.2,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Full-width section header ── */}
      <div
        className="relative w-full"
        style={{
          zIndex: 10,
          borderBottom: "1px solid rgba(0,200,255,0.18)",
          paddingTop: "2.5rem",
          paddingBottom: "2rem",
          textAlign: "center",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,200,255,0.08) 50%, transparent 100%)",
        }}
      >
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(0,200,255,0.6)",
            marginBottom: "0.6rem",
          }}
        >
          Over de DJ
        </p>
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            letterSpacing: "0.12em",
            lineHeight: 1.1,
            color: "#ffffff",
            margin: 0,
            textShadow: "0 0 40px rgba(0,200,255,0.25), 0 2px 20px rgba(0,0,0,0.8)",
          }}
        >
          De visie in de praktijk
        </h2>
      </div>

      {/* ── ROW 1: Asymmetric 2/3 + 1/3 grid ── */}
      <div
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          minHeight: "520px",
          zIndex: 10,
        }}
      >
        {/* ── LEFT COLUMN: Tekst (2/3) — dark purple colour layer ── */}
        <div
          className="relative"
          style={{
            borderRight: "1px solid rgba(0,200,255,0.15)",
          }}
        >
          {/* Background colour overlay — only this layer gets opacity */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#1c0033",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />
          {/* Subtle left-side glow accent */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 20% 50%, rgba(0,200,255,0.06) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {/* Text content — always above colour layer */}
          <div
            className="sv-fade-up relative"
            style={{ padding: "2.5rem 3rem 2.5rem 3rem", zIndex: 2 }}
          >
            {/* Badge label */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span
                style={{
                  color: "#003a66",
                  backgroundColor: "#00c4eb",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                  padding: "0.2rem 0.7rem",
                  borderRadius: "2px",
                  border: "3px groove #000000",
                  display: "inline-block",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                DJ Tonicity legt uit
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.78rem",
                  display: "block",
                  marginTop: "0.5rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                DJ en oprichter @ SoundVision Events sinds 2016
              </span>
            </div>

            {/* Main body text */}
            <div className="space-y-4">
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(240, 244, 248, 0.85)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Hallo, ik ben <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>Bert / DJ Tonicity</strong> — Vaste DJ én allround 'partner' voor uw feest concept met SoundVision Events.
                Soundvision voorziet al ruim <strong style={{ color: "#00c8ff", fontWeight: 600 }}>15 jaar</strong> diverse feesten &amp; evenementen van sfeervolle allround muziek inclusief DJ-shows volledig op maat.
              </p>

              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(240, 244, 248, 0.85)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Het persoonlijke aandacht argument, geen uniek verhaal. Maar van wie of wat komt deze aandacht eigenlijk? De DJ? In welke mate? Dat maak ik met mijn Sound{" "}
                <em style={{ color: "#00c8ff", fontStyle: "normal", fontWeight: 600 }}>'vision'</em> graag concreet!
              </p>

              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(240, 244, 248, 0.85)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                In de praktijk: écht 1 op 1 rechtstreeks aandacht én direct feedback van dezelfde persoon m.b.t. alles dat betrekking heeft op het organiseren van een feest concept / evenement en de uitvoering zoals u het wilt.
              </p>

              {/* Bullet list with cyan left border */}
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
                  "Het concreet maken van uw unieke ideeën, tot een duidelijk feest concept als basis voor uw specifieke keuzemogelijkheden.",
                  "De bijbehorende muzikale en technische voorbereidingen voor uw concept (licht en geluidstechniek).",
                  "De uitvoering van uw unieke feest zoals de bedoeling altijd is geweest.",
                ].map((item, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.88rem",
                      color: "rgba(240,244,248,0.75)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    <span style={{ color: "#00c8ff", marginRight: "0.5rem" }}>—</span>
                    {item}
                  </p>
                ))}
              </div>

              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(240, 244, 248, 0.85)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Bij Soundvision heeft u in elke fase 1 vaste 'partner':{" "}
                <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>De DJ zélf.</strong> Logisch, toch?
              </p>

              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(240, 244, 248, 0.85)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Wat mij onderscheidt van de rest?{" "}
                <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>Altijd direct en persoonlijk contact.</strong>{" "}
                DJ en klant vinden inspiratie bij elkaar — betrokkenheid zonder tussenpersonen. Zo wordt uw feest precies wat u voor ogen heeft.
              </p>

              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(240,244,248,0.50)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                Toch blijkt in de praktijk dat 'persoonlijk' een behoorlijk misbruikte term is om vertrouwen te scheppen zonder persoonlijke uitvoering.
              </p>
            </div>

            {/* CTA button */}
            <div style={{ marginTop: "2rem" }}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "inline-block",
                  padding: "0.8rem 2.2rem",
                  background: "linear-gradient(135deg, #8100eb 0%, #00e1ff 100%)",
                  color: "#ffffff",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1rem",
                  letterSpacing: "0.12em",
                  borderRadius: "0.75rem",
                  textDecoration: "none",
                  boxShadow: "0 0 24px rgba(129,0,235,0.45), 0 0 48px rgba(0,225,255,0.20)",
                  transition: "box-shadow 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = "0 0 40px rgba(129,0,235,0.70), 0 0 80px rgba(0,225,255,0.35)";
                  el.style.transform = "translateY(-2px) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = "0 0 24px rgba(129,0,235,0.45), 0 0 48px rgba(0,225,255,0.20)";
                  el.style.transform = "translateY(0) scale(1)";
                }}
              >
                Neem Contact Op →
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: YouTube (1/3) — dark teal colour layer ── */}
        <div
          className="relative sv-fade-up"
          style={{
            backgroundColor: "#00090a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "38px",
            paddingRight: "0px",
            paddingLeft: "0px",
            marginTop: "6px",
            marginRight: "11px",
            marginBottom: "16px",
            marginLeft: "20px",
            gap: "1.25rem",
            width: "671px",
            maxWidth: "100%",
            height: "532px",
            opacity: 0.82,
          }}
        >
          {/* Cyan glow accent */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 80% 40%, rgba(0,200,255,0.10) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          {/* YouTube frame */}
          <div
            className="relative rounded-xl overflow-hidden w-full"
            style={{
              border: "1px solid rgba(0,200,255,0.30)",
              boxShadow: "0 0 40px rgba(0,200,255,0.15), 0 12px 40px rgba(0,0,0,0.6)",
              aspectRatio: "9/16",
              zIndex: 2,
            }}
          >
            <iframe
              src={autoplayUrl}
              title="DJ Tonicity — SoundVision Events Intro"
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
              zIndex: 2,
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
                color: "#00c8ff",
                marginTop: "4px",
                textTransform: "uppercase",
              }}
            >
              Allround DJ @ SoundVision Events
            </div>
          </div>
        </div>
      </div>

      {/* ── INFOGRAPHIC: beeldvullend / full-width immersive ── */}
      <div
        className="sv-fade-up"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          marginTop: "2rem",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/dj_toncity_infographic_edited_a9ef8bc4.png"
          alt="SoundVision Events — De Sleutel tot een Onvergetelijk Feest"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

    </section>
  );
}
