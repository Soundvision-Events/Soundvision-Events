/**
 * SoundVision Events — Testimonials Section
 * Customer reviews and testimonials
 */
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
              fontFamily: "'Bebas Neue', sans-serif",
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

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="sv-fade-up sv-tilt rounded-2xl p-6"
              style={{
                animationDelay: `${(i % 3) * 0.1}s`,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(0, 200, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
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
                  color: "rgba(240, 244, 248, 0.75)",
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
                    background: "linear-gradient(135deg, rgba(0,200,255,0.2), rgba(0,144,255,0.2))",
                    border: "1px solid rgba(0, 200, 255, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "0.8rem",
                    color: "#00c8ff",
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
                      color: "#f0f4f8",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.75rem",
                      color: "#00c8ff",
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
