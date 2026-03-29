/**
 * SoundVision Events — Event Page Hero
 * Reusable hero banner for event-type sub-pages.
 * When showPhoto is provided, the photo fills the full screen as a background
 * with a dark gradient overlay and the text centred on top (fullscreen slider mode).
 * Without showPhoto, the YouTube backdrop shows through (transparent mode).
 */
import { useState, useEffect } from "react";

interface EventPageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor?: string;
  iconUrl?: string;
  iconAlt?: string;
  /** One or more photo URLs. When provided the hero switches to fullscreen photo mode. */
  showPhoto?: string | string[];
}

export default function EventPageHero({
  title,
  subtitle,
  description,
  image,
  accentColor = "#00c8ff",
  iconUrl,
  iconAlt = "icon",
  showPhoto,
}: EventPageHeroProps) {
  const photos: string[] = showPhoto
    ? Array.isArray(showPhoto)
      ? showPhoto
      : [showPhoto]
    : [];

  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  /* Auto-advance when multiple photos are supplied */
  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % photos.length);
        setFading(false);
      }, 600);
    }, 5000);
    return () => clearInterval(id);
  }, [photos.length]);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 400);
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPackages = () => {
    const el = document.querySelector("#packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Fullscreen photo mode ── */
  if (photos.length > 0) {
    return (
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Fullscreen photo background — semi-transparent so YouTube backdrop shines through */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${photos[current]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 0.6s ease",
            opacity: fading ? 0 : 0.55,
            mixBlendMode: "luminosity",
          }}
        />

        {/* Dark gradient overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(8,12,16,0.55) 0%,
              rgba(8,12,16,0.35) 40%,
              rgba(8,12,16,0.70) 80%,
              rgba(8,12,16,0.92) 100%
            )`,
          }}
        />

        {/* Accent glow top-centre */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "700px",
            height: "350px",
            background: `radial-gradient(ellipse, ${accentColor}20 0%, transparent 70%)`,
          }}
        />

        {/* Two-column layout: left = empty (photo shows through), right = content */}
        <div className="w-full min-h-screen flex items-center relative z-10">
          {/* Left half — spacer so photo shows through */}
          <div className="hidden lg:block w-1/2" />

          {/* Right half — content stacked top-down */}
          <div
            className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-14 pt-32 pb-24"
            style={{
              background: "linear-gradient(to right, transparent 0%, rgba(8,12,16,0.75) 30%, rgba(8,12,16,0.88) 100%)",
              minHeight: "100vh",
            }}
          >
            {/* Subtitle */}
            <span
              className="sv-fade-up"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.35em",
                color: accentColor,
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                display: "block",
              }}
            >
              {subtitle}
            </span>

            {/* Icon + Title */}
            <div
              className="sv-fade-up"
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
            >
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={iconAlt}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                    flexShrink: 0,
                    filter: `drop-shadow(0 0 20px ${accentColor}cc)`,
                    animation: "sv-float 3s ease-in-out infinite",
                  }}
                />
              )}
              <h1
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                  color: "#f0f4f8",
                  textShadow: `0 0 40px ${accentColor}66, 0 4px 20px rgba(0,0,0,0.8)`,
                }}
              >
                {title}
              </h1>
            </div>

            {/* Description */}
            <p
              className="sv-fade-up"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.05rem",
                color: "rgba(240,244,248,0.82)",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "520px",
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                marginBottom: "2rem",
              }}
            >
              {description}
            </p>

            {/* CTA buttons */}
            <div className="sv-fade-up flex flex-wrap gap-4" style={{ marginBottom: "2.5rem" }}>
              <button className="sv-btn-primary" onClick={scrollToContact}>
                Offerte Aanvragen
              </button>
              <button
                onClick={scrollToPackages}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.95rem",
                  letterSpacing: "0.1em",
                  padding: "0.75rem 2rem",
                  borderRadius: "6px",
                  background: "transparent",
                  color: "#f0f4f8",
                  border: "1px solid rgba(240,244,248,0.30)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(240,244,248,0.30)";
                  e.currentTarget.style.color = "#f0f4f8";
                }}
              >
                Bekijk Pakketten
              </button>
            </div>

            {/* Dot indicators */}
            {photos.length > 1 && (
              <div className="flex gap-2">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    style={{
                      width: idx === current ? "28px" : "10px",
                      height: "10px",
                      borderRadius: "5px",
                      background: idx === current ? accentColor : "rgba(255,255,255,0.35)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.4s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scroll-down chevron */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ animation: "sv-float 2s ease-in-out infinite", opacity: 0.6 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>
    );
  }

  /* ── Transparent mode (YouTube backdrop shows through) ── */
  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "rgba(8, 12, 16, 0.55)" }}
    >
      {/* Accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "300px",
          background: `radial-gradient(ellipse, ${accentColor}15 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16">
        <div className="max-w-3xl">
          <div style={{ background: "rgba(8,12,16,0.50)", borderRadius: "1.25rem", backdropFilter: "blur(4px)", padding: "2.5rem 2rem" }}>
            <span
              className="sv-fade-up"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                color: accentColor,
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              {subtitle}
            </span>

            <div
              className="sv-fade-up"
              style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
            >
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={iconAlt}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "contain",
                    flexShrink: 0,
                    filter: `drop-shadow(0 0 20px ${accentColor}99)`,
                    animation: "sv-float 3s ease-in-out infinite",
                  }}
                />
              )}
              <h1
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  letterSpacing: "0.04em",
                  lineHeight: 1.05,
                  color: "#f0f4f8",
                }}
              >
                {title}
              </h1>
            </div>

            <p
              className="sv-fade-up mt-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.1rem",
                color: "rgba(240, 244, 248, 0.7)",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "600px",
              }}
            >
              {description}
            </p>
            <div className="sv-fade-up flex flex-wrap gap-4 mt-8">
              <button className="sv-btn-primary" onClick={scrollToContact}>
                Offerte Aanvragen
              </button>
              <button
                onClick={scrollToPackages}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "0.95rem",
                  letterSpacing: "0.1em",
                  padding: "0.75rem 2rem",
                  borderRadius: "6px",
                  background: "transparent",
                  color: "#f0f4f8",
                  border: "1px solid rgba(240, 244, 248, 0.25)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(240, 244, 248, 0.25)";
                  e.currentTarget.style.color = "#f0f4f8";
                }}
              >
                Bekijk Pakketten
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
