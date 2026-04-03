/**
 * SoundVision Events — Over de DJ Section
 * DJ Tonicity (Bert) — autoplay muted intro video + personal story
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
            // Switch to autoplay+mute URL when section scrolls into view
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
      {/* Semi-dark overlay — lets YouTube background show through */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(8, 12, 16, 0.20)",
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center" style={{ marginTop: "-94px", marginRight: "27px", marginBottom: "8px", marginLeft: "-1px", height: "1168px" }}>

          {/* ── Video side ── */}
          <div className="relative sv-fade-up order-2 lg:order-1">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(0, 200, 255, 0.25)",
                boxShadow: "0 0 60px rgba(0, 200, 255, 0.12), 0 20px 60px rgba(0,0,0,0.5)",
                aspectRatio: "16/9",
                paddingBottom: "7px",
                marginTop: "-306px",
                marginRight: "-6px",
                marginBottom: "-8px",
                width: "658px",
                height: "434px",
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

            {/* Decorative glow blob */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, #00c8ff 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* ── Story side ── */}
          <div className="order-1 lg:order-2">
            <div className="sv-fade-up" style={{paddingLeft: '8px'}}>
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
                className="mt-3 mb-6"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  letterSpacing: "0.05em",
                  lineHeight: 1.15,
                  color: "#00ddfa",
                  fontWeight: 500,
                  textAlign: "left",
                  paddingTop: "10px",
                  paddingBottom: "15px",
                  paddingLeft: "14px",
                }}
              >
                'Uw vaste DJ en Partner'
              </h2>
            </div>

            <div className="sv-fade-up space-y-5">
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.625rem",
                  color: "rgba(240, 244, 248, 0.82)",
                  lineHeight: 1.85,
                  fontWeight: 300,
                }}
              >
                Hoi, ik ben <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>Bert / DJ Tonicity</strong> — Vaste DJ én allround 'partner' voor uw feest concept met SoundVision Events.
                <br /><br />
                Soundvision voorziet al ruim <strong style={{ color: "#00c8ff", fontWeight: 600 }}>15 jaar</strong> diverse feesten &amp; evenementen van sfeervolle allround muziek inclusief DJ-shows volledig op maat.
                <br /><br />
                In de praktijk: écht 1 op 1 persoonlijke aandacht voor elk uniek feest, met 1 contactpersoon: <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>De DJ.</strong> Logisch, toch?
              </p>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.05rem",
                  color: "rgba(240, 244, 248, 0.82)",
                  lineHeight: 1.85,
                  fontWeight: 300,
                }}
              >
                Wat mij onderscheidt? <strong style={{ color: "#f0f4f8", fontWeight: 600 }}>Altijd direct en persoonlijk contact.</strong> DJ en klant vinden inspiratie bij elkaar — betrokkenheid zonder tussenpersonen. Zo wordt uw feest precies wat u voor ogen heeft.
              </p>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.05rem",
                  color: "rgba(240, 244, 248, 0.82)",
                  lineHeight: 1.85,
                  fontWeight: 300,
                }}
              >
                Van intieme bruiloften tot grote bedrijfsfeesten in Groningen, Friesland, Drenthe en Overijssel — ik pas muziek en show volledig aan op de sfeer van uw evenement.
              </p>
            </div>

            {/* Feature tiles */}
            <div className="sv-fade-up grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: "🎵", title: "15+ Jaar Ervaring", desc: "Bewezen allround DJ-shows" },
                { icon: "🎛️", title: "Pioneer DJ Setup", desc: "Professionele apparatuur" },
                { icon: "🤝", title: "Persoonlijk Contact", desc: "Geen tussenpersonen" },
                { icon: "✨", title: "Show op Maat", desc: "Volledig afgestemd op u" },
              ].map((feat) => (
                <div
                  key={feat.title}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(20, 8, 50, 0.30)",
                    border: "1px solid rgba(100, 60, 200, 0.30)",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,200,255,0.30)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,200,255,0.10)";
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{feat.icon}</div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#f0f4f8",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {feat.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(240, 244, 248, 0.5)",
                    }}
                  >
                    {feat.desc}
                  </div>
                </div>
              ))}
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

        </div>
      </div>
    </section>
  );
}
