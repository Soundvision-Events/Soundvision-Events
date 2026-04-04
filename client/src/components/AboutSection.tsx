/**
 * SoundVision Events — Over de DJ Section
 * Layout:
 *   Row 1: [tekst kolom] | [YouTube frame kolom]  — naast elkaar, eigen grid
 *   Row 2: 4 eigenschappen-kaarten — eigen grid eronder
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
      className="relative py-24 overflow-hidden"
    >
      {/* Semi-dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 24, 71, 0.60)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Subtle cyan glow right side */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full"
        style={{
          background: "radial-gradient(ellipse at right center, rgba(0,200,255,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ maxWidth: "1200px" }}>

        {/* ── ROW 1: Tekst links | YouTube rechts ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
            marginBottom: "3.5rem",
          }}
        >
          {/* ── Tekst kolom ── */}
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
              Over de DJ
            </span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                letterSpacing: "0.05em",
                lineHeight: 1.15,
                color: "#00ddfa",
                fontWeight: 500,
                textAlign: "left",
                marginTop: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ color: "#d400ff" }}>'Uw vaste </span><span style={{ color: "#00c8ff" }}>DJ</span><span style={{ color: "#d400ff" }}> en Partner'</span>
            </h2>

            <div className="space-y-5">
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(240, 244, 248, 0.82)",
                  lineHeight: 1.85,
                  fontWeight: 100,
                  marginTop: "1px",
                  marginBottom: "1px",
                  opacity: 0.7,
                }}
              >
                Hallo, ik ben <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>Bert / DJ Tonicity</strong> — Vaste DJ én allround 'partner' voor uw feest concept met SoundVision Events.
                <br /><br />
                Soundvision voorziet al ruim <strong style={{ color: "#00c8ff", fontWeight: 600 }}>15 jaar</strong> diverse feesten &amp; evenementen van sfeervolle allround muziek inclusief DJ-shows volledig op maat.
                <br /><br />
                Het persoonlijke aandacht argument, geen uniek verhaal. Maar van wie of wat komt deze aandacht eigenlijk? De DJ? In welke mate? Dat maak ik met mijn Sound <em style={{ color: "#00c8ff", fontStyle: "normal", fontWeight: 600 }}>'vision'</em> graag concreet!
                <br /><br />
                In de praktijk: écht 1 op 1 rechtstreeks aandacht én direct feedback van dezelfde persoon m.b.t. alles dat betrekking heeft op het organiseren van een feest concept / evenement en de uitvoering zoals u het wilt.
                <br /><br />
                <span style={{ display: "block", paddingLeft: "0.5rem", borderLeft: "2px solid #00c8ff44" }}>
                  — Het concreet maken van uw unieke ideeën, tot een duidelijk feest concept als basis voor uw specifieke keuzemogelijkheden.<br />
                  — De bijbehorende muzikale en technische voorbereidingen voor uw concept (licht en geluidstechniek).<br />
                  — De uitvoering van uw unieke feest zoals de bedoeling altijd is geweest.
                </span>
                <br />
                Bij Soundvision heeft u in elke fase 1 vaste 'partner': <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>De DJ zélf.</strong> Logisch, toch?
                <br /><br />
                <em style={{ color: "rgba(240,244,248,0.55)", fontSize: "0.88rem" }}>Toch blijkt in de praktijk dat 'persoonlijk' een behoorlijk misbruikte term is om vertrouwen te scheppen zonder persoonlijke uitvoering.</em>
              </p>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(240, 244, 248, 0.82)",
                  lineHeight: 1.85,
                  fontWeight: 300,
                }}
              >
                Wat mij onderscheidt van de rest? <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>Altijd direct en persoonlijk contact.</strong> DJ en klant vinden inspiratie bij elkaar — betrokkenheid zonder tussenpersonen. Zo wordt uw feest precies wat u voor ogen heeft.
              </p>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(240, 244, 248, 0.82)",
                  lineHeight: 1.85,
                  fontWeight: 300,
                }}
              >
                Van intieme bruiloften tot grote bedrijfsfeesten in Groningen, Friesland, Drenthe en Overijssel — ik pas muziek en show volledig aan op de sfeer van uw evenement.
              </p>
            </div>

            <div className="sv-fade-up mt-8">
              <button
                className="sv-btn-primary"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Maak Kennis
              </button>
            </div>
          </div>

          {/* ── YouTube kolom ── */}
          <div className="sv-fade-up">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(0, 200, 255, 0.25)",
                boxShadow: "0 0 60px rgba(0, 200, 255, 0.12), 0 20px 60px rgba(0,0,0,0.5)",
                aspectRatio: "16/9",
                width: "100%",
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

            {/* Name badge below video */}
            <div
              className="mt-4 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(8, 12, 16, 0.75)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(0, 200, 255, 0.2)",
                display: "inline-flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.3rem",
                  letterSpacing: "0.08em",
                  color: "#f0f4f8",
                  lineHeight: 1,
                }}
              >
                DJ TONICITY
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  color: "#00c8ff",
                  marginTop: "2px",
                }}
              >
                ALLROUND DJ @ SOUNDVISION EVENTS
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Vier eigenschappen-kaarten ── */}
        <div
          className="sv-fade-up"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
          }}
        >
          {[
            { icon: "🎵", title: "15+ Jaar Ervaring", desc: "Bewezen allround DJ-shows op bruiloften, bedrijfsfeesten en studentenfeesten." },
            { icon: "🎛️", title: "Pioneer DJ Setup", desc: "Professionele Pioneer-apparatuur voor een kristalhelder, krachtig geluid." },
            { icon: "✨", title: "Show op Maat", desc: "Geluid, licht en muziek volledig afgestemd op uw locatie en gewenste sfeer." },
            { icon: "🤝", title: "Persoonlijk Contact", desc: "Altijd direct contact met de DJ — geen callcenters, geen tussenpersonen." },
          ].map((feat) => (
            <div
              key={feat.title}
              style={{
                background: "linear-gradient(to bottom, rgba(0,212,255,0.12) 0%, rgba(58,143,255,0.10) 40%, rgba(74,0,192,0.18) 100%)",
                border: "1.5px solid rgba(0, 200, 255, 0.30)",
                borderRadius: "1rem",
                padding: "1.5rem 1.25rem",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 0 18px rgba(0,200,255,0.08)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,200,255,0.65)";
                el.style.boxShadow = "0 0 28px rgba(0,200,255,0.30)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(0,200,255,0.30)";
                el.style.boxShadow = "0 0 18px rgba(0,200,255,0.08)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{feat.icon}</div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.08em",
                  color: "#f0f4f8",
                  marginBottom: "0.5rem",
                }}
              >
                {feat.title}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(240, 244, 248, 0.60)",
                  lineHeight: 1.6,
                }}
              >
                {feat.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
