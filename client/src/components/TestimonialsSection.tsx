/**
 * SoundVision Events — Testimonials Section
 * Customer reviews and testimonials
 */
import { useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Thomas",
    event: "Bruiloft",
    text: "DJ Tonicity heeft onze bruiloft tot een onvergetelijke avond gemaakt. De muziekkeuze was perfect, de lichtshow was spectaculair en de gasten waren de hele avond aan het dansen. Absolute aanrader!",
    rating: 5,
    avatar: "ST",
  },
  {
    name: "Mark van den Berg",
    event: "Bedrijfsfeest",
    text: "Voor ons jaarlijkse bedrijfsfeest hebben we SoundVision Events ingehuurd. Professioneel, punctueel en geweldige muziek. Onze collega's praten er nog steeds over!",
    rating: 5,
    avatar: "MV",
  },
  {
    name: "Lisa Janssen",
    event: "Verjaardag 30 jaar",
    text: "Wat een geweldige avond! De DJ wist precies welke muziek hij moest draaien om iedereen op de dansvloer te krijgen. De lichtshow en lasereffecten waren het hoogtepunt van de avond!",
    rating: 5,
    avatar: "LJ",
  },
  {
    name: "Kevin & Nathalie",
    event: "Bruiloft",
    text: "Vanaf het eerste gesprek tot het einde van de avond was alles perfect geregeld. DJ Tonicity luisterde naar onze wensen en maakte er iets magisch van. Dank je wel!",
    rating: 5,
    avatar: "KN",
  },
  {
    name: "Bedrijf TechCorp",
    event: "Gala Avond",
    text: "Wij boeken SoundVision Events al 3 jaar voor ons jaarlijkse gala. Elke keer weer een topshow. De Large Show met extra's was dit jaar absoluut fantastisch.",
    rating: 5,
    avatar: "TC",
  },
  {
    name: "Familie Bakker",
    event: "Verjaardag 50 jaar",
    text: "Voor de 50e verjaardag van mijn man wilden we iets speciaals. DJ Tonicity heeft de avond perfect gemaakt met een geweldige mix van muziek door de jaren heen.",
    rating: 5,
    avatar: "FB",
  },
];

export default function TestimonialsSection() {
  // Ensure Trustoo widget script is loaded
  useEffect(() => {
    const existing = document.querySelector('script[src*="trustoo.nl"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://static.trustoo.nl/widget/widget_v2.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Script already present — re-trigger widget init if available
      if ((window as unknown as Record<string, unknown>).TrustooWidget) {
        const tw = (window as unknown as Record<string, () => void>).TrustooWidget;
        if (typeof tw === "function") tw();
      }
    }
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
    >
      {/* 50% dark overlay — lets YouTube backdrop show through */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(8, 12, 16, 0.30)", pointerEvents: "none", zIndex: 0 }}
      />
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(0, 200, 255, 0.04) 0%, transparent 60%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 sv-fade-up sv-zoom-reveal">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#00c8ff",
              textTransform: "uppercase",
            }}
          >
            Ervaringen
          </span>
          <h2
            className="mt-3"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "0.05em",
              lineHeight: 1.05,
              color: "#f0f4f8",
            }}
          >
            WAT ONZE
            <span
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}KLANTEN ZEGGEN
            </span>
          </h2>
        </div>

        {/* Trustoo Score Widget — top of section */}
        <div className="sv-fade-up mb-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            letterSpacing: "0.2em",
            color: "#ff8800",
            textTransform: "uppercase",
            textAlign: "center",
            margin: 0,
          }}>
            Beoordeeld door onze klanten
          </p>
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div
              className="trustoo-widget"
              data-id="ONJgD-vB6EbwidLkvtbyvjZyloyw81bQnaBPtYozTPP8rw"
              data-language-code="nl"
              data-country-code="NL"
              data-badge="default"
              data-quote="hidden"
              data-size="large"
              data-type="landscape"
              data-border="hidden"
              data-theme="dark"
              data-background="transparent"
              data-google="hidden"
            />
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="sv-fade-up sv-tilt rounded-2xl p-6"
              style={{
                animationDelay: `${(i % 3) * 0.1}s`,
                background: "linear-gradient(to bottom, #00d4ff 0%, #3a8fff 25%, #5b4af0 50%, #6040e0 75%, #4a00c0 100%)",
                border: "1.5px solid #00d4ff",
                boxShadow: "0 0 10px rgba(0,212,255,0.35), 0 0 28px rgba(0,212,255,0.12), 0 0 55px rgba(96,64,224,0.10)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.65), 0 0 50px rgba(0,212,255,0.28), 0 0 80px rgba(96,64,224,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0,212,255,0.35), 0 0 28px rgba(0,212,255,0.12), 0 0 55px rgba(96,64,224,0.10)";
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#ffaa00" color="#ffaa00" />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(10, 5, 30, 0.90)",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  marginBottom: "1.25rem",
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(10,5,60,0.5), rgba(10,5,80,0.7))",
                    border: "1.5px solid rgba(10,5,60,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.8rem",
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    color: "rgba(10, 5, 30, 0.95)",
                  }}
                >
                  {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(10, 5, 60, 0.75)",
                    }}
                  >
                    {t.event}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
