/**
 * SoundVision Events — Event Page Hero
 * Reusable hero banner for event-type sub-pages.
 * Accepts an optional iconUrl to display an anime icon inline beside the page title.
 */
interface EventPageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor?: string;
  iconUrl?: string;
  iconAlt?: string;
}

export default function EventPageHero({
  title,
  subtitle,
  description,
  image,
  accentColor = "#00c8ff",
  iconUrl,
  iconAlt = "icon",
}: EventPageHeroProps) {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPackages = () => {
    const el = document.querySelector("#packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#080c10" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(8,12,16,0.7) 0%, rgba(8,12,16,0.5) 40%, rgba(8,12,16,0.85) 80%, rgba(8,12,16,1) 100%)`,
        }}
      />
      {/* Accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "600px",
          height: "300px",
          background: `radial-gradient(ellipse, ${accentColor}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16">
        <div className="max-w-3xl">
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

          {/* Title row — icon floats left of the heading */}
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
    </section>
  );
}
